import './style.css';
import * as THREE from 'three';
import vertexShader from './shaders/vertexShader.glsl';
import fragmentShader from './shaders/fragmentShader.glsl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

const canvas = document.querySelector('#canvas');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 100);
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const geometry = new THREE.IcosahedronGeometry(3, 25); // Reduced subdivisions for better performance
const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        uTime: { value: 0.0 },
        uColorChange: { value: 0.0 },
    },
});
const mesh = new THREE.Mesh(geometry, material);
mesh.position.y = -4;
scene.add(mesh);

camera.position.z = 20;

const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    material.uniforms.uTime.value = clock.getElapsedTime();
    renderer.render(scene, camera);
}

animate();

// Handle window resize
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

const tl = gsap.timeline({
    scrollTrigger: {
        trigger: '#landingPage',
        start: 'top top',
        end: 'bottom center',
        scrub: 2,
        pin: true,
    }
});

tl.to(mesh.position, {
    y: 0,
    z: -6,
    ease: 'power1.out',
}, "anyTag");
tl.to(material.uniforms.uColorChange, {
    value: 1,
    ease: 'power1.inOut',
}, "anyTag")
.to('#landingPage #anime1', {
    opacity: 0,
    duration: 0.6,
    ease: 'expo.out',
}, "anyTag")
.to('#landingPage #anime2', {
    delay: 0.3,
    top: "50vh",
    opacity: 1,
    duration: 1,
    ease: 'power2.inOut',
}, "anyTag")
.to('#learnmoreBtn', {
    delay: 0.3,
    top: "80vh",
    opacity: 1,
    duration: 1,
    ease: 'power2.inOut',
}, "anyTag");

const learnmoreBtn = document.querySelector('#landingPage #learnmoreBtn');
const bg = document.querySelector('#learnmoreBtn #bg');
const learnmoreBtnText = document.querySelector('#learnmoreBtn #text');

let hoverTimeline = gsap.timeline({ paused: true });

hoverTimeline.to(bg, {
    scale: 1.2,
    top: "-50%",
    duration: 0.35,
    ease: 'power1.in',
});
hoverTimeline.to(learnmoreBtnText, {
    transform: "translateY(3%)",
    duration: 0.25,
    ease: 'power1.in',
}, "<");

learnmoreBtn.addEventListener('mouseenter', () => {
    hoverTimeline.play();
});

learnmoreBtn.addEventListener('mouseleave', () => {
    hoverTimeline.reverse();
});