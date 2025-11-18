import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import HomeReviewCard from "./HomeReviewCard";

const ThreeD = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 40;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);

    scene.add(new THREE.AmbientLight(0xffffff, 2));
    scene.add(new THREE.SpotLight(0xffffff, 1));

    let burger;

    const getScaleBasedOnScreen = () => {
      const baseScale = 0.45;
      const multiplier =
        window.innerWidth < 640 ? 0.7 : window.innerWidth < 1024 ? 0.85 : 1;

      return baseScale * multiplier;
    };

    new GLTFLoader().load("/krabby_patty_burger.glb", (gltf) => {
      burger = gltf.scene;
      burger.position.set(0, -5, 0);
      burger.rotation.x = 0.6;

      const scale = getScaleBasedOnScreen();
      burger.scale.set(scale + 0.3, scale + 0.3, scale + 0.3);

      scene.add(burger);
    });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;

    const resizeRenderer = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);

      if (burger) {
        const scale = getScaleBasedOnScreen();
        burger.scale.set(scale + 0.3, scale + 0.3, scale + 0.3);
      }
    };

    window.addEventListener("resize", resizeRenderer);
    resizeRenderer();

    const animate = () => {
      if (burger) burger.rotation.y += 0.001;
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener("resize", resizeRenderer);
  }, []);

  return (
    <div className="w-10/12 mx-auto">
      <div>
        <div className="w-full max-w-lg ">
          <canvas
            ref={canvasRef}
            className="w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] bg-transparent "
          />
        </div>
      </div>
    </div>
  );
};

export default ThreeD;
