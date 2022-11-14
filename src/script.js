import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import { TextureLoader } from 'three'


/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//axes helper
// const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const matCapTexture = textureLoader.load('/textures/matcaps/4.png')

/* 
fonts
 */
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/fk.json',
    (font) => {
        console.log('font-loaded')
        const textGeometry = new TextGeometry(
            'cocopops',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curvedSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.01,
                bevelSize: 0.01,
                bevelOffset: 0,
                bevelSegments: 2
            }
        )
        textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.01) * 0.5,
        //     - (textGeometry.boundingBox.max.y - 0.01) * 0.5,
        //     - (textGeometry.boundingBox.max.z - 0.01) * 0.5,
        // )
        textGeometry.center()
        const material = new THREE.MeshMatcapMaterial({ matcap: matCapTexture })
        //textMaterial.wireframe = true
        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)
        //text.position.x = -1
        //console.time('donuts')

        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
        //const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matCapTexture })

        for (let i = 0; i < 200; i++) {

            const donut = new THREE.Mesh(donutGeometry, material)

            donut.position.x = Math.random() * 10 - 5
            donut.position.y = Math.random() * 10 - 5
            donut.position.z = Math.random() * 10 - 5

            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            const scale = Math.random()

            // donut.scale.x = scale
            // donut.scale.y = scale
            // donut.scale.z = scale
            donut.scale.set(scale, scale, scale)

            scene.add(donut)

        }
        //console.timeEnd('donuts')
    }


)



/**
 * Object
 */
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )

// scene.add(cube)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()