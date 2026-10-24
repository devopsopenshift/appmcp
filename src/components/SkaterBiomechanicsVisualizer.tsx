import React, { useState, useEffect, useRef } from 'react';
import { Wind, Gauge, Compass, Play, Pause, RotateCcw, Zap } from 'lucide-react';

interface BiomechanicsProps {
  onNarrate: (title: string, text: string) => void;
}

export const SkaterBiomechanicsVisualizer: React.FC<BiomechanicsProps> = ({ onNarrate }) => {
  const [animalMode, setAnimalMode] = useState<'falcon' | 'cheetah' | 'ibex' | 'godwit'>('falcon');
  const [torsoAngle, setTorsoAngle] = useState<number>(20); // 15 to 45 deg
  const [kneeAngle, setKneeAngle] = useState<number>(95); // 80 to 140 deg
  const [pushExtension, setPushExtension] = useState<number>(50); // 30 to 65 deg
  const [speedKmh, setSpeedKmh] = useState<number>(36); // 20 to 45 km/h
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showVectors, setShowVectors] = useState<boolean>(true);
  const [showAirflow, setShowAirflow] = useState<boolean>(true);
  const [animationTick, setAnimationTick] = useState<number>(0);

  // Animation loop for airflow particles and stride cycle
  useEffect(() => {
    let animId: number;
    const loop = () => {
      if (isPlaying) {
        setAnimationTick((prev) => (prev + 1) % 1000);
      }
      animId = requestAnimationFrame(loop);
    };
    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  // Sync presets when user switches animal adaptation
  useEffect(() => {
    if (animalMode === 'falcon') {
      setTorsoAngle(19);
      setKneeAngle(92);
      setPushExtension(48);
      onNarrate(
        'Peregrine Falcon Aerodynamic Tuck',
        'In Class 4 EVS, we learn that birds have streamlined bodies to cut through air with minimal resistance. At 36 km/h, lowering your son’s torso to 19 degrees reduces frontal air drag by 42%, conserving leg power for the final lap.'
      );
    } else if (animalMode === 'cheetah') {
      setTorsoAngle(22);
      setKneeAngle(96);
      setPushExtension(54);
      onNarrate(
        'Cheetah Explosive Hindlimb Lever',
        'Cheetahs sprint using powerful hindlimb joints acting as high-torque levers. An inline skater pushes laterally at a 50 to 54 degree angle, driving through the quadriceps, calves, and glutes to convert muscle glycogen into pure forward velocity.'
      );
    } else if (animalMode === 'ibex') {
      setTorsoAngle(25);
      setKneeAngle(88);
      setPushExtension(42);
      onNarrate(
        'Mountain Ibex Low Center of Gravity & Edge Grip',
        'Mountain goats lower their center of mass to grip steep cliffs. Speed skaters bend their knees to 88 degrees and lean inward at 24 degrees in corners, enduring 1.68 G of skeletal pressure on shin and ankle bones—requiring calcium from milk and curd.'
      );
    } else {
      setTorsoAngle(20);
      setKneeAngle(94);
      setPushExtension(45);
      onNarrate(
        'Migratory Bird Drafting & Oxygen Efficiency',
        'Migratory birds fly in formation to save energy. Drafting 30 centimeters behind a lead skater reduces mechanical effort by 30%. Iron from spinach supplies hemoglobin to deliver oxygen efficiently while riding the slipstream.'
      );
    }
  }, [animalMode]);

  // Aerodynamic & mechanical physics calculations
  const dragReduction = Math.max(8, Math.min(46, Math.round((46 - torsoAngle) * 1.4)));
  const vMs = speedKmh / 3.6;
  const frontalArea = (0.24 + (torsoAngle / 90) * 0.22).toFixed(2);
  const dragForceN = Math.round(0.5 * 1.225 * vMs * vMs * 0.55 * parseFloat(frontalArea));
  const pushEfficiency = Math.max(50, Math.min(98, Math.round(100 - Math.abs(50 - pushExtension) * 2.5)));
  const thrustWatts = Math.round((210 + speedKmh * 6) * (pushEfficiency / 100));
  const centripetalAcc = (vMs * vMs) / 25;
  const corneringG = (Math.sqrt(9.81 * 9.81 + centripetalAcc * centripetalAcc) / 9.81).toFixed(2);
  const leanDeg = Math.round((Math.atan(centripetalAcc / 9.81) * 180) / Math.PI);

  // Dynamic coordinates for the skater skeleton
  const hipX = 260;
  const hipY = 180;
  const torsoRad = (torsoAngle * Math.PI) / 180;
  const torsoLen = 95;
  const shoulderX = hipX + Math.cos(torsoRad) * torsoLen;
  const shoulderY = hipY - Math.sin(torsoRad) * torsoLen;
  const headX = shoulderX + 26;
  const headY = shoulderY - 10;

  // Stance leg (support under hip)
  const kneeFlexRad = ((180 - kneeAngle) * Math.PI) / 180;
  const supportKneeX = hipX + 28;
  const supportKneeY = hipY + 50;
  const supportAnkleX = hipX + 8;
  const supportAnkleY = 270;

  // Push leg extending behind
  const pushRad = (pushExtension * Math.PI) / 180;
  const pushKneeX = hipX - Math.cos(pushRad) * 55;
  const pushKneeY = hipY + Math.sin(pushRad) * 45;
  const pushAnkleX = hipX - Math.cos(pushRad) * 115;
  const pushAnkleY = 270;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
      {/* Visual Header & Animal Adaptation Selector */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-xs font-mono text-sky-700 font-semibold">
            BIOMECHANICAL WIND TUNNEL & KINEMATICS SIMULATOR
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
            Class 4 EVS Animal Movement & Aerodynamic Posture
          </h2>
        </div>

        {/* Animal Mode Segmented Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          <button
            type="button"
            onClick={() => setAnimalMode('falcon')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              animalMode === 'falcon'
                ? 'bg-sky-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            01. Falcon (Streamlined Tuck)
          </button>
          <button
            type="button"
            onClick={() => setAnimalMode('cheetah')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              animalMode === 'cheetah'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            02. Cheetah (Hindlimb Stride)
          </button>
          <button
            type="button"
            onClick={() => setAnimalMode('ibex')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              animalMode === 'ibex'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            03. Ibex (Cornering Edge Grip)
          </button>
          <button
            type="button"
            onClick={() => setAnimalMode('godwit')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              animalMode === 'godwit'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            04. Migratory Bird (Drafting)
          </button>
        </div>
      </div>

      {/* Main Interactive Stage: Canvas/SVG Graphics (Left 8 cols) + Controls & Real-Time Gauges (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Interactive SVG Graphic Viewport */}
        <div className="lg:col-span-8 bg-slate-950 rounded-xl p-4 sm:p-6 text-white relative overflow-hidden flex flex-col justify-between min-h-[380px]">
          {/* Top HUD Telemetry */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-slate-300 border-b border-slate-800 pb-3 z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-emerald-400 font-bold">WIND TUNNEL: {speedKmh} KM/H</span>
              <span className="text-slate-500">|</span>
              <span>TORSO: {torsoAngle}°</span>
              <span className="text-slate-500">|</span>
              <span>KNEE: {kneeAngle}°</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={torsoAngle <= 24 ? 'text-sky-400 font-bold' : 'text-amber-400 font-bold'}>
                {torsoAngle <= 24 ? 'LAMINAR STREAMLINE' : 'TURBULENT WAKE VORTEX'}
              </span>
            </div>
          </div>

          {/* SVG Animated Diagram */}
          <div className="relative w-full my-auto py-2">
            <svg
              viewBox="0 0 620 310"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Interactive 2D inline speed skater biomechanical wind tunnel simulation"
            >
              <defs>
                <linearGradient id="streamlineBlue" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#0284C7" stopOpacity="0.3" />
                </linearGradient>
                <linearGradient id="streamlineRed" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
                  <stop offset="60%" stopColor="#EF4444" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#DC2626" stopOpacity="0.2" />
                </linearGradient>
                <pattern id="trackGrid" width="40" height="20" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="20" x2="40" y2="20" stroke="#334155" strokeWidth="1" />
                  <line x1="0" y1="20" x2="20" y2="0" stroke="#1E293B" strokeWidth="1" />
                </pattern>
              </defs>

              {/* Track Surface */}
              <rect x="0" y="278" width="620" height="32" fill="#0F172A" />
              <line x1="0" y1="278" x2="620" y2="278" stroke="#475569" strokeWidth="3" />
              <rect x="0" y="278" width="620" height="32" fill="url(#trackGrid)" />

              {/* Dynamic Animated Airflow Streamlines */}
              {showAirflow && (
                <g>
                  {[40, 75, 110, 145, 180, 215, 250].map((y, i) => {
                    const offset = (animationTick * 4 + i * 35) % 80;
                    const isHighTorso = torsoAngle > 26;
                    const deflector = Math.max(10, (torsoAngle - 10) * 1.5);
                    const streamPath = `M 10 ${y} Q ${shoulderX - 30} ${
                      y < shoulderY ? y - deflector * 0.4 : y + deflector * 0.3
                    } ${hipX} ${y < hipY ? y - deflector * 0.2 : y + deflector * 0.5} T 610 ${y}`;

                    return (
                      <g key={y}>
                        <path
                          d={streamPath}
                          fill="none"
                          stroke={isHighTorso && y < 190 ? 'url(#streamlineRed)' : 'url(#streamlineBlue)'}
                          strokeWidth={i === 2 || i === 3 ? '2.5' : '1.5'}
                          strokeDasharray="16 10"
                          strokeDashoffset={-offset}
                          opacity={0.85}
                        />
                      </g>
                    );
                  })}
                </g>
              )}

              {/* Falcon Silhouette Ghost Overlay (When Falcon Mode active) */}
              {animalMode === 'falcon' && (
                <g opacity="0.22" transform={`translate(${shoulderX - 40}, ${shoulderY - 35}) rotate(${torsoAngle - 10})`}>
                  <path
                    d="M 120 20 Q 80 5 0 25 Q 40 45 80 35 Q 120 40 140 20 Z"
                    fill="#38BDF8"
                  />
                  <path
                    d="M 60 20 Q 80 -40 130 -20 Q 90 0 60 20 Z"
                    fill="#38BDF8"
                  />
                  <text x="145" y="15" fill="#38BDF8" className="font-mono text-[9px] font-bold">
                    FALCON STREAMLINE DIVE PROFILE
                  </text>
                </g>
              )}

              {/* Cheetah Spine & Lever Ghost Overlay */}
              {animalMode === 'cheetah' && (
                <g opacity="0.28" transform={`translate(${hipX - 120}, ${hipY - 45})`}>
                  <path
                    d="M 20 60 Q 60 10 140 20 Q 180 30 220 15"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="4"
                    strokeDasharray="6 3"
                  />
                  <text x="50" y="12" fill="#F59E0B" className="font-mono text-[9px] font-bold">
                    CHEETAH HINDLIMB EXTENSION LEVER
                  </text>
                </g>
              )}

              {/* Mountain Ibex Center-of-Gravity & Lean Overlay */}
              {animalMode === 'ibex' && (
                <g transform={`translate(${hipX}, ${hipY})`}>
                  {/* Center of Gravity Marker */}
                  <circle cx="0" cy="0" r="14" fill="none" stroke="#10B981" strokeWidth="2.5" strokeDasharray="3 3" />
                  <circle cx="0" cy="0" r="4" fill="#10B981" />
                  <text x="20" y="-8" fill="#10B981" className="font-mono text-[10px] font-bold">
                    CoG: LOW (IBEX TRACTION)
                  </text>
                  {/* Centripetal Force Vector */}
                  <line x1="0" y1="0" x2="-75" y2="0" stroke="#10B981" strokeWidth="3" markerEnd="url(#arrow)" />
                  <polygon points="-80,0 -70,-5 -70,5" fill="#10B981" />
                  <text x="-95" y="-8" fill="#10B981" className="font-mono text-[9px]">
                    CORNERING LEAN: {leanDeg}°
                  </text>
                </g>
              )}

              {/* Skater Anatomy & Frame */}
              <g>
                {/* 1. Push Leg (Cheetah Hindlimb Lever Extension) */}
                <g>
                  {/* Femur / Thigh (Quads contracting) */}
                  <line
                    x1={hipX}
                    y1={hipY}
                    x2={pushKneeX}
                    y2={pushKneeY}
                    stroke="#F59E0B"
                    strokeWidth="12"
                    strokeLinecap="round"
                  />
                  {/* Quadriceps Muscle Belly Overlay */}
                  <ellipse
                    cx={(hipX + pushKneeX) / 2}
                    cy={(hipY + pushKneeY) / 2 - 3}
                    rx="24"
                    ry="8"
                    transform={`rotate(${pushExtension * 0.7}, ${(hipX + pushKneeX) / 2}, ${(hipY + pushKneeY) / 2})`}
                    fill="#D97706"
                    opacity="0.8"
                  />
                  {/* Tibia & Fibula / Lower Leg */}
                  <line
                    x1={pushKneeX}
                    y1={pushKneeY}
                    x2={pushAnkleX}
                    y2={pushAnkleY}
                    stroke="#F59E0B"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  {/* Push Knee Joint */}
                  <circle cx={pushKneeX} cy={pushKneeY} r="7" fill="#FEF3C7" stroke="#B45309" strokeWidth="2" />
                  {/* Push Skate Frame & 4x110mm Urethane Wheels */}
                  <line
                    x1={pushAnkleX - 22}
                    y1={pushAnkleY + 4}
                    x2={pushAnkleX + 24}
                    y2={pushAnkleY + 4}
                    stroke="#E2E8F0"
                    strokeWidth="3.5"
                  />
                  {[-18, -6, 6, 18].map((dx) => (
                    <circle
                      key={dx}
                      cx={pushAnkleX + dx}
                      cy={pushAnkleY + 7}
                      r="5"
                      fill="#38BDF8"
                      stroke="#0F172A"
                      strokeWidth="1.5"
                    />
                  ))}
                </g>

                {/* 2. Stance / Support Leg (Absorbing 1.68G cornering load) */}
                <g>
                  {/* Thigh / Knee Bend */}
                  <line
                    x1={hipX}
                    y1={hipY}
                    x2={supportKneeX}
                    y2={supportKneeY}
                    stroke="#0284C7"
                    strokeWidth="14"
                    strokeLinecap="round"
                  />
                  {/* Lower Leg to Ground */}
                  <line
                    x1={supportKneeX}
                    y1={supportKneeY}
                    x2={supportAnkleX}
                    y2={supportAnkleY}
                    stroke="#0284C7"
                    strokeWidth="11"
                    strokeLinecap="round"
                  />
                  {/* Support Knee Joint with Angle Protractor */}
                  <circle cx={supportKneeX} cy={supportKneeY} r="8" fill="#E0F2FE" stroke="#0369A1" strokeWidth="2.5" />
                  <text
                    x={supportKneeX + 14}
                    y={supportKneeY + 4}
                    fill="#38BDF8"
                    className="font-mono text-[10px] font-bold"
                  >
                    {kneeAngle}°
                  </text>
                  {/* Stance Skate Frame & Wheels on Track */}
                  <line
                    x1={supportAnkleX - 22}
                    y1={supportAnkleY + 4}
                    x2={supportAnkleX + 24}
                    y2={supportAnkleY + 4}
                    stroke="#FFFFFF"
                    strokeWidth="4"
                  />
                  {[-18, -6, 6, 18].map((dx) => (
                    <circle
                      key={dx}
                      cx={supportAnkleX + dx}
                      cy={supportAnkleY + 8}
                      r="5.5"
                      fill="#38BDF8"
                      stroke="#0284C7"
                      strokeWidth="1.5"
                    />
                  ))}
                </g>

                {/* 3. Hip & Gluteus Maximus Engine */}
                <circle cx={hipX} cy={hipY} r="12" fill="#0369A1" stroke="#38BDF8" strokeWidth="2" />
                <ellipse cx={hipX - 10} cy={hipY - 4} rx="16" ry="12" fill="#0284C7" opacity="0.85" />
                <text x={hipX - 35} y={hipY - 14} fill="#E0F2FE" className="font-mono text-[9px] font-bold">
                  GLUTES (PROTEIN REPAIR)
                </text>

                {/* 4. Streamlined Torso & Spine (Peregrine Falcon Tuck) */}
                <line
                  x1={hipX}
                  y1={hipY}
                  x2={shoulderX}
                  y2={shoulderY}
                  stroke="#38BDF8"
                  strokeWidth="15"
                  strokeLinecap="round"
                />
                {/* Arms Locked over Lumbar Spine (Aero Discipline) */}
                <path
                  d={`M ${shoulderX - 10} ${shoulderY + 6} Q ${(hipX + shoulderX) / 2} ${
                    (hipY + shoulderY) / 2 - 12
                  } ${hipX + 5} ${hipY - 8}`}
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="6"
                  strokeLinecap="round"
                />

                {/* 5. Aerodynamic Helmet & Visor */}
                <ellipse
                  cx={headX}
                  cy={headY}
                  rx="18"
                  ry="12"
                  transform={`rotate(${-torsoAngle * 0.7}, ${headX}, ${headY})`}
                  fill="#0284C7"
                  stroke="#38BDF8"
                  strokeWidth="2"
                />
                {/* Aero Tail of Helmet */}
                <polygon
                  points={`${headX - 16},${headY - 2} ${headX - 32},${headY + 6} ${headX - 12},${headY + 10}`}
                  fill="#0369A1"
                />
                {/* Eye Visor */}
                <path
                  d={`M ${headX + 8} ${headY + 2} Q ${headX + 16} ${headY + 4} ${headX + 12} ${headY + 10}`}
                  fill="none"
                  stroke="#FDE68A"
                  strokeWidth="3.5"
                />

                {/* Force Vector Arrows (If Toggled) */}
                {showVectors && (
                  <g>
                    {/* Lateral Ground Reaction Force Vector */}
                    <line
                      x1={pushAnkleX}
                      y1={pushAnkleY}
                      x2={pushAnkleX - 45}
                      y2={pushAnkleY - 45}
                      stroke="#10B981"
                      strokeWidth="3"
                    />
                    <polygon
                      points={`${pushAnkleX - 50},${pushAnkleY - 50} ${pushAnkleX - 40},${pushAnkleY - 48} ${
                        pushAnkleX - 48
                      },${pushAnkleY - 40}`}
                      fill="#10B981"
                    />
                    <text
                      x={pushAnkleX - 70}
                      y={pushAnkleY - 55}
                      fill="#10B981"
                      className="font-mono text-[9px] font-bold"
                    >
                      PUSH VECTOR ({thrustWatts}W)
                    </text>

                    {/* Aerodynamic Drag Opposition Vector */}
                    <line
                      x1={shoulderX + 10}
                      y1={shoulderY}
                      x2={shoulderX + 55}
                      y2={shoulderY}
                      stroke="#EF4444"
                      strokeWidth="3"
                    />
                    <polygon
                      points={`${shoulderX + 62},${shoulderY} ${shoulderX + 52},${shoulderY - 5} ${
                        shoulderX + 52
                      },${shoulderY + 5}`}
                      fill="#EF4444"
                    />
                    <text
                      x={shoulderX + 18}
                      y={shoulderY - 8}
                      fill="#EF4444"
                      className="font-mono text-[9px] font-bold"
                    >
                      DRAG: {dragForceN} N
                    </text>
                  </g>
                )}
              </g>
            </svg>
          </div>

          {/* Bottom Interactive Viewport Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs font-mono z-10">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md flex items-center gap-1.5 transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                {isPlaying ? 'Pause Wind' : 'Start Wind'}
              </button>
              <button
                type="button"
                onClick={() => setShowVectors(!showVectors)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors"
              >
                {showVectors ? 'Hide Vectors' : 'Show Vectors'}
              </button>
              <button
                type="button"
                onClick={() => setShowAirflow(!showAirflow)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md transition-colors"
              >
                {showAirflow ? 'Hide Airflow' : 'Show Airflow'}
              </button>
            </div>
            <div className="text-slate-400">
              Drag Force: <strong className="text-emerald-400">{dragForceN} N</strong> · Propulsive Power: <strong className="text-sky-400">{thrustWatts} W</strong>
            </div>
          </div>
        </div>

        {/* Right Interactive Parameter Sliders & Scientific Telemetry Gauges */}
        <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <div className="text-xs font-mono text-slate-500">REAL-TIME BIOMECHANICS TUNER</div>
              <h3 className="font-display text-lg font-bold text-slate-900 mt-0.5">
                Kinematic Angles & Speed
              </h3>
            </div>

            {/* Slider 1: Torso Tuck Angle */}
            <div className="space-y-1.5 bg-white p-3 rounded-lg border border-slate-200">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800">Torso Tuck Angle (Falcon)</span>
                <span className="font-mono text-sky-700">{torsoAngle}°</span>
              </div>
              <input
                type="range"
                min={15}
                max={45}
                value={torsoAngle}
                onChange={(e) => setTorsoAngle(Number(e.target.value))}
                className="w-full accent-[#0284C7] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>15° (Low Drag)</span>
                <span>20° (Ideal)</span>
                <span>45° (High Drag)</span>
              </div>
            </div>

            {/* Slider 2: Knee Flexion Angle */}
            <div className="space-y-1.5 bg-white p-3 rounded-lg border border-slate-200">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800">Knee Bend Angle (Ibex Traction)</span>
                <span className="font-mono text-emerald-700">{kneeAngle}°</span>
              </div>
              <input
                type="range"
                min={82}
                max={135}
                value={kneeAngle}
                onChange={(e) => setKneeAngle(Number(e.target.value))}
                className="w-full accent-[#059669] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>85° (Deep Crouch)</span>
                <span>95° (Power Apex)</span>
                <span>135° (High)</span>
              </div>
            </div>

            {/* Slider 3: Lateral Push Extension */}
            <div className="space-y-1.5 bg-white p-3 rounded-lg border border-slate-200">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800">Stride Push Angle (Cheetah Lever)</span>
                <span className="font-mono text-amber-700">{pushExtension}°</span>
              </div>
              <input
                type="range"
                min={35}
                max={65}
                value={pushExtension}
                onChange={(e) => setPushExtension(Number(e.target.value))}
                className="w-full accent-[#D97706] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>35° (Shallow)</span>
                <span>50°–54° (Optimal)</span>
                <span>65° (Wide)</span>
              </div>
            </div>

            {/* Slider 4: Track Speed */}
            <div className="space-y-1.5 bg-white p-3 rounded-lg border border-slate-200">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800">Track Sprint Velocity</span>
                <span className="font-mono text-purple-700">{speedKmh} km/h</span>
              </div>
              <input
                type="range"
                min={20}
                max={45}
                value={speedKmh}
                onChange={(e) => setSpeedKmh(Number(e.target.value))}
                className="w-full accent-[#7C3AED] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>20 km/h</span>
                <span>36 km/h (Sprint)</span>
                <span>45 km/h</span>
              </div>
            </div>
          </div>

          {/* Real-Time Mathematical Telemetry Card */}
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2">
            <div className="text-xs font-mono text-slate-500">PHYSICS OUTPUT DERIVATION</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-slate-50 rounded border border-slate-100">
                <div className="text-slate-500 text-[10px]">Air Drag Saved</div>
                <div className="font-mono text-base font-bold text-emerald-700">-{dragReduction}%</div>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-100">
                <div className="text-slate-500 text-[10px]">Cornering Force</div>
                <div className="font-mono text-base font-bold text-sky-700">{corneringG} G</div>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-100">
                <div className="text-slate-500 text-[10px]">Thrust Output</div>
                <div className="font-mono text-base font-bold text-amber-700">{thrustWatts} W</div>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-100">
                <div className="text-slate-500 text-[10px]">Lean Angle</div>
                <div className="font-mono text-base font-bold text-purple-700">{leanDeg}°</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 pt-1 leading-relaxed">
              <strong>EVS Connection:</strong> Cornering at {corneringG}G requires strong calcium bone density (milk/curd) to protect the tibia and ankles under lateral load.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
