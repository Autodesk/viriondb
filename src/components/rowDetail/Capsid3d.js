import React, { Component } from 'react';
import three from 'three';

export default class Capsid3d extends Component {
  static propTypes = {};

  componentDidMount() {
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

    // IcoSphere -> three.IcosahedronGeometry(80, 1) 1-4
    const Ico = new three.Mesh(new three.IcosahedronGeometry(75, 0), pinkMat);
    Ico.rotation.z = 0.5;
    scene.add(Ico);

    function update() {
      Ico.rotation.x += 2 / 150;
      Ico.rotation.y += 2 / 300;
    }

    // Render
    const render = () => {
      this.rafId = requestAnimationFrame(render);
      this.renderer.render(scene, camera);
      update();
    }

    render();
  }

  componentWillUnmount() {
    if (typeof this.rafId !== 'undefined') {
      window.cancelAnimationFrame(this.rafId);
    }
  }

  render() {
    return (
      <div className="Capsid3d"
           ref={(el) => {
                 if (el) { this.element = el; }
               }}>
      </div>
    );
  }
};
