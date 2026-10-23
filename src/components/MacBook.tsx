import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useFinePointer } from "@/hooks/useSpotlight";
import { cn } from "@/lib/utils";

const SCREEN = { w: 29.4, h: 20 };
const MODEL_URL = "/models/mac-noUv.glb";
const LOGO_URL = "/Gyansetu.png";

function makeScreenTexture(onReady?: () => void): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1470;
  canvas.height = 1000;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D unavailable");

  const draw = (logo?: HTMLImageElement) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bg.addColorStop(0, "#0C1B3D");
    bg.addColorStop(0.55, "#08122B");
    bg.addColorStop(1, "#050B1E");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const glow = ctx.createRadialGradient(735, 430, 40, 735, 430, 720);
    glow.addColorStop(0, "rgba(212,175,55,0.22)");
    glow.addColorStop(0.45, "rgba(212,175,55,0.06)");
    glow.addColorStop(1, "rgba(212,175,55,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Fine survey grid, echoing the AeroShards markers.
    ctx.strokeStyle = "rgba(232,196,104,0.055)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= canvas.width; x += 70) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, canvas.height);
      ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += 70) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(canvas.width, y);
      ctx.stroke();
    }

    // Status chrome
    ctx.fillStyle = "rgba(250,247,241,0.55)";
    ctx.font = "500 20px Lexend, system-ui, sans-serif";
    ctx.fillText("Gyaansetu", 64, 66);
    ctx.fillStyle = "rgba(232,196,104,0.55)";
    ctx.font = "500 17px Lexend, system-ui, sans-serif";
    ctx.fillText("ACCESSIBILITY LAYER", 64, 96);

    ctx.beginPath();
    ctx.arc(1380, 62, 7, 0, Math.PI * 2);
    ctx.fillStyle = "#D4AF37";
    ctx.fill();

    if (logo) {
      const targetH = 620;
      const ratio = logo.width / logo.height;
      const targetW = Math.min(targetH * ratio, 700);
      const h = targetW / ratio;
      const x = (canvas.width - targetW) / 2;
      const y = 148;
      ctx.save();
      ctx.shadowColor = "rgba(212,175,55,0.35)";
      ctx.shadowBlur = 70;
      ctx.drawImage(logo, x, y, targetW, h);
      ctx.restore();
    } else {
      ctx.strokeStyle = "rgba(232,196,104,0.35)";
      ctx.strokeRect(460, 200, 550, 550);
    }

    // Divider + caption
    ctx.strokeStyle = "rgba(232,196,104,0.4)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(610, 800);
    ctx.lineTo(860, 800);
    ctx.stroke();

    ctx.textAlign = "center";
    ctx.fillStyle = "#E8C468";
    ctx.font = '500 40px "Noto Sans Devanagari", "Nirmala UI", sans-serif';
    ctx.fillText("ज्ञानसेतु", canvas.width / 2, 868);

    ctx.fillStyle = "rgba(250,247,241,0.6)";
    ctx.font = "500 17px Lexend, system-ui, sans-serif";
    ctx.letterSpacing = "8px";
    ctx.fillText("KNOWLEDGE SHOULD REACH EVERYONE", canvas.width / 2, 918);
    ctx.letterSpacing = "0px";
    ctx.textAlign = "left";
  };

  draw();
  const texture = new THREE.CanvasTexture(canvas);
  texture.flipY = false;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;

  const image = new Image();
  image.decoding = "async";
  image.src = LOGO_URL;
  image.onload = () => {
    draw(image);
    texture.needsUpdate = true;
    onReady?.();
  };

  return texture;
}

function makeKeyboardAlpha(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1400;
  canvas.height = 600;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const cols = 14;
  const rows = 5;
  const gap = 10;
  const keyW = (canvas.width - gap * (cols + 1)) / cols;
  const keyH = (canvas.height - gap * (rows + 1)) / rows;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = gap + col * (keyW + gap);
      const y = gap + row * (keyH + gap);
      const r = 8;
      ctx.fillStyle = row === rows - 1 && col === 6 ? "#b9b9b9" : row === 0 ? "#bcbcbc" : "#d6d6d6";
      ctx.beginPath();
      ctx.roundRect(x, y, keyW, keyH, r);
      ctx.fill();
    }
  }

  // Spacebar
  ctx.fillStyle = "#e2e2e2";
  ctx.beginPath();
  ctx.roundRect(gap + 4 * (keyW + gap), gap + 4 * (keyH + gap), keyW * 4 + gap * 3, keyH, 8);
  ctx.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function MacBook({ className }: { className?: string }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const { reduced } = useReducedMotion();
  const fine = useFinePointer();
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const fineRef = useRef(fine);
  fineRef.current = fine;

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let disposed = false;
    let raf = 0;
    let visible = true;
    let pageHidden = document.hidden;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      setState("error");
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.domElement.setAttribute("aria-hidden", "true");
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    renderer.domElement.style.touchAction = "pan-y";
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 10, 1000);
    camera.position.set(0, 1.5, 84);

    scene.add(new THREE.AmbientLight(0xfff7e8, 0.55));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(16, 22, 18);
    scene.add(key);
    const rim = new THREE.DirectionalLight(0xe8c468, 1.5);
    rim.position.set(-18, 8, -12);
    scene.add(rim);
    const fill = new THREE.PointLight(0xfff5e1, 0.9, 200);
    fill.position.set(0, 8, 14);
    scene.add(fill);

    const macGroup = new THREE.Group();
    macGroup.position.set(0, -8, -10);
    macGroup.scale.setScalar(1.78);
    scene.add(macGroup);
    const lidGroup = new THREE.Group();
    const bottomGroup = new THREE.Group();
    macGroup.add(lidGroup, bottomGroup);

    const materials = {
      shell: new THREE.MeshStandardMaterial({ color: 0xe9e1d3, metalness: 0.72, roughness: 0.38 }),
      dark: new THREE.MeshStandardMaterial({ color: 0x0b1733, metalness: 0.35, roughness: 0.62 }),
      camera: new THREE.MeshBasicMaterial({ color: 0x1a2440 }),
      logo: new THREE.MeshBasicMaterial({ color: 0xe8c468, toneMapped: false }),
      keyboard: new THREE.MeshStandardMaterial({
        color: 0x0e1b3a,
        metalness: 0.25,
        roughness: 0.7,
        alphaMap: makeKeyboardAlpha(),
        transparent: true,
      }),
    };

    const screenTexture = makeScreenTexture(() => {
      if (reduced) renderer.render(scene, camera);
    });
    const screenMaterial = new THREE.MeshBasicMaterial({
      map: screenTexture,
      transparent: true,
      opacity: reduced ? 0.98 : 0,
      side: THREE.BackSide,
      toneMapped: false,
    });

    const cleanup: Array<() => void> = [];
    const floatTweens: gsap.core.Tween[] = [];
    let intro: gsap.core.Timeline | null = null;

    const loader = new GLTFLoader();
    loader.load(
      MODEL_URL,
      (glb) => {
        if (disposed) return;

        glb.scene.children.forEach((child) => {
          if (child.name === "_top") {
            lidGroup.add(child);
            child.children.forEach((mesh) => {
              const m = mesh as THREE.Mesh;
              if (mesh.name === "lid") m.material = materials.shell;
              else if (mesh.name === "logo") m.material = materials.logo;
              else if (mesh.name === "screen-frame") m.material = materials.dark;
              else if (mesh.name === "camera") m.material = materials.camera;
            });
          } else if (child.name === "_bottom") {
            bottomGroup.add(child);
            child.children.forEach((mesh) => {
              const m = mesh as THREE.Mesh;
              if (mesh.name === "base") m.material = materials.shell;
              else if (["legs", "keyboard", "inner"].includes(mesh.name)) m.material = materials.dark;
            });
          }
        });

        const screenMesh = new THREE.Mesh(
          new THREE.PlaneGeometry(SCREEN.w, SCREEN.h),
          screenMaterial,
        );
        screenMesh.position.set(0, 10.5, -0.11);
        screenMesh.rotation.set(Math.PI, 0, 0);
        lidGroup.add(screenMesh);

        const backScreen = new THREE.Mesh(
          new THREE.PlaneGeometry(SCREEN.w, SCREEN.h),
          materials.dark,
        );
        backScreen.position.set(0, 10.5, -0.111);
        backScreen.rotation.set(Math.PI, Math.PI, 0);
        lidGroup.add(backScreen);

        const keyboard = new THREE.Mesh(
          new THREE.PlaneGeometry(27.7, 11.6),
          materials.keyboard,
        );
        keyboard.rotation.set(-Math.PI / 2, 0, 0);
        keyboard.position.set(0, 0.045, 7.21);
        bottomGroup.add(keyboard);

        const applyFinal = () => {
          macGroup.rotation.set(Math.PI * 0.05, -Math.PI * 0.1, 0);
          macGroup.position.y = -8;
          lidGroup.rotation.x = -Math.PI * 0.2;
          screenMaterial.opacity = 0.98;
        };

        if (reduced) {
          applyFinal();
          renderer.render(scene, camera);
          setState("ready");
          return;
        }

        intro = gsap.timeline({ defaults: { ease: "power2.out" } });
        intro
          .fromTo(
            macGroup.rotation,
            { x: Math.PI * 0.5, y: Math.PI * 0.2 },
            { x: Math.PI * 0.05, y: -Math.PI * 0.1, duration: 1.9, ease: "power3.out" },
            0,
          )
          .fromTo(macGroup.position, { y: -48 }, { y: -8, duration: 1.1, ease: "power3.out" }, 0)
          .fromTo(lidGroup.rotation, { x: Math.PI * 0.5 }, { x: -Math.PI * 0.2, duration: 1.15, ease: "power3.inOut" }, 0.45)
          .to(screenMaterial, { opacity: 0.98, duration: 0.35 }, 0.95)
          .add(() => setState("ready"), 0.2);

        floatTweens.push(
          gsap.to([lidGroup.position, bottomGroup.position], {
            y: "+=0.9",
            duration: 2.6,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
            delay: 1.4,
          }),
        );

        let downX = 0;
        let downY = 0;
        const onPointer = (event: PointerEvent) => {
          if (event.pointerType !== "mouse") return;
          const rect = host.getBoundingClientRect();
          downX = (event.clientX - rect.left) / rect.width - 0.5;
          downY = (event.clientY - rect.top) / rect.height - 0.5;
        };
        const onLeave = () => {
          downX = 0;
          downY = 0;
        };
        host.addEventListener("pointermove", onPointer, { passive: true });
        host.addEventListener("pointerleave", onLeave);
        cleanup.push(() => {
          host.removeEventListener("pointermove", onPointer);
          host.removeEventListener("pointerleave", onLeave);
        });

        const base = { x: Math.PI * 0.05, y: -Math.PI * 0.1 };
        const tilt = () => {
          if (fineRef.current) {
            macGroup.rotation.y += (base.y + downX * 0.16 - macGroup.rotation.y) * 0.05;
            macGroup.rotation.x += (base.x + downY * 0.09 - macGroup.rotation.x) * 0.05;
          }
        };

        const tick = () => {
          if (disposed) return;
          raf = requestAnimationFrame(tick);
          if (!visible || pageHidden) return;
          tilt();
          renderer.render(scene, camera);
        };
        tick();
      },
      undefined,
      () => {
        if (!disposed) setState("error");
      },
    );

    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (width === 0 || height === 0) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      if (reduced) renderer.render(scene, camera);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const onVisibility = () => {
      pageHidden = document.hidden;
    };
    document.addEventListener("visibilitychange", onVisibility);

    const intersection = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
      },
      { rootMargin: "120px" },
    );
    intersection.observe(host);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      observer.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      cleanup.forEach((fn) => fn());
      intro?.kill();
      floatTweens.forEach((tween) => tween.kill());
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        const material = mesh.material;
        if (Array.isArray(material)) material.forEach((m) => m.dispose());
        else if (material) (material as THREE.Material).dispose();
      });
      screenTexture.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [reduced]);

  return (
    <div ref={hostRef} className={cn("relative h-full w-full", className)}>
      {state === "loading" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <span className="relative flex size-12 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-gold-400/30" />
              <span className="size-2.5 rounded-full bg-gold-500" />
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted">
              Assembling the bridge
            </span>
          </div>
        </div>
      )}
      {state === "error" && (
        <div className="absolute inset-0 flex items-center justify-center px-8 text-center">
          <p className="max-w-xs text-xs leading-relaxed text-muted">
            3D preview unavailable on this device. The Gyaansetu app is shown here when WebGL is
            available.
          </p>
        </div>
      )}
    </div>
  );
}
