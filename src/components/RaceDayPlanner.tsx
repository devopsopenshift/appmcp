import React, { useState } from 'react';
import { Droplets, Clock, Utensils, CheckCircle2, AlertTriangle, Volume2 } from 'lucide-react';

interface RaceDayProps {
  onNarrate: (title: string, text: string) => void;
}

interface ScheduleSlot {
  time: string;
  name: string;
  relation: string;
  menu: string;
  nutrients: string;
  waterGlasses: number;
  chewingRule: string;
  narrationScript: string;
}

const SCHEDULE_SLOTS: ScheduleSlot[] = [
  {
    time: '07:00 AM',
    name: 'Fixed Morning Foundation Meal',
    relation: 'Morning Metabolic Ignition Before School',
    menu: '1 Bowl Whole Rolled Oats in Warm Milk + 2 Boiled Eggs + 1 Ripe Banana',
    nutrients: 'Energy-Giving (Oats, Banana) · Body-Building (Eggs, Milk) · Protective Calcium (Milk)',
    waterGlasses: 2,
    chewingRule: '28–30 Chews per bite · Eat calmly, never rush',
    narrationScript:
      '7:00 AM Fixed Breakfast. Start the morning with whole oats cooked in milk, two boiled eggs, a banana, and two glasses of water. This combines slow-release carbohydrates, muscle-building protein, and bone-strengthening calcium.',
  },
  {
    time: '01:00 PM',
    name: 'Pre-Training Fixed Midday Meal',
    relation: '2.5 to 3 Hours Before Afternoon Skating Practice',
    menu: 'Brown Rice or 2 Whole Wheat Rotis + Thick Dal/Grams + Fresh Spinach (Palak) + 1 Bowl Curd',
    nutrients: 'Energy (Rice/Wheat) · Body-Building (Dal/Grams) · Protective Iron & Calcium (Spinach, Curd)',
    waterGlasses: 3,
    chewingRule: '32 Chews per bite · Thorough salivary mixing for small intestine absorption',
    narrationScript:
      '1:00 PM Fixed Lunch. Whole wheat rotis or brown rice with dal, fresh spinach, and curd. Chewing thoroughly allows the small intestine to absorb iron for blood oxygen and glucose for afternoon track speed.',
  },
  {
    time: '03:45 PM',
    name: 'Trackside Pre-Sprint Booster',
    relation: '45 Minutes Before Warmup Laps',
    menu: '1 Ripe Banana or Small Boiled Potato Wedge + 1.5 Glasses Water',
    nutrients: 'Fast-Access Glucose + Potassium Electrolyte Cramp Shield',
    waterGlasses: 2,
    chewingRule: 'Chew into smooth paste · Zero stomach heaviness at race start',
    narrationScript:
      '3:45 PM Pre-Skate Booster. Forty-five minutes before stepping onto the rink, have a ripe banana and water. It digests quickly and tops up muscle glycogen and potassium to prevent calf cramps in the corners.',
  },
  {
    time: '06:30 PM',
    name: 'Post-Skate Anabolic Recovery Window',
    relation: 'Within 30 to 45 Minutes Post-Cooldown',
    menu: '250ml Warm Milk + Sprouted Moong/Grams & Green Peas + Whole Wheat Toast + 2.5 Glasses Water',
    nutrients: 'Body-Building Proteins (Milk, Grams, Peas) + Glycogen Refill + Full Rehydration',
    waterGlasses: 3,
    chewingRule: '30 Chews per bite · Maximum amino acid uptake for overnight muscle repair',
    narrationScript:
      '6:30 PM Recovery Window. Within 45 minutes of finishing training, give your son warm milk, sprouted grams, and green peas with whole wheat toast. This repairs worn-out quadriceps and calves overnight.',
  },
];

export const RaceDayPlanner: React.FC<RaceDayProps> = ({ onNarrate }) => {
  const [selectedSlotIdx, setSelectedSlotIdx] = useState<number>(0);
  const [loggedGlasses, setLoggedGlasses] = useState<number>(9);

  const activeSlot = SCHEDULE_SLOTS[selectedSlotIdx];

  const handleSelectSlot = (idx: number) => {
    setSelectedSlotIdx(idx);
    onNarrate(SCHEDULE_SLOTS[idx].name, SCHEDULE_SLOTS[idx].narrationScript);
  };

  const handleGlassClick = (glassNum: number) => {
    setLoggedGlasses(glassNum);
    onNarrate(
      `Daily Hydration: ${glassNum} Glasses`,
      glassNum >= 8
        ? `${glassNum} glasses of water logged. Optimal hydration! Blood plasma flows freely to quadriceps and calves, preventing fatigue and muscle cramps.`
        : `${glassNum} glasses of water logged. Keep drinking water regularly to hit the 8 to 10 glass daily target before training.`
    );
  };

  const hydrationPct = Math.min(100, Math.round((loggedGlasses / 10) * 100));

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-6">
      {/* Visual Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="text-xs font-mono text-emerald-700 font-semibold">
            CLASS 4 EVS · MEAL DISCIPLINE & HYDRATION PROTOCOL
          </div>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
            Fixed Daily Meal Schedule & 8–10 Glasses Water Tracker
          </h2>
        </div>
        <div className="text-xs font-mono font-bold text-slate-700">
          DAILY WATER LOG: <span className="text-sky-700">{loggedGlasses}/10 GLASSES</span> ({(loggedGlasses * 0.25).toFixed(2)}L)
        </div>
      </div>

      {/* Main Grid: 4 Fixed Schedule Cards (Left 7 cols) + Interactive Water Cylinder & Plate Breakdown (Right 5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: Fixed Schedule Timeline Cards */}
        <div className="lg:col-span-7 space-y-3">
          <div className="text-xs font-mono text-slate-500">
            FIXED TRAINING DAY MEAL TIMINGS (CLICK TO INSPECT & HEAR NARRATION):
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {SCHEDULE_SLOTS.map((slot, idx) => {
              const isSelected = idx === selectedSlotIdx;
              return (
                <button
                  key={slot.time}
                  type="button"
                  onClick={() => handleSelectSlot(idx)}
                  className={`text-left p-4 rounded-xl border transition-colors flex flex-col justify-between ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-900 border-slate-200 hover:border-sky-600'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className={isSelected ? 'text-sky-300 font-bold' : 'text-sky-700 font-bold'}>
                        {slot.time}
                      </span>
                      <span className={isSelected ? 'text-emerald-300' : 'text-emerald-700'}>
                        +{slot.waterGlasses} Glasses
                      </span>
                    </div>
                    <div className="font-display text-base font-bold">{slot.name}</div>
                    <div className={`text-[11px] font-mono ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                      {slot.relation}
                    </div>
                    <p className={`text-xs leading-relaxed pt-1 ${isSelected ? 'text-slate-200' : 'text-slate-700'}`}>
                      {slot.menu}
                    </p>
                  </div>
                  <div
                    className={`text-[10px] font-mono mt-3 pt-2 border-t ${
                      isSelected ? 'border-slate-800 text-amber-300' : 'border-slate-100 text-slate-500'
                    }`}
                  >
                    {slot.chewingRule}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Meal Analysis Box */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg space-y-1.5 text-xs">
            <div className="font-mono font-bold text-slate-900">
              ACTIVE SELECTION: {activeSlot.time} — {activeSlot.name}
            </div>
            <div className="text-slate-700">
              <strong>Nutrient Breakdown:</strong> {activeSlot.nutrients}
            </div>
            <div className="text-slate-600">
              <strong>Mastication Discipline:</strong> {activeSlot.chewingRule}
            </div>
          </div>
        </div>

        {/* Right Column: Interactive 10-Glass Water Cylinder & Plate Ratio */}
        <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="border-b border-slate-200 pb-2">
              <div className="text-xs font-mono text-slate-500">INTERACTIVE FLUID BEAKER</div>
              <h3 className="font-display text-lg font-bold text-slate-900 mt-0.5">
                8–10 Glasses Daily Water Cylinder
              </h3>
            </div>

            {/* Visual Animated Hydration Cylinder + Glasses */}
            <div className="grid grid-cols-12 gap-4 items-center bg-white p-4 rounded-xl border border-slate-200">
              {/* SVG Fluid Beaker (4 cols) */}
              <div className="col-span-4 flex justify-center">
                <svg viewBox="0 0 80 160" className="w-16 h-32 select-none">
                  {/* Glass Beaker Outline */}
                  <rect x="15" y="15" width="50" height="135" rx="10" fill="#F8FAFC" stroke="#64748B" strokeWidth="2.5" />
                  {/* Graduations */}
                  {[40, 65, 90, 115].map((gy) => (
                    <line key={gy} x1="50" y1={gy} x2="65" y2={gy} stroke="#94A3B8" strokeWidth="1.5" />
                  ))}
                  {/* Water Fluid Level based on loggedGlasses (150 down to 25) */}
                  {(() => {
                    const waterHeight = (loggedGlasses / 10) * 125;
                    const waterY = 145 - waterHeight;
                    return (
                      <g>
                        <rect
                          x="18"
                          y={waterY}
                          width="44"
                          height={waterHeight}
                          rx="6"
                          fill="#38BDF8"
                          opacity="0.85"
                        />
                        {/* Wave crest */}
                        <ellipse cx="40" cy={waterY} rx="22" ry="4" fill="#0284C7" />
                      </g>
                    );
                  })()}
                  <text x="40" y="156" textAnchor="middle" fill="#0F172A" className="font-mono text-[9px] font-bold">
                    {(loggedGlasses * 0.25).toFixed(1)}L
                  </text>
                </svg>
              </div>

              {/* 10 Interactive Water Glass Buttons (8 cols) */}
              <div className="col-span-8 space-y-2">
                <div className="text-[11px] font-mono text-slate-500">
                  CLICK GLASSES TO LOG DRINKS:
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => {
                    const isFilled = num <= loggedGlasses;
                    return (
                      <button
                        key={num}
                        type="button"
                        onClick={() => handleGlassClick(num)}
                        className={`p-1.5 rounded text-center transition-colors flex flex-col items-center justify-center gap-0.5 border ${
                          isFilled
                            ? 'bg-sky-600 text-white border-sky-600'
                            : 'bg-slate-50 text-slate-400 border-slate-200 hover:border-sky-400'
                        }`}
                      >
                        <Droplets className="w-3.5 h-3.5" />
                        <span className="font-mono text-[10px] font-bold">#{num}</span>
                      </button>
                    );
                  })}
                </div>
                <div className="text-xs font-mono font-bold pt-1">
                  {loggedGlasses >= 8 ? (
                    <span className="text-emerald-700">● 100% CRAMP-PROTECTED</span>
                  ) : (
                    <span className="text-amber-700">▲ NEED {8 - loggedGlasses} MORE GLASSES</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Balanced Skater Plate Pie Ratio Visualization */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
            <div className="text-xs font-mono text-slate-500">
              OPTIMAL CLASS 4 EVS SKATER DAILY PLATE PROPORTION
            </div>
            <div className="flex h-4 rounded-full overflow-hidden border border-slate-200">
              <div className="bg-sky-600 w-[55%]" title="55% Complex Carbs (Energy)" />
              <div className="bg-emerald-600 w-[25%]" title="25% Proteins (Repair)" />
              <div className="bg-amber-600 w-[20%]" title="20% Calcium & Iron (Protection)" />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-600 pt-0.5">
              <span className="text-sky-700 font-bold">55% Carbs (Oats/Rice)</span>
              <span className="text-emerald-700 font-bold">25% Protein (Eggs/Dal)</span>
              <span className="text-amber-700 font-bold">20% Calcium/Iron</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
