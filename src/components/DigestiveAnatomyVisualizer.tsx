import React, { useState, useEffect } from 'react';
import { Activity, Droplets, Utensils, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

interface DigestiveAnatomyProps {
  onNarrate: (title: string, text: string) => void;
}

export const DigestiveAnatomyVisualizer: React.FC<DigestiveAnatomyProps> = ({ onNarrate }) => {
  const [selectedOrgan, setSelectedOrgan] = useState<'mouth' | 'esophagus' | 'stomach' | 'small_intestine' | 'bloodstream' | 'leg_muscles'>('mouth');
  const [dietMode, setDietMode] = useState<'clean' | 'junk'>('clean');
  const [chewingCount, setChewingCount] = useState<number>(30); // 5 to 35
  const [waterGlasses, setWaterGlasses] = useState<number>(9); // 1 to 10
  const [particleTick, setParticleTick] = useState<number>(0);

  // Animation cycle for particle flow
  useEffect(() => {
    const interval = setInterval(() => {
      setParticleTick((prev) => (prev + 1) % 100);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Update narration when organ is clicked
  const handleOrganClick = (organ: 'mouth' | 'esophagus' | 'stomach' | 'small_intestine' | 'bloodstream' | 'leg_muscles') => {
    setSelectedOrgan(organ);
    if (organ === 'mouth') {
      onNarrate(
        'The Mouth & Salivary Glands (Mastication)',
        'Class 4 EVS Principle: Digestion begins in the mouth. Chewing food thoroughly mixes whole oats, brown rice, and vegetables with salivary amylase, breaking down starches into glucose early. Unchewed food creates stomach heaviness on the rink.'
      );
    } else if (organ === 'esophagus') {
      onNarrate(
        'The Food Pipe (Esophagus) & Meal Timing',
        'Chewed food passes smoothly down the food pipe into the stomach via wave-like peristalsis. Eating at fixed, regular times trains the digestive system to be light and energized 2.5 hours before training.'
      );
    } else if (organ === 'stomach') {
      onNarrate(
        'The Stomach: Protein Breakdown & Gastric Juice',
        'Inside the muscular stomach, gastric juices and pepsin break down body-building proteins—milk, eggs, and pulses—into amino acids. Fried junk food traps grease in the stomach for over 4 hours, causing sluggish skating and cramps.'
      );
    } else if (organ === 'small_intestine') {
      onNarrate(
        'The Small Intestine Villi: Complete Absorption',
        'Digestion finishes in the small intestine. Microscopic finger-like villi absorb glucose energy, muscle-repairing amino acids, calcium for bones, and iron for blood oxygen directly into capillaries.'
      );
    } else if (organ === 'bloodstream') {
      onNarrate(
        'Bloodstream Delivery & Daily Hydration',
        'Drinking 8 to 10 glasses of water daily keeps blood volume optimal. Iron-rich spinach creates hemoglobin that binds oxygen, transporting fuel and hydration rapidly to active leg muscles.'
      );
    } else {
      onNarrate(
        'Leg Muscle Activation: Quadriceps, Calves, and Glutes',
        'The quadriceps, glutes, and calves absorb the digested nutrients. Carbohydrate glycogen supplies sprint ATP, proteins repair micro-tears, and calcium keeps shin and ankle bones strong through 1.68 G corners.'
      );
    }
  };

  // Real-time absorption calculations based on chewing and water
  const chewScore = Math.min(100, Math.round((chewingCount / 30) * 100));
  const hydrationScore = Math.min(100, Math.round((waterGlasses / 9) * 100));
  const absorptionEfficiency =
    dietMode === 'clean'
      ? Math.min(98, Math.max(35, Math.round(55 + chewScore * 0.28 + hydrationScore * 0.15)))
      : Math.min(42, Math.max(15, Math.round(20 + chewScore * 0.12 + hydrationScore * 0.1)));

  const stomachClearanceMinutes =
    dietMode === 'clean'
      ? Math.max(75, Math.round(180 - chewingCount * 2.8))
      : Math.max(220, Math.round(300 - chewingCount * 1.5));

  const crampProtectionLabel =
    waterGlasses >= 8 && dietMode === 'clean'
      ? '● OPTIMAL HYDRATION (CRAMP PROTECTED)'
      : waterGlasses >= 6
      ? '▲ BORDERLINE DEHYDRATION (MONITOR CALVES)'
      : '▲ HIGH MUSCLE CRAMP & HEAT FATIGUE ALERT';

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
      {/* Header with Diet Mode Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-xs font-mono text-emerald-700 font-semibold">
            CLASS 4 EVS · FOOD & DIGESTION ANATOMICAL SIMULATOR
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
            Digestive Organs, Nutrient Absorption & Leg Fuel Delivery
          </h2>
        </div>

        {/* Clean vs Junk Food Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          <button
            type="button"
            onClick={() => {
              setDietMode('clean');
              onNarrate(
                'Clean Skater Diet Mode',
                'Clean sports nutrition: Quality carbohydrates (oats, brown rice, bananas), body-building proteins (milk, eggs, pulses), and protective calcium and iron absorb efficiently through intestinal villi to fuel explosive speed.'
              );
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              dietMode === 'clean'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Clean Skater Plate (Oats, Eggs, Milk, Spinach)
          </button>
          <button
            type="button"
            onClick={() => {
              setDietMode('junk');
              onNarrate(
                'Junk Food Alert Mode',
                'Junk food warning: Fried oily snacks and sugary colas trap food in the stomach for over 4 hours, cause rapid blood sugar crashes, and trigger painful leg cramps during lap 3.'
              );
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              dietMode === 'junk'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Junk Food / Sugary Soda (Avoid)
          </button>
        </div>
      </div>

      {/* Main Two-Zone Stage: Anatomical SVG Cutaway (Left 8 cols) + Controls & Microscope Villi (Right 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Anatomical Visual Stage */}
        <div className="lg:col-span-8 bg-slate-950 rounded-xl p-4 sm:p-6 text-white flex flex-col justify-between relative overflow-hidden min-h-[460px]">
          {/* Top HUD */}
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-300 border-b border-slate-800 pb-3 z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              <span className="text-sky-400 font-bold">ACTIVE ORGAN: {selectedOrgan.toUpperCase()}</span>
            </div>
            <div className="text-emerald-400 font-semibold">
              VILLI ABSORPTION: {absorptionEfficiency}% · CLEARANCE: {stomachClearanceMinutes} MIN
            </div>
          </div>

          {/* SVG Anatomical Diagram: Torso, Digestive Tract & Lower Leg Muscles */}
          <div className="relative w-full my-auto py-2">
            <svg
              viewBox="0 0 600 440"
              className="w-full h-auto select-none"
              role="img"
              aria-label="Interactive anatomical cutaway showing digestive organs and leg muscle nutrient delivery"
            >
              <defs>
                {/* Glow filter for nutrient particles */}
                <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glowBlue" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>

              {/* Body Contour Silhouette */}
              <path
                d="M 210 30 C 240 10 360 10 390 30 C 420 55 435 110 440 170 C 445 220 430 250 410 270 L 400 370 L 375 430 L 335 430 L 330 310 L 270 310 L 265 430 L 225 430 L 200 370 L 190 270 C 170 250 155 220 160 170 C 165 110 180 55 210 30 Z"
                fill="#0F172A"
                stroke="#334155"
                strokeWidth="2.5"
              />

              {/* 1. MOUTH & SALIVARY GLANDS */}
              <g
                onClick={() => handleOrganClick('mouth')}
                className="cursor-pointer"
              >
                <circle
                  cx="300"
                  cy="45"
                  r="24"
                  fill={selectedOrgan === 'mouth' ? '#0369A1' : '#1E293B'}
                  stroke={selectedOrgan === 'mouth' ? '#38BDF8' : '#64748B'}
                  strokeWidth={selectedOrgan === 'mouth' ? '3' : '1.5'}
                />
                {/* Teeth & Tongue Icon */}
                <rect x="290" y="38" width="20" height="6" rx="2" fill="#FFFFFF" />
                <path d="M 292 48 Q 300 56 308 48" fill="#F43F5E" />
                {/* Salivary Spray particles */}
                <circle cx="282" cy="45" r="3" fill="#38BDF8" opacity="0.8" />
                <circle cx="318" cy="45" r="3" fill="#38BDF8" opacity="0.8" />
                <text x="345" y="48" fill="#38BDF8" className="font-mono text-[10px] font-bold">
                  01. MOUTH (MASTICATION)
                </text>
              </g>

              {/* 2. ESOPHAGUS (FOOD PIPE) */}
              <g
                onClick={() => handleOrganClick('esophagus')}
                className="cursor-pointer"
              >
                <path
                  d="M 294 69 L 294 135 L 306 135 L 306 69 Z"
                  fill={selectedOrgan === 'esophagus' ? '#0284C7' : '#1E293B'}
                  stroke={selectedOrgan === 'esophagus' ? '#38BDF8' : '#64748B'}
                  strokeWidth={selectedOrgan === 'esophagus' ? '2.5' : '1.5'}
                />
                <text x="325" y="105" fill="#94A3B8" className="font-mono text-[9px] font-semibold">
                  02. FOOD PIPE (PERISTALSIS)
                </text>
              </g>

              {/* 3. STOMACH */}
              <g
                onClick={() => handleOrganClick('stomach')}
                className="cursor-pointer"
              >
                <path
                  d="M 295 135 C 260 135 240 170 270 205 C 310 230 350 200 340 160 C 335 140 310 135 295 135 Z"
                  fill={
                    dietMode === 'junk'
                      ? '#7F1D1D'
                      : selectedOrgan === 'stomach'
                      ? '#065F46'
                      : '#1E293B'
                  }
                  stroke={
                    dietMode === 'junk'
                      ? '#EF4444'
                      : selectedOrgan === 'stomach'
                      ? '#34D399'
                      : '#64748B'
                  }
                  strokeWidth={selectedOrgan === 'stomach' ? '3' : '1.5'}
                />
                {/* Gastric Churn Fluid */}
                <ellipse cx="295" cy="180" rx="26" ry="14" fill={dietMode === 'junk' ? '#991B1B' : '#047857'} />
                <text x="295" y="184" textAnchor="middle" fill="#FFFFFF" className="font-mono text-[9px] font-bold">
                  {dietMode === 'junk' ? 'SLUGGISH ACID' : 'PEPSIN + HCl'}
                </text>
                <text x="145" y="165" fill="#34D399" className="font-mono text-[10px] font-bold">
                  03. STOMACH (PROTEIN REPAIR)
                </text>
              </g>

              {/* 4. SMALL INTESTINE WITH ABSORPTION COILS */}
              <g
                onClick={() => handleOrganClick('small_intestine')}
                className="cursor-pointer"
              >
                <rect
                  x="260"
                  y="208"
                  width="80"
                  height="58"
                  rx="14"
                  fill={selectedOrgan === 'small_intestine' ? '#78350F' : '#1E293B'}
                  stroke={selectedOrgan === 'small_intestine' ? '#FBBF24' : '#64748B'}
                  strokeWidth={selectedOrgan === 'small_intestine' ? '3' : '1.5'}
                />
                {/* Intestinal coils */}
                <path
                  d="M 270 220 Q 300 212 330 220 Q 270 234 330 234 Q 270 248 330 248"
                  fill="none"
                  stroke={dietMode === 'junk' ? '#EF4444' : '#F59E0B'}
                  strokeWidth="2.5"
                />
                <text x="355" y="235" fill="#FBBF24" className="font-mono text-[10px] font-bold">
                  04. SMALL INTESTINE (VILLI UPTAKE)
                </text>
              </g>

              {/* 5. ARTERIAL BLOODSTREAM TO LEGS */}
              <g
                onClick={() => handleOrganClick('bloodstream')}
                className="cursor-pointer"
              >
                {/* Main Aorta descending */}
                <path
                  d="M 300 266 L 300 295 M 300 295 L 255 330 M 300 295 L 345 330"
                  fill="none"
                  stroke={dietMode === 'clean' ? '#38BDF8' : '#DC2626'}
                  strokeWidth="3.5"
                  strokeDasharray="4 2"
                />
                <text x="140" y="295" fill="#38BDF8" className="font-mono text-[10px] font-bold">
                  05. BLOODSTREAM (HEMOGLOBIN + WATER)
                </text>
              </g>

              {/* 6. LEG MUSCLES: QUADRICEPS, GLUTES, CALVES & TIBIAL BONE */}
              <g
                onClick={() => handleOrganClick('leg_muscles')}
                className="cursor-pointer"
              >
                {/* Left Leg Quads */}
                <rect
                  x="235"
                  y="320"
                  width="38"
                  height="60"
                  rx="10"
                  fill={selectedOrgan === 'leg_muscles' ? '#0369A1' : '#1E293B'}
                  stroke={selectedOrgan === 'leg_muscles' ? '#38BDF8' : '#475569'}
                  strokeWidth="2"
                />
                {/* Right Leg Quads */}
                <rect
                  x="328"
                  y="320"
                  width="38"
                  height="60"
                  rx="10"
                  fill={selectedOrgan === 'leg_muscles' ? '#0369A1' : '#1E293B'}
                  stroke={selectedOrgan === 'leg_muscles' ? '#38BDF8' : '#475569'}
                  strokeWidth="2"
                />
                <text x="254" y="352" textAnchor="middle" fill="#FFFFFF" className="font-mono text-[8px] font-bold">
                  QUADS
                </text>
                <text x="347" y="352" textAnchor="middle" fill="#FFFFFF" className="font-mono text-[8px] font-bold">
                  QUADS
                </text>

                {/* Calves & Shin Bones */}
                <rect
                  x="240"
                  y="384"
                  width="30"
                  height="42"
                  rx="8"
                  fill={selectedOrgan === 'leg_muscles' ? '#047857' : '#1E293B'}
                  stroke={selectedOrgan === 'leg_muscles' ? '#34D399' : '#475569'}
                  strokeWidth="2"
                />
                <rect
                  x="332"
                  y="384"
                  width="30"
                  height="42"
                  rx="8"
                  fill={selectedOrgan === 'leg_muscles' ? '#047857' : '#1E293B'}
                  stroke={selectedOrgan === 'leg_muscles' ? '#34D399' : '#475569'}
                  strokeWidth="2"
                />
                <text x="255" y="408" textAnchor="middle" fill="#FFFFFF" className="font-mono text-[8px] font-bold">
                  CALF
                </text>
                <text x="347" y="408" textAnchor="middle" fill="#FFFFFF" className="font-mono text-[8px] font-bold">
                  CALF
                </text>
                <text x="380" y="360" fill="#38BDF8" className="font-mono text-[10px] font-bold">
                  06. ACTIVE MUSCLES & BONES
                </text>
              </g>

              {/* Dynamic Animated Flowing Nutrients */}
              <g>
                {Array.from({ length: 8 }).map((_, i) => {
                  const t = (particleTick * 1.2 + i * 15) % 100;
                  // Path progression: 0..20 Mouth/Esophagus, 20..50 Stomach, 50..80 Intestine, 80..100 Legs
                  let px = 300;
                  let py = 45;
                  if (t < 25) {
                    py = 45 + (t / 25) * 90;
                  } else if (t < 55) {
                    const stT = (t - 25) / 30;
                    px = 295 - Math.sin(stT * Math.PI) * 25;
                    py = 135 + stT * 70;
                  } else if (t < 80) {
                    const intT = (t - 55) / 25;
                    px = 270 + Math.sin(intT * Math.PI * 2) * 20;
                    py = 208 + intT * 55;
                  } else {
                    const legT = (t - 80) / 20;
                    px = i % 2 === 0 ? 255 - legT * 10 : 345 + legT * 10;
                    py = 295 + legT * 110;
                  }

                  const particleColor =
                    dietMode === 'junk'
                      ? '#EF4444'
                      : i % 3 === 0
                      ? '#38BDF8' // Glucose Carbs
                      : i % 3 === 1
                      ? '#34D399' // Amino Acids Protein
                      : '#FBBF24'; // Calcium & Iron

                  return (
                    <circle
                      key={i}
                      cx={px}
                      cy={py}
                      r={dietMode === 'junk' ? 4 : 4.5}
                      fill={particleColor}
                      filter={dietMode === 'clean' ? 'url(#glowBlue)' : undefined}
                      opacity={0.9}
                    />
                  );
                })}
              </g>
            </svg>
          </div>

          {/* Bottom Callout & Quick Selector */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs font-mono z-10">
            <div className="flex items-center gap-1.5">
              {(['mouth', 'esophagus', 'stomach', 'small_intestine', 'bloodstream', 'leg_muscles'] as const).map(
                (org) => (
                  <button
                    key={org}
                    type="button"
                    onClick={() => handleOrganClick(org)}
                    className={`px-2.5 py-1 rounded transition-colors ${
                      selectedOrgan === org
                        ? 'bg-sky-600 text-white font-bold'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {org.replace('_', ' ').toUpperCase()}
                  </button>
                )
              )}
            </div>
            <div className="text-slate-400">
              Click any organ node to trigger anatomical audio breakdown
            </div>
          </div>
        </div>

        {/* Right Interactive Controls, Microscope Callout & Telemetry (4 cols) */}
        <div className="lg:col-span-4 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="border-b border-slate-200 pb-3">
              <div className="text-xs font-mono text-slate-500">DIGESTIVE HABIT TUNER</div>
              <h3 className="font-display text-lg font-bold text-slate-900 mt-0.5">
                Mastication & Hydration Lab
              </h3>
            </div>

            {/* Slider 1: Chewing Mastication */}
            <div className="space-y-1.5 bg-white p-3 rounded-lg border border-slate-200">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800">Chews per Bite (Salivary Amylase)</span>
                <span className="font-mono text-emerald-700">{chewingCount} Chews</span>
              </div>
              <input
                type="range"
                min={5}
                max={35}
                value={chewingCount}
                onChange={(e) => setChewingCount(Number(e.target.value))}
                className="w-full accent-[#059669] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>5 (Gulped down)</span>
                <span>28–32 (Optimal)</span>
                <span>35 Chews</span>
              </div>
              <div className="text-[11px] text-slate-600 pt-1">
                {chewingCount >= 25
                  ? '● Salivary amylase thoroughly liquefies carbohydrates before swallowing.'
                  : '▲ Large unchewed particles cause stomach heaviness during track warmups.'}
              </div>
            </div>

            {/* Slider 2: Water Glasses Daily Hydration */}
            <div className="space-y-1.5 bg-white p-3 rounded-lg border border-slate-200">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800">Daily Water (Target: 8–10 Glasses)</span>
                <span className="font-mono text-sky-700">{waterGlasses} Glasses ({(waterGlasses * 0.25).toFixed(1)}L)</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={waterGlasses}
                onChange={(e) => setWaterGlasses(Number(e.target.value))}
                className="w-full accent-[#0284C7] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500">
                <span>1 Glass (Severe)</span>
                <span>8–10 (Optimal)</span>
                <span>10 Glasses</span>
              </div>
              <div className="text-[11px] font-mono font-semibold pt-1 text-slate-800">
                {crampProtectionLabel}
              </div>
            </div>

            {/* Microscopic Villi Cross-Section Callout */}
            <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2">
              <div className="text-xs font-mono text-slate-500">MICROSCOPIC INTESTINAL VILLI ZOOM</div>
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 100 60" className="w-20 h-12 bg-amber-50 rounded border border-amber-200 shrink-0">
                  {/* Microscopic villi fingers */}
                  {[15, 35, 55, 75].map((vx) => (
                    <path
                      key={vx}
                      d={`M ${vx} 55 L ${vx} 15 Q ${vx + 5} 8 ${vx + 10} 15 L ${vx + 10} 55`}
                      fill={dietMode === 'junk' ? '#FCA5A5' : '#FDE68A'}
                      stroke={dietMode === 'junk' ? '#EF4444' : '#D97706'}
                      strokeWidth="2"
                    />
                  ))}
                  {/* Capillary vessel inside */}
                  <line x1="10" y1="52" x2="90" y2="52" stroke="#DC2626" strokeWidth="3" />
                </svg>
                <div className="text-xs text-slate-700 leading-tight">
                  {dietMode === 'clean' ? (
                    <span>
                      <strong className="text-emerald-700 font-semibold">95% Nutrient Uptake:</strong> Glucose, amino acids, calcium, and iron enter capillaries cleanly.
                    </span>
                  ) : (
                    <span>
                      <strong className="text-red-700 font-semibold">Sluggish Coating:</strong> Fried fats coat intestinal walls, blocking rapid iron and amino acid uptake.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Telemetry Output Numbers */}
          <div className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-2">
            <div className="text-xs font-mono text-slate-500">PHYSIOLOGICAL TRACK READINESS</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 bg-slate-50 rounded border border-slate-100">
                <div className="text-slate-500 text-[10px]">Small Intestine Uptake</div>
                <div className="font-mono text-base font-bold text-emerald-700">{absorptionEfficiency}%</div>
              </div>
              <div className="p-2 bg-slate-50 rounded border border-slate-100">
                <div className="text-slate-500 text-[10px]">Stomach Empty Time</div>
                <div className="font-mono text-base font-bold text-sky-700">{stomachClearanceMinutes} min</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-600 pt-1 leading-relaxed">
              <strong>Fixed Meal Time Rule:</strong> Eating 2.5 hours before training ensures the stomach is empty while muscle glycogen is at 100% capacity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
