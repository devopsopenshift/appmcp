import React, { useState, useEffect } from 'react';
import { Film, Play, Pause, RotateCcw, Volume2, Eye, Zap, Shield, Compass } from 'lucide-react';

interface MotionPlayerProps {
  onNarrate: (title: string, text: string) => void;
}

interface MotionSequence {
  id: string;
  title: string;
  evsConcept: string;
  animalInspiration: string;
  speed: string;
  primaryMuscleOrBone: string;
  frames: {
    label: string;
    description: string;
    trunkAngle: number;
    kneeAngle: number;
    forceVectorN: number;
    footExtension: number;
  }[];
  narrationScript: string;
}

const MOTION_SEQUENCES: MotionSequence[] = [
  {
    id: 'cheetah_stride',
    title: 'Cheetah Lateral Double-Push & Glycogen Drive',
    evsConcept: 'Animal Movement · Muscular Hindlimb Lever + Carbohydrate Glycogen ATP',
    animalInspiration: 'Cheetah Explosive Sprint Bounds',
    speed: '38.4 km/h',
    primaryMuscleOrBone: 'Quadriceps, Gluteus Maximus, Calves',
    frames: [
      {
        label: 'Frame 1: Set & Load (Coiled Joint)',
        description: 'Skater sets on inside-to-outside edge; knee flexed at 94° with quadriceps loaded with stored glycogen.',
        trunkAngle: 22,
        kneeAngle: 94,
        forceVectorN: 340,
        footExtension: 15,
      },
      {
        label: 'Frame 2: Power Drive (50° Lateral Vector)',
        description: 'Explosive outward drive through the skate edge at 50°; glycogen hydrolyzes rapidly into ATP.',
        trunkAngle: 20,
        kneeAngle: 130,
        forceVectorN: 560,
        footExtension: 55,
      },
      {
        label: 'Frame 3: Full Cheetah Lever Lockout',
        description: 'Complete hip, knee (172°), and ankle extension; transferring 680N of ground reaction force into forward speed.',
        trunkAngle: 18,
        kneeAngle: 172,
        forceVectorN: 680,
        footExtension: 95,
      },
      {
        label: 'Frame 4: D-Loop Low-Drag Recovery',
        description: 'Push leg swings cleanly under hip while iron-rich blood perfuses relaxed muscle capillary beds.',
        trunkAngle: 21,
        kneeAngle: 105,
        forceVectorN: 280,
        footExtension: 25,
      },
    ],
    narrationScript:
      'Motion Analysis 1: Cheetah Lateral Stride. Watch how the skater coils at a 94-degree knee angle before driving outward to full 172-degree extension. This explosive lever action relies directly on muscle glycogen from whole wheat, brown rice, oats, and bananas.',
  },
  {
    id: 'falcon_tuck',
    title: 'Peregrine Falcon Streamlined Tuck & Air Drag Cut',
    evsConcept: 'Animal Adaptations · Streamlined Body in Birds + Daily Hydration',
    animalInspiration: 'Peregrine Falcon High-Speed Dive',
    speed: '41.2 km/h',
    primaryMuscleOrBone: 'Erector Spinae & Core Stabilizers',
    frames: [
      {
        label: 'Frame 1: High Posture (Unstreamlined)',
        description: 'Chest catches oncoming air at 45°; turbulent drag wastes 140 Watts of leg power.',
        trunkAngle: 45,
        kneeAngle: 115,
        forceVectorN: 410,
        footExtension: 40,
      },
      {
        label: 'Frame 2: Falcon Transition (Back Flattening)',
        description: 'Hands lock over lower spine; scapulae retract to shed boundary layer eddies.',
        trunkAngle: 28,
        kneeAngle: 100,
        forceVectorN: 490,
        footExtension: 65,
      },
      {
        label: 'Frame 3: Optimal 19° Falcon Streamline',
        description: 'Torso at 19° cuts frontal drag by 42%; laminar air glides smoothly over helmet and back.',
        trunkAngle: 19,
        kneeAngle: 92,
        forceVectorN: 620,
        footExtension: 85,
      },
      {
        label: 'Frame 4: Deep Aerodynamic Coasting',
        description: 'Maintaining low tuck without shoulder rise; 8 to 10 glasses of daily water prevents core heat fatigue.',
        trunkAngle: 19,
        kneeAngle: 90,
        forceVectorN: 510,
        footExtension: 45,
      },
    ],
    narrationScript:
      'Motion Analysis 2: Falcon Aerodynamic Tuck. Dropping the torso angle from 45 degrees to 19 degrees smooths airflow over the back, reducing drag by 42%. Drinking 8 to 10 glasses of water daily keeps muscles cool in this deep crouch.',
  },
  {
    id: 'ibex_corner',
    title: 'Mountain Ibex Banked Cornering & 1.68G Skeletal Lean',
    evsConcept: 'Animal Adaptations · Low Center of Gravity + Protective Calcium (Milk/Curd)',
    animalInspiration: 'Alpine Ibex Cliff Edge Traction',
    speed: '36.5 km/h',
    primaryMuscleOrBone: 'Tibia Bone, Ankle Frame, Adductors',
    frames: [
      {
        label: 'Frame 1: Corner Entry & Inward Lean (24°)',
        description: 'Skater leans inside apex; net gravity and centrifugal force pass straight through urethane skate frame.',
        trunkAngle: 23,
        kneeAngle: 90,
        forceVectorN: 580,
        footExtension: 50,
      },
      {
        label: 'Frame 2: Right-Over-Left Crossover Bite',
        description: 'Outside and inside edges carve the track; tibial bone absorbs 1.68 G of compression load.',
        trunkAngle: 21,
        kneeAngle: 88,
        forceVectorN: 720,
        footExtension: 90,
      },
      {
        label: 'Frame 3: Apex Slingshot Acceleration',
        description: 'Spinach-derived iron in red blood cells clears lactate as leg drives out of the turn onto straight.',
        trunkAngle: 19,
        kneeAngle: 165,
        forceVectorN: 700,
        footExtension: 98,
      },
      {
        label: 'Frame 4: Straightaway Re-Alignment',
        description: 'Body pops upright momentarily before dropping back into falcon tuck for straightaway speed.',
        trunkAngle: 22,
        kneeAngle: 100,
        forceVectorN: 480,
        footExtension: 30,
      },
    ],
    narrationScript:
      'Motion Analysis 3: Cornering Edge Grip and Bone Strength. Leaning inward at 24 degrees generates 1.68 G of force through the shin and ankle bones. Calcium from milk and curd keeps these bones sturdy against heavy track loads.',
  },
];

export const MotionBreakdownPlayer: React.FC<MotionPlayerProps> = ({ onNarrate }) => {
  const [selectedSeqIdx, setSelectedSeqIdx] = useState<number>(0);
  const [currentFrameIdx, setCurrentFrameIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showVectors, setShowVectors] = useState<boolean>(true);

  const activeSeq = MOTION_SEQUENCES[selectedSeqIdx];
  const activeFrame = activeSeq.frames[currentFrameIdx];

  // Auto-advance frames when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentFrameIdx((prev) => (prev + 1) % activeSeq.frames.length);
    }, 1600);
    return () => clearInterval(interval);
  }, [isPlaying, activeSeq.frames.length]);

  const handleSequenceSelect = (idx: number) => {
    setSelectedSeqIdx(idx);
    setCurrentFrameIdx(0);
    onNarrate(MOTION_SEQUENCES[idx].title, MOTION_SEQUENCES[idx].narrationScript);
  };

  // Skater coordinate math for the active frame
  const hipX = 270;
  const hipY = 130;
  const torsoRad = (activeFrame.trunkAngle * Math.PI) / 180;
  const shoulderX = hipX + Math.cos(torsoRad) * 88;
  const shoulderY = hipY - Math.sin(torsoRad) * 88;
  const headX = shoulderX + 22;
  const headY = shoulderY - 8;

  const pushX = hipX - 35 - activeFrame.footExtension * 0.9;
  const pushY = 210;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-xs font-mono text-purple-700 font-semibold">
            FRAME-BY-FRAME MOTION SEQUENCE LAB
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
            Biomechanical Movement Breakdown & Force Vectors
          </h2>
        </div>

        {/* Sequence Selector Buttons */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          {MOTION_SEQUENCES.map((seq, idx) => (
            <button
              key={seq.id}
              type="button"
              onClick={() => handleSequenceSelect(idx)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                idx === selectedSeqIdx
                  ? 'bg-purple-700 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {seq.title.split(' & ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Main Motion Stage (Left 8 cols) + Frame Scrubber & Telemetry (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Visual SVG Motion Canvas */}
        <div className="lg:col-span-8 bg-slate-950 rounded-xl p-5 text-white flex flex-col justify-between min-h-[380px] relative overflow-hidden">
          {/* Top Frame Telemetry */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-300 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400"></span>
              <span className="text-purple-400 font-bold">{activeFrame.label}</span>
            </div>
            <div className="text-emerald-400">
              TRUNK: {activeFrame.trunkAngle}° · KNEE: {activeFrame.kneeAngle}° · FORCE: {activeFrame.forceVectorN} N
            </div>
          </div>

          {/* SVG Skeleton with Force Vectors */}
          <div className="relative w-full my-auto py-2">
            <svg
              viewBox="0 0 600 240"
              className="w-full h-auto select-none"
              role="img"
              aria-label="High-speed frame-by-frame biomechanical skate motion player"
            >
              {/* Track line */}
              <line x1="20" y1="218" x2="580" y2="218" stroke="#334155" strokeWidth="3" />
              {[60, 160, 260, 360, 460].map((x) => (
                <line key={x} x1={x} y1="218" x2={x - 20} y2="238" stroke="#1E293B" strokeWidth="1.5" />
              ))}

              {/* Push Leg */}
              <line
                x1={hipX}
                y1={hipY}
                x2={pushX}
                y2={pushY}
                stroke="#10B981"
                strokeWidth="11"
                strokeLinecap="round"
              />
              {/* Push Skate Wheels */}
              <line x1={pushX - 18} y1={pushY + 4} x2={pushX + 20} y2={pushY + 4} stroke="#E2E8F0" strokeWidth="3" />
              {[-14, -4, 6, 16].map((dx) => (
                <circle key={dx} cx={pushX + dx} cy={pushY + 7} r="4.5" fill="#38BDF8" />
              ))}

              {/* Stance Leg */}
              <line
                x1={hipX}
                y1={hipY}
                x2={hipX + 32}
                y2={175}
                stroke="#F59E0B"
                strokeWidth="12"
                strokeLinecap="round"
              />
              <line
                x1={hipX + 32}
                y1={175}
                x2={hipX + 10}
                y2={210}
                stroke="#F59E0B"
                strokeWidth="10"
                strokeLinecap="round"
              />
              {/* Stance Skate Wheels on Track */}
              <line x1={hipX - 10} y1={214} x2={hipX + 30} y2={214} stroke="#FFFFFF" strokeWidth="3.5" />
              {[-6, 6, 18, 28].map((dx) => (
                <circle key={dx} cx={hipX + dx} cy={217} r="5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
              ))}

              {/* Hip & Glute */}
              <circle cx={hipX} cy={hipY} r="12" fill="#0284C7" />

              {/* Torso Spine */}
              <line
                x1={hipX}
                y1={hipY}
                x2={shoulderX}
                y2={shoulderY}
                stroke="#38BDF8"
                strokeWidth="15"
                strokeLinecap="round"
              />
              {/* Folded Arms on Back */}
              <line
                x1={shoulderX - 8}
                y1={shoulderY + 2}
                x2={hipX + 6}
                y2={hipY - 6}
                stroke="#E2E8F0"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {/* Aero Helmet */}
              <ellipse cx={headX} cy={headY} rx="17" ry="12" fill="#0284C7" stroke="#38BDF8" strokeWidth="2" />
              <polygon points={`${headX - 14},${headY - 2} ${headX - 26},${headY + 4} ${headX - 10},${headY + 8}`} fill="#0369A1" />

              {/* Force Vectors */}
              {showVectors && (
                <g>
                  <line
                    x1={hipX + 10}
                    y1={hipY}
                    x2={hipX + 10 + activeFrame.forceVectorN * 0.22}
                    y2={hipY}
                    stroke="#10B981"
                    strokeWidth="3.5"
                  />
                  <polygon
                    points={`${hipX + 18 + activeFrame.forceVectorN * 0.22},${hipY} ${
                      hipX + 6 + activeFrame.forceVectorN * 0.22
                    },${hipY - 5} ${hipX + 6 + activeFrame.forceVectorN * 0.22},${hipY + 5}`}
                    fill="#10B981"
                  />
                  <text
                    x={hipX + 25}
                    y={hipY - 10}
                    fill="#10B981"
                    className="font-mono text-[10px] font-bold"
                  >
                    THRUST: {activeFrame.forceVectorN} N
                  </text>
                </g>
              )}
            </svg>
          </div>

          {/* Description Callout */}
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 leading-relaxed">
            <strong className="text-sky-400 font-mono">BIOMECHANICAL ACTION: </strong>
            {activeFrame.description}
          </div>

          {/* Playback Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md flex items-center gap-1.5 transition-colors"
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
                {isPlaying ? 'Pause Motion' : 'Play Motion'}
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
                onClick={() => onNarrate(activeSeq.title, activeSeq.narrationScript)}
                className="px-3 py-1.5 bg-purple-700 hover:bg-purple-600 text-white rounded-md flex items-center gap-1.5 transition-colors"
              >
                <Volume2 className="w-3.5 h-3.5" />
                Narrate
              </button>
            </div>
            <div className="flex items-center gap-1">
              {activeSeq.frames.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentFrameIdx(idx);
                  }}
                  className={`w-7 h-7 text-xs font-mono rounded transition-colors ${
                    idx === currentFrameIdx
                      ? 'bg-purple-600 text-white font-bold'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  F{idx + 1}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Sequence Details & EVS Connection (4 cols) */}
        <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="border-b border-slate-200 pb-2">
              <div className="text-xs font-mono text-slate-500">SEQUENCE SUMMARY</div>
              <h3 className="font-display text-lg font-bold text-slate-900 mt-0.5">
                {activeSeq.title}
              </h3>
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <div className="text-slate-500 text-[10px] font-mono">EVS ANIMAL BLUEPRINT</div>
                <div className="font-semibold text-slate-900 mt-0.5">{activeSeq.animalInspiration}</div>
                <div className="text-slate-600 text-[11px] mt-0.5">{activeSeq.evsConcept}</div>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <div className="text-slate-500 text-[10px] font-mono">PRIMARY MUSCLE RECRUITMENT</div>
                <div className="font-semibold text-slate-900 mt-0.5">{activeSeq.primaryMuscleOrBone}</div>
                <div className="text-emerald-700 text-[11px] mt-0.5">
                  Repaired by body-building proteins (milk, eggs, pulses).
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200">
                <div className="text-slate-500 text-[10px] font-mono">TRACK TELEMETRY SPECS</div>
                <div className="font-mono text-sm font-bold text-slate-900 mt-0.5">
                  Sprint Speed: {activeSeq.speed} · Peak Force: {activeFrame.forceVectorN} N
                </div>
              </div>
            </div>
          </div>

          <div className="p-3 bg-purple-50/70 border border-purple-200 rounded-lg text-xs space-y-1">
            <div className="font-mono font-bold text-purple-900">COACHING APPLICATION</div>
            <p className="text-purple-950 text-[11px] leading-relaxed">
              Drill this frame-by-frame on the rink: hold the deep knee crouch at apex turn before applying full lateral push force onto the straightaway.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
