import React, { PropTypes, Component } from 'react';
import three from 'three';

export default class Capsid3d extends Component {
  static propTypes = {
    field: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    instance: PropTypes.object.isRequired,
  };

  componentDidMount() {
    setTimeout(this.renderThree);
  }

  componentWillUnmount() {
    if (typeof this.rafId !== 'undefined') {
      window.cancelAnimationFrame(this.rafId);
    }
  }

  renderThree = () => {
    this.renderer = new three.WebGLRenderer({ antialias: true, alpha: true });
    const camera = new three.PerspectiveCamera(80, 1, 0.1, 10000);
    const scene = new three.Scene();
    this.element.appendChild(this.renderer.domElement);

    scene.add(camera);
    this.renderer.setSize(300, 300);

    // Camera
    camera.position.z = 200;

    // Material
    const pinkMat = new three.MeshPhongMaterial({
      color: new three.Color("rgb(33,30,50)"),
      emissive: new three.Color("rgb(33,30,50)"),
      specular: new three.Color("rgb(100,100,120)"),
      shininess: 8,
      shading: three.FlatShading,
      transparent: 1,
      opacity: 1,
    });

    const L1 = new three.PointLight(0xffffff, 1);
    L1.position.z = 100;
    L1.position.y = 100;
    L1.position.x = 100;
    scene.add(L1);

    const L2 = new three.PointLight(0xffffff, 0.8);
    L2.position.z = 200;
    L2.position.y = 50;
    L2.position.x = -100;
    scene.add(L2);

    let shape;
    const value = this.props.value.toLowerCase();
    if (value.indexOf('icosahedr') >= 0) {
      //todo - intelligent based on T number - will have to generate geometry from scratch
      shape = new three.IcosahedronGeometry(75, 0);
    } else if (value.indexOf('spher') >= 0) {
      shape = new three.SphereGeometry(75, 50, 50);
    } else if (value.indexOf('rod') >= 0) {
      shape = new three.CylinderGeometry(50, 50, 150, 40);
    } else if (value.indexOf('ovoid') >= 0) {
      // points - (x, y) pairs are rotated around the y-axis
      const points = [];
      const scale = 100;
      for ( let deg = 0; deg <= 180; deg += 6 ) {
        const rad = Math.PI * deg / 180;
        const point = new three.Vector2( scale * ( 0.72 + 0.08 * Math.cos( rad ) ) * Math.sin( rad ), - scale * Math.cos( rad ) ); // the "egg equation"
        // x-coord should be greater than zero to avoid degenerate triangles; it is not guaranteed in this formula.
        points.push( point );
      }
      shape = new three.LatheBufferGeometry( points, 50 );
    } else if (value.indexOf('budded') >= 0) {
      //todo;
      shape = new three.CylinderGeometry(50, 50, 150, 40);
    }

    if (shape) {
      const mesh = new three.Mesh(shape, pinkMat);
      mesh.rotation.z = 0.5;
      scene.add(mesh);

      function update() {
        mesh.rotation.x += 2 / 150;
        mesh.rotation.y += 2 / 300;
        mesh.rotation.z -= 2 / 500;
      }

      // Render
      const render = () => {
        this.rafId = requestAnimationFrame(render);
        this.renderer.render(scene, camera);
        update();
      };

      render();
    }
  };

  render() {
    return (
      <div className="Capsid3d"
           style={{ width: '300px', height: '300px' }}
           ref={(el) => {
             if (el) {
               this.element = el;
             }
           }}>
      </div>
    );
  }
};
