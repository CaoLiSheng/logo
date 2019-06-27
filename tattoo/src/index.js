import imgSrc from './logo_1_6.png';
import * as THREE from 'three';
import makeTextTexture from './makeTextTexture';
import vertexShader from './vertexShader';
import fragmentShader from './fragmentShader';

const width = window.innerWidth;
const height = window.innerHeight;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0, 1000);

const geometry = new THREE.PlaneGeometry(width, height);
const tattoo = makeTextTexture('不减二十斤\n就不换葫芦');
const material = new THREE.ShaderMaterial({
  uniforms: {
    texture: {
      type: 't',
      value: new THREE.TextureLoader().load(imgSrc),
    },
    tattoo: {
      type: 't',
      value: tattoo.texture,
    },
    params: {
      type: 'vec4',
      value: new THREE.Vector4(0.2, 0.62, tattoo.width + 0.0, tattoo.height + 0.0),
    },
    effects: {
      type: 'vec3',
      value: new THREE.Vector3(Math.PI * 55 / 180, 0.5, 0.5),
    }
  },
  vertexShader,
  fragmentShader,
  transparent: true,
});
const plane = new THREE.Mesh(geometry, material);
scene.add(plane);

function animate() {
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}
animate();