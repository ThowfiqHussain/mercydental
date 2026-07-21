import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeTooth() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 6.5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xfffaed, 3.8);
    mainLight.position.set(5, 8, 6);
    scene.add(mainLight);

    const goldPointLight = new THREE.PointLight(0xd4af37, 4.5, 15);
    goldPointLight.position.set(-4, -2, 4);
    scene.add(goldPointLight);

    const backLight = new THREE.DirectionalLight(0xe2e8f0, 2.2);
    backLight.position.set(-5, 6, -5);
    scene.add(backLight);

    // Tooth Main Group
    const toothGroup = new THREE.Group();

    // Translucent Pearl-Glass Material
    const pearlGlassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.90,
      opacity: 1,
      transparent: true,
      roughness: 0.10,
      ior: 1.52,
      reflectivity: 0.95,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04,
      metalness: 0.08,
      attenuationColor: new THREE.Color(0xd4af37),
      attenuationDistance: 2.2,
      specularColor: new THREE.Color(0xfff6e0),
    });

    // --- CROWN GEOMETRY (Matching exact molar reference outline) ---
    // A box with high subdivisions deformed into the exact 2-cusp molar crown
    const crownGeo = new THREE.BoxGeometry(2.1, 1.7, 1.6, 64, 64, 64);
    const pos = crownGeo.attributes.position;

    for (let i = 0; i < pos.count; i++) {
      let x = pos.getX(i);
      let y = pos.getY(i);
      let z = pos.getZ(i);

      // Normalize Y from [-0.85, 0.85] to [0, 1]
      let ny = (y + 0.85) / 1.7;

      // 1. Waist pinch at bottom (ny near 0), expanding shoulder at top (ny near 0.7)
      let widthFactor = 0.72 + Math.sin(ny * Math.PI * 0.85) * 0.45;
      if (ny < 0.2) {
        widthFactor = 0.70 + ny * 0.2; // waist narrowing
      }

      x *= widthFactor;
      z *= (0.78 + Math.sin(ny * Math.PI * 0.85) * 0.35);

      // 2. Molar Occlusal Surface (Top Cusps & Dip)
      if (ny > 0.6) {
        let cuspFactor = Math.pow((ny - 0.6) / 0.4, 1.5);
        // Left Cusp (x < 0) & Right Cusp (x > 0)
        let dualCusp = Math.sin(Math.abs(x) * 1.8) * 0.22 - (1 - Math.abs(x * 0.8)) * 0.08;
        y += dualCusp * cuspFactor;
        
        // Rounded outer shoulders
        x *= (1 - Math.pow((ny - 0.7), 2) * 0.3);
      }

      // Smooth rounding of box corners
      let distCorner = Math.sqrt(x*x + z*z);
      if (distCorner > 0.01) {
        let smoothFactor = Math.sin(Math.min(1, distCorner / 1.2) * (Math.PI / 2));
        x = (x / distCorner) * smoothFactor * 1.15;
        z = (z / distCorner) * smoothFactor * 0.95;
      }

      pos.setXYZ(i, x, y + 0.5, z);
    }
    crownGeo.computeVertexNormals();

    const crownMesh = new THREE.Mesh(crownGeo, pearlGlassMaterial);
    toothGroup.add(crownMesh);

    // --- ROOTS GEOMETRY (Matching twin tapered roots with U-shaped arch) ---
    const createRoot = (isLeft) => {
      const rootGeo = new THREE.CylinderGeometry(0.48, 0.10, 1.7, 32, 32);
      const rPos = rootGeo.attributes.position;
      const direction = isLeft ? -1 : 1;

      for (let i = 0; i < rPos.count; i++) {
        let rx = rPos.getX(i);
        let ry = rPos.getY(i);
        let rz = rPos.getZ(i);

        // Normalize ry from [-0.85, 0.85] to [0, 1] (1 is top near crown, 0 is root tip)
        let nry = (ry + 0.85) / 1.7;

        // Curve root gently outward then inward to match reference outline
        let curveX = Math.sin((1 - nry) * Math.PI * 0.7) * 0.18 * direction;
        rx += curveX;

        // Flatten slightly in Z for natural root anatomy
        rz *= 0.82;

        rPos.setXYZ(i, rx, ry, rz);
      }
      rootGeo.computeVertexNormals();

      const rootMesh = new THREE.Mesh(rootGeo, pearlGlassMaterial);
      rootMesh.position.set(direction * 0.48, -0.9, 0);
      rootMesh.rotation.z = direction * -0.08;
      return rootMesh;
    };

    const leftRoot = createRoot(true);
    const rightRoot = createRoot(false);
    toothGroup.add(leftRoot);
    toothGroup.add(rightRoot);

    // --- BIFURCATION ARCH (Smooth Inverted U-shape bridge between roots) ---
    const archGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.6, 32);
    const archMesh = new THREE.Mesh(archGeo, pearlGlassMaterial);
    archMesh.position.set(0, -0.2, 0);
    archMesh.rotation.z = Math.PI / 2;
    archMesh.scale.set(0.9, 1.2, 0.7);
    toothGroup.add(archMesh);

    // --- INNER GOLD VITALITY CORE ---
    const coreGeo = new THREE.IcosahedronGeometry(0.58, 4);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      emissive: 0xd4af37,
      emissiveIntensity: 0.65,
      roughness: 0.15,
      metalness: 0.95,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    coreMesh.position.y = 0.45;
    toothGroup.add(coreMesh);

    // --- GOLDEN HALO RING ---
    const ringGeo = new THREE.TorusGeometry(2.1, 0.015, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.45,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2.3;
    toothGroup.add(ringMesh);

    scene.add(toothGroup);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 0.7;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 0.7;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Render loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Floating motion
      toothGroup.position.y = Math.sin(elapsedTime * 0.8) * 0.22;

      // Rotation & mouse follow
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      toothGroup.rotation.y = elapsedTime * 0.25 + targetX * 1.4;
      toothGroup.rotation.x = Math.sin(elapsedTime * 0.5) * 0.08 + targetY * 1.1;

      // Halo ring rotation
      ringMesh.rotation.z = elapsedTime * 0.35;
      ringMesh.scale.setScalar(1 + Math.sin(elapsedTime * 1.2) * 0.03);

      // Core pulse
      coreMat.emissiveIntensity = 0.55 + Math.sin(elapsedTime * 2.2) * 0.3;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[420px] md:min-h-[580px] flex items-center justify-center">
      {/* Volumetric Backdrop Glow */}
      <div className="absolute w-72 h-72 md:w-96 md:h-96 bg-gold-light/25 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing z-10" />
    </div>
  );
}
