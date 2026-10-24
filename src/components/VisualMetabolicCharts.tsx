import React, { useState } from 'react';
import { Activity, Shield, Droplets, Zap, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface MetabolicChartsProps {
  onNarrate: (title: string, text: string) => void;
}

interface FoodProfile {
  name: string;
  category: string;
  evsClass: string;
  serving: string;
  glycemicCurve: number[]; // 0m, 30m, 60m, 90m, 120m, 150m, 180m
  color: string;
  staminaVerdict: string;
  atpWatts: number;
}

const FOOD_PROFILES: FoodProfile[] = [
  {
    name: 'Whole Rolled Oats',
    category: 'Energy-Giving (Complex Carbs)',
    evsClass: 'Whole wheat, oats, brown rice',
    serving: '1 Bowl with warm milk (65g)',
    glycemicCurve: [70, 85, 96, 94, 90, 86, 82],
    color: '#0284C7',
    staminaVerdict: 'Steady glycogen release over 3 full hours. No mid-race fatigue.',
    atpWatts: 420,
  },
  {
    name: 'Brown Rice & Whole Wheat Roti',
    category: 'Energy-Giving (Complex Carbs)',
    evsClass: 'Whole grains & slow starches',
    serving: '1.5 cups rice + 2 rotis with dal',
    glycemicCurve: [70, 82, 92, 95, 92, 88, 84],
    color: '#059669',
    staminaVerdict: 'Deep muscular endurance for long distance laps and elimination heats.',
    atpWatts: 405,
  },
  {
    name: 'Ripe Banana & Potato Wedge',
    category: 'Energy-Giving + Potassium',
    evsClass: 'Bananas & potatoes (Fast energy)',
    serving: '1 banana + boiled potato (30m pre-skate)',
    glycemicCurve: [70, 98, 95, 86, 80, 75, 72],
    color: '#D97706',
    staminaVerdict: 'Rapid sprint burst fuel + potassium prevents calf twitching in corners.',
    atpWatts: 445,
  },
  {
    name: 'Junk Sugar / Pastry / Soda',
    category: 'Refined Sugar & Trans Fats (Avoid)',
    evsClass: 'Empty calories & sluggish fats',
    serving: '1 sugary soda + pastry snack',
    glycemicCurve: [70, 118, 58, 42, 40, 44, 46],
    color: '#DC2626',
    staminaVerdict: 'WARNING: Rapid insulin surge followed by sudden crash on lap 3.',
    atpWatts: 210,
  },
];

export const VisualMetabolicCharts: React.FC<MetabolicChartsProps> = ({ onNarrate }) => {
  const [selectedFoodIdx, setSelectedFoodIdx] = useState<number>(0);
  const [timelineMinute, setTimelineMinute] = useState<number>(90); // 0 to 180 min
  const [proteinBonus, setProteinBonus] = useState<boolean>(true);
  const [ironBonus, setIronBonus] = useState<boolean>(true);

  const activeFood = FOOD_PROFILES[selectedFoodIdx];
  const timeLabels = ['0m', '30m', '60m', '90m (Track Start)', '120m (Sprint)', '150m', '180m'];

  // Interpolate current curve value at timelineMinute
  const timeIdx = Math.min(6, Math.floor(timelineMinute / 30));
  const nextIdx = Math.min(6, timeIdx + 1);
  const ratio = (timelineMinute % 30) / 30;
  const currentAtpPct = Math.round(
    activeFood.glycemicCurve[timeIdx] * (1 - ratio) + activeFood.glycemicCurve[nextIdx] * ratio
  );

  // SVG coordinate helpers
  const toX = (idx: number) => 55 + idx * 78;
  const toY = (val: number) => 195 - ((val - 35) / 90) * 165;

  const pointsString = activeFood.glycemicCurve.map((v, i) => `${toX(i)},${toY(v)}`).join(' ');
  const areaString = `${toX(0)},195 ${pointsString} ${toX(6)},195`;

  // Timeline scrubber X in SVG
  const scrubberX = 55 + (timelineMinute / 180) * (6 * 78);

  const isJunk = activeFood.name.includes('Junk');

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
      {/* Visual Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-xs font-mono text-sky-700 font-semibold">
            METABOLIC GLYCOGEN & MUSCLE RECOVERY VISUALIZATIONS
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
            Dynamic Blood Glucose, Muscle Repair & Bone Density Charts
          </h2>
        </div>

        {/* Food Profile Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          {FOOD_PROFILES.map((food, idx) => (
            <button
              key={food.name}
              type="button"
              onClick={() => {
                setSelectedFoodIdx(idx);
                onNarrate(
                  `${food.name} Metabolic Fueling`,
                  `${food.name}: ${food.evsClass}. Providing ${food.staminaVerdict}`
                );
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 ${
                idx === selectedFoodIdx
                  ? 'bg-white text-slate-900 shadow-xs border border-slate-200'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {food.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Visual SVG Coordinate Curve Chart (7 cols) + Recovery & Protective Radar (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Interactive SVG Glycemic & ATP Chart */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-5 space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <div className="text-xs font-mono text-slate-500">
                180-MINUTE TRACK ENERGY RELEASE CURVE
              </div>
              <div className="font-display text-base font-bold text-slate-900 mt-0.5">
                {activeFood.name} ({activeFood.serving})
              </div>
            </div>
            <div className="text-xs font-mono font-bold">
              {isJunk ? (
                <span className="text-red-600">▲ CRASH WARNING</span>
              ) : (
                <span className="text-emerald-700">● {activeFood.atpWatts}W SPRINT ATP</span>
              )}
            </div>
          </div>

          {/* Interactive SVG Chart */}
          <div className="w-full overflow-x-auto">
            <svg
              viewBox="0 0 580 235"
              className="w-full h-auto min-w-[480px] select-none"
              role="img"
              aria-label="Glycemic energy curve comparing complex carbs with junk food crash"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={activeFood.color} stopOpacity="0.28" />
                  <stop offset="100%" stopColor={activeFood.color} stopOpacity="0.02" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              {[50, 75, 100, 120].map((v) => {
                const y = toY(v);
                return (
                  <g key={v}>
                    <line x1="50" y1={y} x2="540" y2={y} stroke="#F1F5F9" strokeWidth="1" />
                    <text x="42" y={y + 4} textAnchor="end" className="fill-slate-400 font-mono text-[10px]">
                      {v}%
                    </text>
                  </g>
                );
              })}

              {/* Optimal Energy Zone Band */}
              <rect x="50" y={toY(100)} width="490" height={toY(80) - toY(100)} fill="#059669" fillOpacity="0.07" />
              <text x="535" y={toY(98)} textAnchor="end" className="fill-emerald-700 font-mono text-[9px] font-bold">
                OPTIMAL SPRINT ATP ZONE (80%–100%)
              </text>

              {/* Area & Main Line */}
              <polygon points={areaString} fill="url(#chartGradient)" />
              <polyline
                fill="none"
                stroke={activeFood.color}
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={pointsString}
              />

              {/* Data Nodes */}
              {activeFood.glycemicCurve.map((val, idx) => {
                const cx = toX(idx);
                const cy = toY(val);
                return (
                  <g key={idx}>
                    <circle cx={cx} cy={cy} r="5" fill="#FFFFFF" stroke={activeFood.color} strokeWidth="2.5" />
                    <text x={cx} y={cy - 9} textAnchor="middle" className="fill-slate-800 font-mono text-[10px] font-bold">
                      {val}%
                    </text>
                    <text x={cx} y="215" textAnchor="middle" className="fill-slate-500 font-mono text-[9px]">
                      {timeLabels[idx]}
                    </text>
                  </g>
                );
              })}

              {/* Scrubber Vertical Line at timelineMinute */}
              <line x1={scrubberX} y1="20" x2={scrubberX} y2="195" stroke="#0F172A" strokeWidth="2" strokeDasharray="3 3" />
              <circle cx={scrubberX} cy={toY(currentAtpPct)} r="7" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2" />
            </svg>
          </div>

          {/* Timeline Scrubber Control */}
          <div className="space-y-2 bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-800">
                Track Timeline Scrubber: <strong className="font-mono text-sky-700">{timelineMinute} min</strong>
              </span>
              <span className="font-mono font-bold text-slate-900">
                Current ATP Availability: <strong className={isJunk && timelineMinute > 60 ? 'text-red-600' : 'text-emerald-700'}>{currentAtpPct}%</strong>
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={180}
              step={5}
              value={timelineMinute}
              onChange={(e) => setTimelineMinute(Number(e.target.value))}
              className="w-full accent-[#0284C7] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-slate-500">
              <span>0m: Meal Eaten</span>
              <span>90m: Stepping on Track</span>
              <span>120m: Bell Lap Sprint</span>
              <span>180m: Cooldown</span>
            </div>
          </div>

          <div className="text-xs text-slate-600 leading-relaxed pt-1">
            <strong>Verdict:</strong> {activeFood.staminaVerdict}
          </div>
        </div>

        {/* Right Column: Leg Muscle Repair & Protective Calcium/Iron Visual Meters (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Leg Muscle Fiber Repair Barometer (Body-Building Foods) */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <div className="text-xs font-mono text-emerald-700 font-semibold">
                  BODY-BUILDING FOODS (PROTEINS)
                </div>
                <h3 className="font-display text-base font-bold text-slate-900">
                  Leg Muscle Fiber Repair (Quads, Calves, Glutes)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setProteinBonus(!proteinBonus)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                  proteinBonus ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Milk/Eggs/Pulses: {proteinBonus ? 'ON' : 'OFF'}
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              High-speed skating stresses leg muscles. Dietary proteins (milk, eggs, pulses, grams, peas) supply essential amino acids to rebuild torn myofibrils.
            </p>

            {/* Muscle Group Visual Bars */}
            <div className="space-y-2.5 pt-1">
              {[
                { name: 'Quadriceps (Vastus Lateralis)', score: proteinBonus ? 95 : 32, note: 'Primary Knee Drive' },
                { name: 'Gluteus Maximus', score: proteinBonus ? 92 : 30, note: 'Hip Extension Power' },
                { name: 'Calves (Gastrocnemius & Soleus)', score: proteinBonus ? 88 : 28, note: 'Wheel Toe Snap' },
              ].map((m) => (
                <div key={m.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">{m.name}</span>
                    <span className="font-mono font-bold text-emerald-700">{m.score}% Rebuilt</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-600 rounded-full transition-transform duration-200 origin-left"
                      style={{ transform: `scaleX(${m.score / 100})` }}
                    />
                  </div>
                  <div className="text-[10px] text-slate-500">{m.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Protective Foods: Calcium & Iron Radar Box */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <div className="text-xs font-mono text-amber-700 font-semibold">
                  PROTECTIVE FOODS (VITAMINS & MINERALS)
                </div>
                <h3 className="font-display text-base font-bold text-slate-900">
                  Calcium (Bones) & Iron (Oxygen Hb)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIronBonus(!ironBonus)}
                className={`px-2.5 py-1 text-xs font-mono rounded transition-colors ${
                  ironBonus ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Curd/Spinach: {ironBonus ? 'ON' : 'OFF'}
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-lg space-y-1">
                <div className="text-[11px] font-mono text-amber-900 font-bold">
                  CALCIUM SHIELD (CURD & MILK)
                </div>
                <div className="text-xs font-semibold text-slate-800">
                  Tibial Bone Density: <span className="text-amber-800 font-mono font-bold">{ironBonus ? '98%' : '45%'}</span>
                </div>
                <p className="text-[10px] text-slate-600 leading-tight">
                  Protects shin and ankle frame from vibration and 1.68 G cornering pressure.
                </p>
              </div>

              <div className="p-3 bg-sky-50/60 border border-sky-200 rounded-lg space-y-1">
                <div className="text-[11px] font-mono text-sky-900 font-bold">
                  IRON O2 FLOW (SPINACH)
                </div>
                <div className="text-xs font-semibold text-slate-800">
                  Hemoglobin Capacity: <span className="text-sky-800 font-mono font-bold">{ironBonus ? '96%' : '38%'}</span>
                </div>
                <p className="text-[10px] text-slate-600 leading-tight">
                  Carries maximum oxygen in blood to burning leg muscles during final laps.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
