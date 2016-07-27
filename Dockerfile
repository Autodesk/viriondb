FROM phusion/baseimage:0.9.18
MAINTAINER bionanodevops@autodesk.com

# update package system
RUN apt-get update -y
RUN apt-get upgrade -y

# install build tools, python, and python packages
RUN apt-get install -y wget curl g++ g++-multilib libgc-dev git build-essential
RUN apt-get install -y libglu1-mesa-dev freeglut3-dev mesa-common-dev
RUN apt-get install python2.7 python2.7-dev python-pip wget -y
RUN pip install --upgrade pip
RUN pip install numpy==1.9.0
RUN pip install scipy==0.16.0
RUN pip install biopython==1.67
RUN pip install awscli

RUN apt-get update && \
	apt-get install -y python python-dev python-pip git build-essential wget && \
	curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - && \
	sudo apt-get -y install nodejs && \
	apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

EXPOSE 3000
ENV PORT=3000

RUN mkdir /app
WORKDIR /app

#setup node
ADD package.json /app/package.json
RUN npm update -g npm && npm install

ADD . /app

RUN cd /app
RUN npm run build

CMD  ["npm" , "run", "start"]
