import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ActiveTab } from './Navbar';
import { useAuth } from '../context/AuthContext';
import { 
  Sparkles, 
  Send, 
  X, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  RotateCw,
  Flame,
  ChevronDown,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface KaizSupportAIProps {
  setActiveTab: (tab: ActiveTab) => void;
}

export const KaizSupportAI: React.FC<KaizSupportAIProps> = ({ setActiveTab }) => {
  const { totalPhysicalPortfolioValue, totalVirtualPortfolioValue, user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'kaiz' | 'user'; text: string; action?: { label: string; tab: ActiveTab } }>>([
    {
      sender: 'kaiz',
      text: "Greetings, Collector. I am Kaiz, your AI Sentinel for Rare Vault. Whether you're authenticating a PSA 10 grail or negotiating high-demand Blox Fruits trades, I've got your back. What can I evaluate for you today?",
      action: { label: 'Calculate Blox Fruits Trade', tab: 'blox' }
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const canvasMountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    kaizGroup: THREE.Group;
    capeMesh: THREE.Mesh;
    leftEye: THREE.Mesh;
    rightEye: THREE.Mesh;
    chestGlow: THREE.PointLight;
    animId?: number;
  } | null>(null);

  // Initialize Three.js 3D Superman-type model
  useEffect(() => {
    if (!canvasMountRef.current) return;
    const container = canvasMountRef.current;
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 360;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0.6, 3.8);

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. Studio Lighting Rig (Warm Key, Cool Fill, Cyber Rim)
    const ambientLight = new THREE.AmbientLight(0x0f172a, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 3.2); // Cyber cyan key
    keyLight.position.set(2, 4, 3);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xec4899, 2.5); // Magenta/amber rim
    rimLight.position.set(-2, 2, -2);
    scene.add(rimLight);

    const chestGlow = new THREE.PointLight(0x38bdf8, 2, 4);
    chestGlow.position.set(0, 0.8, 0.6);
    scene.add(chestGlow);

    // 4. Construct Procedural 3D Superman-type Model "Kaiz"
    const kaizGroup = new THREE.Group();

    // PBR Materials
    const suitMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f2b5c, // Deep royal cobalt blue superhero suit
      metalness: 0.65,
      roughness: 0.25,
    });

    const armorAccentMaterial = new THREE.MeshStandardMaterial({
      color: 0x06b6d4, // Cyan metallic tech lines
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0x0284c7,
      emissiveIntensity: 0.3
    });

    const capeMaterial = new THREE.MeshStandardMaterial({
      color: 0xd91e36, // Vibrant superhero crimson cape
      metalness: 0.15,
      roughness: 0.7,
      side: THREE.DoubleSide
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xf59e0b, // Gold crest & belt
      metalness: 0.9,
      roughness: 0.2,
    });

    const skinMaterial = new THREE.MeshStandardMaterial({
      color: 0xdfad8b,
      metalness: 0.05,
      roughness: 0.6
    });

    const eyeGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0x00f5d4 // Laser glowing eyes
    });

    // A. Torso (Athletic muscular V-taper)
    const torsoGeo = new THREE.CylinderGeometry(0.38, 0.24, 0.75, 12);
    const torsoMesh = new THREE.Mesh(torsoGeo, suitMaterial);
    torsoMesh.position.y = 0.7;
    torsoMesh.castShadow = true;
    kaizGroup.add(torsoMesh);

    // B. Heroic Diamond "K" Chest Crest Emblem (Superman-style shield)
    const crestGroup = new THREE.Group();
    const shieldShape = new THREE.Shape();
    shieldShape.moveTo(0, 0.22);
    shieldShape.lineTo(0.24, 0.12);
    shieldShape.lineTo(0.18, -0.16);
    shieldShape.lineTo(0, -0.25);
    shieldShape.lineTo(-0.18, -0.16);
    shieldShape.lineTo(-0.24, 0.12);
    shieldShape.closePath();

    const crestGeo = new THREE.ShapeGeometry(shieldShape);
    const crestMesh = new THREE.Mesh(crestGeo, goldMaterial);
    crestMesh.position.set(0, 0.85, 0.3);
    crestMesh.scale.set(0.7, 0.7, 0.7);
    crestGroup.add(crestMesh);

    // Inner Crest Shield (Crimson background)
    const innerShield = new THREE.Mesh(crestGeo, new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      metalness: 0.5,
      roughness: 0.3
    }));
    innerShield.position.set(0, 0.85, 0.305);
    innerShield.scale.set(0.55, 0.55, 0.55);
    crestGroup.add(innerShield);

    // K Emblem in center
    const kLetterGeo = new THREE.BoxGeometry(0.04, 0.18, 0.02);
    const kMesh1 = new THREE.Mesh(kLetterGeo, goldMaterial);
    kMesh1.position.set(-0.04, 0.85, 0.315);
    crestGroup.add(kMesh1);

    const kMesh2 = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.12, 0.02), goldMaterial);
    kMesh2.position.set(0.03, 0.88, 0.315);
    kMesh2.rotation.z = -Math.PI / 4;
    crestGroup.add(kMesh2);

    const kMesh3 = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.12, 0.02), goldMaterial);
    kMesh3.position.set(0.03, 0.81, 0.315);
    kMesh3.rotation.z = Math.PI / 4;
    crestGroup.add(kMesh3);

    kaizGroup.add(crestGroup);

    // C. Head, Jaw & Cybernetic Hero Hair
    const headGroup = new THREE.Group();
    const headGeo = new THREE.SphereGeometry(0.19, 16, 16);
    headGeo.scale(0.9, 1.1, 0.95);
    const headMesh = new THREE.Mesh(headGeo, skinMaterial);
    headMesh.position.y = 1.25;
    headGroup.add(headMesh);

    // Cyber Hair / Helmet crest
    const hairGeo = new THREE.ConeGeometry(0.2, 0.22, 10);
    const hairMesh = new THREE.Mesh(hairGeo, new THREE.MeshStandardMaterial({
      color: 0x111827,
      metalness: 0.8,
      roughness: 0.3
    }));
    hairMesh.position.set(0, 1.42, -0.04);
    hairMesh.rotation.x = -0.3;
    headGroup.add(hairMesh);

    // Glowing Laser Eyes
    const eyeGeo = new THREE.SphereGeometry(0.028, 8, 8);
    const leftEye = new THREE.Mesh(eyeGeo, eyeGlowMaterial);
    leftEye.position.set(-0.065, 1.26, 0.16);
    headGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeGlowMaterial);
    rightEye.position.set(0.065, 1.26, 0.16);
    headGroup.add(rightEye);

    kaizGroup.add(headGroup);

    // D. Shoulders & Muscular Arms (Hero pose: hands at hips or hovering fists)
    const shoulderGeo = new THREE.SphereGeometry(0.14, 12, 12);
    
    // Left shoulder & arm
    const leftShoulder = new THREE.Mesh(shoulderGeo, armorAccentMaterial);
    leftShoulder.position.set(-0.45, 0.95, 0);
    kaizGroup.add(leftShoulder);

    const leftArmGeo = new THREE.CylinderGeometry(0.09, 0.08, 0.5, 8);
    const leftArm = new THREE.Mesh(leftArmGeo, suitMaterial);
    leftArm.position.set(-0.48, 0.65, 0);
    leftArm.rotation.z = 0.2;
    kaizGroup.add(leftArm);

    // Right shoulder & arm
    const rightShoulder = new THREE.Mesh(shoulderGeo, armorAccentMaterial);
    rightShoulder.position.set(0.45, 0.95, 0);
    kaizGroup.add(rightShoulder);

    const rightArm = new THREE.Mesh(leftArmGeo, suitMaterial);
    rightArm.position.set(0.48, 0.65, 0);
    rightArm.rotation.z = -0.2;
    kaizGroup.add(rightArm);

    // E. Golden Heroic Belt & Buckle
    const beltGeo = new THREE.CylinderGeometry(0.26, 0.25, 0.08, 16);
    const belt = new THREE.Mesh(beltGeo, goldMaterial);
    belt.position.y = 0.32;
    kaizGroup.add(belt);

    // F. Legs & Crimson Boots
    const legGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.65, 8);
    
    const leftLeg = new THREE.Mesh(legGeo, suitMaterial);
    leftLeg.position.set(-0.14, -0.05, 0);
    kaizGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, suitMaterial);
    rightLeg.position.set(0.14, -0.05, 0);
    kaizGroup.add(rightLeg);

    const bootGeo = new THREE.CylinderGeometry(0.1, 0.08, 0.45, 8);
    const bootMat = new THREE.MeshStandardMaterial({
      color: 0xb91c1c, // Crimson boots
      metalness: 0.6,
      roughness: 0.3
    });

    const leftBoot = new THREE.Mesh(bootGeo, bootMat);
    leftBoot.position.set(-0.14, -0.45, 0.03);
    kaizGroup.add(leftBoot);

    const rightBoot = new THREE.Mesh(bootGeo, bootMat);
    rightBoot.position.set(0.14, -0.45, 0.03);
    kaizGroup.add(rightBoot);

    // G. Flowing Superhero Cape (Procedural Plane with rippling vertices)
    const capeGeo = new THREE.PlaneGeometry(0.75, 1.45, 14, 18);
    const capeMesh = new THREE.Mesh(capeGeo, capeMaterial);
    capeMesh.position.set(0, 0.35, -0.22);
    capeMesh.rotation.x = 0.2;
    capeMesh.castShadow = true;
    kaizGroup.add(capeMesh);

    // H. Hover Energy Rings (Superman floating levitation)
    const hoverRingGeo = new THREE.RingGeometry(0.18, 0.32, 24);
    const hoverRingMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.5
    });
    const hoverRing = new THREE.Mesh(hoverRingGeo, hoverRingMat);
    hoverRing.rotation.x = Math.PI / 2;
    hoverRing.position.y = -0.75;
    kaizGroup.add(hoverRing);

    // Initial scale and offset
    kaizGroup.position.set(0, 0.1, 0);
    scene.add(kaizGroup);

    sceneRef.current = {
      renderer,
      scene,
      camera,
      kaizGroup,
      capeMesh,
      leftEye,
      rightEye,
      chestGlow
    };

    // 5. Animation Loop
    let clock = new THREE.Clock();
    const animate = () => {
      const animId = requestAnimationFrame(animate);
      if (sceneRef.current) sceneRef.current.animId = animId;

      const elapsedTime = clock.getElapsedTime();

      // Levitating / Floating Sine Wave
      kaizGroup.position.y = 0.05 + Math.sin(elapsedTime * 2.2) * 0.08;
      kaizGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.15;

      // Eye & Chest Glow Pulsing
      const glowIntensity = 1.5 + Math.sin(elapsedTime * 4.0) * 0.8;
      chestGlow.intensity = glowIntensity;

      // Cape Wave Rippling Animation
      const pos = capeGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const u = pos.getX(i);
        const v = pos.getY(i);
        const wave = Math.sin(v * 4.0 - elapsedTime * 5.0) * 0.08 * (1.0 - (v + 0.72));
        pos.setZ(i, wave - 0.05);
      }
      pos.needsUpdate = true;

      // Hover ring breathing
      hoverRing.scale.setScalar(1 + Math.sin(elapsedTime * 3) * 0.15);
      hoverRingMat.opacity = 0.4 + Math.sin(elapsedTime * 3) * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !sceneRef.current) return;
      const newW = container.clientWidth || 320;
      const newH = container.clientHeight || 360;
      sceneRef.current.camera.aspect = newW / newH;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (sceneRef.current?.animId) {
        cancelAnimationFrame(sceneRef.current.animId);
      }
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Handle queries to Kaiz
  const handleSendQuery = (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    // Add user message
    const newMsg = { sender: 'user' as const, text: q };
    setMessages((prev) => [...prev, newMsg]);
    setInputQuery('');
    setIsThinking(true);

    // Intelligent context-aware Kaiz AI responses
    setTimeout(() => {
      let reply = "";
      let action: { label: string; tab: ActiveTab } | undefined = undefined;
      const lower = q.toLowerCase();

      if (lower.includes('firebase') || lower.includes('database') || lower.includes('auth setup')) {
        reply = "To set up Firebase for Rare Vault: 1. Go to console.firebase.google.com and click Add Project. 2. Enable Authentication (Email/Password & Google). 3. Create a Cloud Firestore database in Production mode. 4. Configure firestore.rules to protect user vaults. 5. Copy your credentials into .env (VITE_FIREBASE_API_KEY, etc.). You can review our step-by-step interactive blueprint in your Vault Profile!";
        action = { label: 'Open Firebase Guide', tab: 'profile' };
      } else if (lower.includes('google') || lower.includes('live rate') || lower.includes('live price') || lower.includes('rates')) {
        reply = "Every single card, coin, and Blox Fruit on Rare Vault is directly connected to live Google market queries! Click the Google 'G' icon on any item card or use our top search bar to pull instant settled comps.";
        action = { label: 'Explore Live Tracker', tab: 'tracker' };
      } else if (lower.includes('rare') || lower.includes('intermediate') || lower.includes('magma') || lower.includes('light') || lower.includes('ghost') || lower.includes('ice') || lower.includes('rubber')) {
        reply = "Rare & Intermediate fruits are the ultimate balancing currency in Blox Fruits! Magma (2.5M, highest Sea Event DPS), Light (1.8M), Ghost (1.5M), Ice (1.2M), and Rubber (1.2M) make ideal trade sweeteners to tip scales from FAIR to WIN. In the trade calculator, use 'Fill Spaces with Rare' to populate all empty slots instantly!";
        action = { label: 'Go to Trade Calculator', tab: 'blox' };
      } else if (lower.includes('bell') || lower.includes('subscribe') || lower.includes('alert') || lower.includes('notification')) {
        reply = "Look for the small Bell icon on any physical asset or Blox Fruit card. Clicking it subscribes your account to live price updates. You can manage all your subscriptions and adjust your volatility sensitivity threshold (default ±2.5%) in your Vault Profile!";
        action = { label: 'Manage Subscriptions', tab: 'profile' };
      } else if (lower.includes('blox') || lower.includes('kitsune') || lower.includes('dragon') || lower.includes('wfl') || lower.includes('trade') || lower.includes('yeti') || lower.includes('gas')) {
        reply = "In the current Blox Fruits meta: Kitsune commands 125M (10/10 demand), Dragon Rework sits at 120M, Yeti Beast holds 85M, and Gas Fruit is at 65M! In legendary tiers, Buddha (10M) and Portal (9M) trade with near-infinite liquidity. You can auto-fill empty slots with rare & intermediate adds directly in our calculator.";
        action = { label: 'Open Blox Calculator', tab: 'blox' };
      } else if (lower.includes('charizard') || lower.includes('pokemon') || lower.includes('grade') || lower.includes('psa')) {
        reply = "For 1st Edition Shadowless Charizards, PSA 10 currently commands ~$285,000, whereas PSA 9 sits at ~$82,000. Centering tolerance between 50/50 and 55/45 is critical. Run your card through our Optical Scanner to inspect subgrades and centering ratios.";
        action = { label: 'Scan Card Now', tab: 'scanner' };
      } else if (lower.includes('portfolio') || lower.includes('vault') || lower.includes('net worth')) {
        const total = totalPhysicalPortfolioValue;
        reply = `Your tracked physical vault is valued at $${total.toLocaleString()}, alongside your high-liquidity Blox Fruits assets. Keep your price alert threshold set to ±2.5% so you never miss an auction swing.`;
        action = { label: 'Go to My Vault', tab: 'profile' };
      } else if (lower.includes('coin') || lower.includes('penny') || lower.includes('dollar') || lower.includes('bill') || lower.includes('currency')) {
        reply = "Key date rarities like the 1933 Double Eagle ($18.8M), 1794 Flowing Hair Dollar ($12M), 1909-S VDB Lincoln Cent ($128K), and $10,000 Salmon Chase bill ($480K) are fully indexed with live auction settled comps on our Live Tracker.";
        action = { label: 'View Live Tracker', tab: 'tracker' };
      } else {
        reply = "I've analyzed market order books across physical auction houses (Goldin, Heritage, Sotheby's) and Blox Fruits trading servers. What specific item, coin, card, or trade can I evaluate for you?";
      }

      setMessages((prev) => [...prev, { sender: 'kaiz', text: reply, action }]);
      setIsThinking(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Trigger Dock Button (Bottom Right) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-3.5 bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 hover:from-blue-600 hover:to-cyan-400 text-white rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.4)] border border-cyan-400/40 flex items-center gap-3 transition-all duration-300 hover:scale-105 cursor-pointer group"
          aria-label="Open Kaiz Support AI"
        >
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-slate-950 flex items-center justify-center font-display font-black text-cyan-400 text-lg border border-cyan-500/50">
              K
            </div>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-slate-950" />
          </div>

          <div className="text-left hidden sm:block">
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Kaiz AI Support</span>
              <span className="text-[10px] text-cyan-200 font-mono-numbers px-1 rounded bg-cyan-900/60">3D</span>
            </div>
            <div className="text-[11px] text-cyan-100/80">Vault Sentinel & Trade Advisor</div>
          </div>
        </button>
      )}

      {/* Interactive 3D Kaiz Support AI Modal / Deck */}
      {isOpen && (
        <div 
          className={`fixed z-50 transition-all duration-300 ${
            isExpanded
              ? 'inset-4 sm:inset-10 bg-[#080a12]/95 backdrop-blur-2xl border border-cyan-500/40 rounded-3xl shadow-2xl p-6 flex flex-col'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-full max-w-[420px] bg-[#0c0e17] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden'
          }`}
        >
          {/* Header Bar */}
          <div className="p-4 bg-[#08090d] border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center font-display font-black text-slate-950 text-sm">
                K
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Kaiz</span>
                  <span className="text-[10px] font-mono-numbers text-cyan-400">HERO SUPPORT AI</span>
                </div>
                <div className="text-[10px] text-slate-400">Live Valuation & Trading Sentinel</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Expand or contract Kaiz window"
              >
                {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Close Kaiz"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body: Split View (3D Canvas + Chat Log) */}
          <div className={`flex flex-col ${isExpanded ? 'lg:flex-row flex-1 overflow-hidden' : ''}`}>
            
            {/* 3D Model Stage */}
            <div className={`relative bg-gradient-to-b from-[#090b14] to-[#0e1220] flex items-center justify-center overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800 ${
              isExpanded ? 'lg:w-1/2 h-64 lg:h-full' : 'h-52'
            }`}>
              
              {/* Mounted WebGL Canvas */}
              <div ref={canvasMountRef} className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing" />

              {/* 3D Badge Overlay */}
              <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 border border-slate-700 text-[10px] font-mono-numbers text-cyan-300">
                SENTINEL: KAIZ-3D
              </div>

              {/* Superhero Motto */}
              <div className="absolute bottom-2 inset-x-3 text-center text-[10px] font-mono-numbers text-slate-500">
                Protecting your collection with real-time market data
              </div>
            </div>

            {/* Support Chat & Advice Deck */}
            <div className={`flex flex-col ${isExpanded ? 'lg:w-1/2 flex-1' : 'h-72'} bg-[#0a0c14]`}>
              
              {/* Message Feed */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
                {messages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-cyan-500 text-slate-950 font-medium rounded-br-none'
                          : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none shadow-md'
                      }`}
                    >
                      {m.text}
                    </div>

                    {m.action && (
                      <button
                        onClick={() => {
                          setActiveTab(m.action!.tab);
                          if (!isExpanded) setIsOpen(false);
                        }}
                        className="mt-1.5 px-3 py-1 bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 rounded-lg text-[11px] font-bold hover:bg-cyan-900 transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <Zap className="w-3 h-3 text-cyan-400" />
                        <span>{m.action.label} →</span>
                      </button>
                    )}
                  </div>
                ))}

                {isThinking && (
                  <div className="flex items-center gap-1 text-[11px] text-cyan-400 font-mono-numbers py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                    <span>Kaiz is analyzing trade books...</span>
                  </div>
                )}
              </div>

              {/* Quick Prompt Chips */}
              <div className="px-3 py-2 border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px]">
                <button
                  onClick={() => handleSendQuery("Is Kitsune for Dragon fair?")}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 whitespace-nowrap cursor-pointer"
                >
                  Kitsune vs Dragon?
                </button>
                <button
                  onClick={() => handleSendQuery("PSA 9 vs PSA 10 value gap?")}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 whitespace-nowrap cursor-pointer"
                >
                  PSA 9 vs 10 gap
                </button>
                <button
                  onClick={() => handleSendQuery("What's in my vault portfolio?")}
                  className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 whitespace-nowrap cursor-pointer"
                >
                  My Vault Value
                </button>
              </div>

              {/* Input Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendQuery();
                }}
                className="p-3 bg-[#08090d] border-t border-slate-800 flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputQuery}
                  onChange={(e) => setInputQuery(e.target.value)}
                  placeholder="Ask Kaiz about any card, coin, or Blox trade..."
                  className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  disabled={!inputQuery.trim()}
                  className="p-2 bg-gradient-to-r from-cyan-400 to-cyan-500 hover:from-cyan-300 hover:to-cyan-400 disabled:opacity-40 text-slate-950 font-bold rounded-xl transition-colors cursor-pointer"
                  aria-label="Send query"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>

            </div>

          </div>

        </div>
      )}
    </>
  );
};
