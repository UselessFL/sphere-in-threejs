import * as THREE from 'three';
import './style.css'
import gsap from 'gsap';
import {OrbitControls} from 'three/examples/jsm/controls/orbitControls'
const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3,64,64)
const material = new THREE.MeshStandardMaterial({
  color:'#00ff83'
})

const mesh = new THREE.Mesh(geometry,material) ;
scene.add(mesh)


//light
const light = new THREE.PointLight(0xffffff,70,100)
light.position.set(1,10,10)
const light2 = new THREE.PointLight(0xffffff,50,100)
light2.position.set(0,0,10)
scene.add(light)
scene.add(light2)
//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}
//camera 
const camera = new THREE.PerspectiveCamera(50,sizes.width / sizes.height, 0.1,100)
camera.position.z=20
scene.add(camera)


//renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.render(scene,camera)
renderer.setPixelRatio(2)



//resize
window.addEventListener('resize',()=>{

  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  
  camera.aspect = sizes.width/sizes.height
  renderer.setSize(sizes.width,sizes.height)
  camera.updateProjectionMatrix()
/*   renderer.render(scene,camera) */
})

//controls
const controls = new OrbitControls(camera,canvas)
controls.enableDamping = true
controls.autoRotate = true
controls.autoRotateSpeed = 5;
/* 
controls.enablePan = false
controls.enableZoom = false
*/

const loop = ()=>{

  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
  controls.update()
}
loop()
//timeline
const tl = gsap.timeline({defaults:{duration:1}})
tl.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})
tl.fromTo('nav', {y:'-100%'},{y:'0%'})
tl.fromTo('.title',{opacity:0},{opacity:1})

//mouse dragging animation 
let mouseDown = false
let rgb = [];
window.addEventListener('mousedown',()=>{mouseDown=true})
window.addEventListener('mouseup',()=>{mouseDown=false})

window.addEventListener('mousemove', (e)=>{
  if(mouseDown){
    rgb = [
      Math.round((e.pageX/sizes.width)*255),
      Math.round((e.pageY/sizes.height)*255),
      150
    ]
    console.log(rgb)
    let newColor=new THREE.Color(`rgb(${rgb.join(",")})`)//нельзя просто передвать цвет, нуженн объект 3жс 
    
    gsap.to(mesh.material.color,{r:newColor.r,g:newColor.g,b:newColor.b})
  }
})
