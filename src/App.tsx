/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  Pause,
  Play,
  RotateCcw,
  Download,
  Flame,
  Activity,
  Wind,
  Shield,
  Clock,
  Compass,
} from 'lucide-react';
import { SkaterBiomechanicsVisualizer } from './components/SkaterBiomechanicsVisualizer';
import { DigestiveAnatomyVisualizer } from './components/DigestiveAnatomyVisualizer';
import { VisualMetabolicCharts } from './components/VisualMetabolicCharts';
import { MotionBreakdownPlayer } from './components/MotionBreakdownPlayer';
import { RaceDayPlanner } from './components/RaceDayPlanner';
import { exportStandaloneHtmlFile } from './utils/standaloneHtmlExporter';

export default function App() {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<'biomechanics' | 'anatomy' | 'metabolic' | 'motion' | 'planner'>('biomechanics');

  // Web Speech API Narration Engine state
  const [narrationTitle, setNarrationTitle] = useState<string>(
    'Peregrine Falcon Aerodynamic Tuck & Streamlining'
  );
  const [narrationText, setNarrationText] = useState<string>(
    'In Class 4 EVS, we learn that birds have streamlined bodies to cut through air with minimal resistance. At 36 km/h, lowering your son’s torso to 19 degrees reduces frontal air drag by 42%, conserving leg power for the final lap.'
  );
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [autoSpeak, setAutoSpeak] = useState<boolean>(true);
  const [speechProgressPct, setSpeechProgressPct] = useState<number>(0);

  const fallbackTimerRef = useRef<number | null>(null);

  const clearTimer = () => {
    if (fallbackTimerRef.current) {
      window.clearInterval(fallbackTimerRef.current);
      fallbackTimerRef.current = null;
    }
  };

  const handleNarrate = (title: string, text: string, forcePlay = false) => {
    setNarrationTitle(title);
    setNarrationText(text);
    setSpeechProgressPct(0);

    if (!forcePlay && !autoSpeak) return;

    clearTimer();

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.rate = speechRate;
        u.pitch = 1.0;

        u.onstart = () => {
          setIsSpeaking(true);
          setIsPaused(false);
        };

        u.onboundary = (e) => {
          if (text.length > 0 && typeof e.charIndex === 'number') {
            const pct = Math.min(100, Math.round((e.charIndex / text.length) * 100));
            setSpeechProgressPct(pct);
          }
        };

        u.onend = () => {
          setIsSpeaking(false);
          setIsPaused(false);
          setSpeechProgressPct(100);
          clearTimer();
        };

        u.onerror = () => {
          setIsSpeaking(false);
          setIsPaused(false);
          clearTimer();
        };

        window.speechSynthesis.speak(u);

        // Fallback progress estimation
        const estimatedMs = Math.max(3000, (text.split(' ').length / (2.6 * speechRate)) * 1000);
        const start = Date.now();
        fallbackTimerRef.current = window.setInterval(() => {
          const elapsed = Date.now() - start;
          const pct = Math.min(100, Math.round((elapsed / estimatedMs) * 100));
          setSpeechProgressPct(pct);
          if (pct >= 100) {
            setIsSpeaking(false);
            clearTimer();
          }
        }, 150);
      } catch {
        setIsSpeaking(false);
      }
    }
  };

  const togglePlayPause = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      handleNarrate(narrationTitle, narrationText, true);
      return;
    }

    if (isSpeaking && !isPaused) {
      window.speechSynthesis.pause();
      setIsPaused(true);
      clearTimer();
    } else if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      handleNarrate(narrationTitle, narrationText, true);
    }
  };

  const handleReplay = () => {
    handleNarrate(narrationTitle, narrationText, true);
  };

  const handleRateChange = (rate: number) => {
    setSpeechRate(rate);
    if (isSpeaking) {
      handleNarrate(narrationTitle, narrationText, true);
    }
  };

  useEffect(() => {
    return () => {
      clearTimer();
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A]">
      {/* Strict Top Bar Contract */}
      <header className="flex items-center justify-between gap-8 px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-30">
        <button
          type="button"
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setActiveTab('biomechanics');
          }}
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 text-left hover:text-sky-700 transition-colors"
        >
          AeroFuel Skate Science Lab
        </button>

        {/* 4-5 concise single-line text nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <button
            type="button"
            onClick={() => setActiveTab('biomechanics')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'biomechanics'
                ? 'text-sky-700 underline underline-offset-4 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            01. Biomechanics Wind Tunnel
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('anatomy')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'anatomy'
                ? 'text-sky-700 underline underline-offset-4 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            02. Digestive Anatomy Simulator
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('metabolic')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'metabolic'
                ? 'text-sky-700 underline underline-offset-4 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            03. Metabolic Charts
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('motion')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'motion'
                ? 'text-sky-700 underline underline-offset-4 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            04. Motion Sequences
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('planner')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'planner'
                ? 'text-sky-700 underline underline-offset-4 font-bold'
                : 'hover:text-slate-900'
            }`}
          >
            05. Fixed Meal Protocol
          </button>
        </nav>

        {/* 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={exportStandaloneHtmlFile}
            className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Export Standalone HTML
          </button>
        </div>
      </header>

      <main id="top" className="max-w-[1380px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* HERO SECTION & LIVE AUDIO NARRATION CONTROLLER */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-3">
              <div className="text-xs font-mono text-slate-500">
                CLASS 4 EVS CURRICULUM APPLIED · FOOD & DIGESTION · ANIMAL ADAPTATIONS & MOVEMENT
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
                Engineering a Fast & Powerful Inline Speed Skater Through Science
              </h1>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Speed on inline skates requires explosive quadriceps and glute power, muscular endurance, a rock-solid skeletal frame for 1.68 G banked corners, and low aerodynamic drag. Explore how <strong>Energy-Giving Carbohydrates</strong>, <strong>Body-Building Proteins</strong>, <strong>Protective Calcium & Iron</strong>, and <strong>Nature’s Animal Movement Blueprints</strong> transform track speed.
              </p>
            </div>

            {/* Live Web Speech API Audio Narration Player */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-5 space-y-3.5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-mono font-semibold text-sky-400">
                    LIVE AUDIO NARRATION ENGINE
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-mono">
                  {isSpeaking && !isPaused && (
                    <div className="flex items-center gap-0.5">
                      <span className="w-1 h-3 bg-emerald-400 animate-pulse"></span>
                      <span className="w-1 h-4 bg-emerald-400 animate-pulse delay-75"></span>
                      <span className="w-1 h-2 bg-emerald-400 animate-pulse delay-150"></span>
                    </div>
                  )}
                  <span className={isSpeaking && !isPaused ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                    {isSpeaking && !isPaused ? 'SPEAKING' : isPaused ? 'PAUSED' : 'READY'}
                  </span>
                </div>
              </div>

              {/* Synchronized Live Script Box */}
              <div className="space-y-1">
                <div className="text-[11px] font-mono text-slate-400 font-bold">
                  {narrationTitle}
                </div>
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed min-h-[60px]">
                  “{narrationText}”
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-sky-400 transition-transform duration-150 origin-left"
                  style={{ transform: `scaleX(${speechProgressPct / 100})` }}
                />
              </div>

              {/* Audio Controls */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={togglePlayPause}
                    className="px-3.5 py-1.5 bg-[#0284C7] hover:bg-sky-600 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    {isSpeaking && !isPaused ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    {isSpeaking && !isPaused ? 'Pause' : isPaused ? 'Resume' : 'Play Narration'}
                  </button>
                  <button
                    type="button"
                    onClick={handleReplay}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Replay
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5 bg-slate-800 p-0.5 rounded-lg text-[10px] font-mono">
                    {[0.75, 1.0, 1.25, 1.5].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => handleRateChange(r)}
                        className={`px-1.5 py-1 rounded transition-colors ${
                          speechRate === r ? 'bg-sky-500 text-white font-bold' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {r}x
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setAutoSpeak(!autoSpeak)}
                    className={`px-2 py-1 text-[10px] font-mono rounded border transition-colors ${
                      autoSpeak
                        ? 'border-emerald-500/50 text-emerald-300 bg-emerald-950/40'
                        : 'border-slate-700 text-slate-400 bg-slate-800'
                    }`}
                  >
                    Auto-Speak: {autoSpeak ? 'ON' : 'OFF'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Pillar Jump Navigation Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setActiveTab('biomechanics')}
              className={`p-3 rounded-lg border text-left transition-colors ${
                activeTab === 'biomechanics'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-sky-400'
              }`}
            >
              <div className="text-[10px] font-mono text-sky-400">01. BIOMECHANICS</div>
              <div className="font-display text-sm font-bold mt-0.5">Wind Tunnel Simulator</div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('anatomy')}
              className={`p-3 rounded-lg border text-left transition-colors ${
                activeTab === 'anatomy'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-emerald-400'
              }`}
            >
              <div className="text-[10px] font-mono text-emerald-400">02. ANATOMY</div>
              <div className="font-display text-sm font-bold mt-0.5">Digestive Tract Cutaway</div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('metabolic')}
              className={`p-3 rounded-lg border text-left transition-colors ${
                activeTab === 'metabolic'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-amber-400'
              }`}
            >
              <div className="text-[10px] font-mono text-amber-400">03. METABOLIC</div>
              <div className="font-display text-sm font-bold mt-0.5">Glycemic Curves & Repair</div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('motion')}
              className={`p-3 rounded-lg border text-left transition-colors ${
                activeTab === 'motion'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-purple-400'
              }`}
            >
              <div className="text-[10px] font-mono text-purple-400">04. MOTION LAB</div>
              <div className="font-display text-sm font-bold mt-0.5">Frame-by-Frame Player</div>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('planner')}
              className={`p-3 rounded-lg border text-left transition-colors ${
                activeTab === 'planner'
                  ? 'bg-slate-900 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-sky-400'
              }`}
            >
              <div className="text-[10px] font-mono text-sky-400">05. PROTOCOL</div>
              <div className="font-display text-sm font-bold mt-0.5">Fixed Meals & Water</div>
            </button>
          </div>
        </section>

        {/* ACTIVE VISUALIZATION MODULE CONTAINER */}
        <section className="space-y-6">
          {activeTab === 'biomechanics' && (
            <SkaterBiomechanicsVisualizer onNarrate={handleNarrate} />
          )}

          {activeTab === 'anatomy' && (
            <DigestiveAnatomyVisualizer onNarrate={handleNarrate} />
          )}

          {activeTab === 'metabolic' && (
            <VisualMetabolicCharts onNarrate={handleNarrate} />
          )}

          {activeTab === 'motion' && (
            <MotionBreakdownPlayer onNarrate={handleNarrate} />
          )}

          {activeTab === 'planner' && (
            <RaceDayPlanner onNarrate={handleNarrate} />
          )}
        </section>

        {/* SCIENTIFIC SYNTHESIS COMPASS CARD */}
        <section className="bg-white border border-slate-200 rounded-xl p-6 lg:p-8 space-y-5">
          <div className="border-b border-slate-200 pb-3">
            <div className="text-xs font-mono text-slate-500">
              CLASS 4 EVS CURRICULUM SYNTHESIS · CONNECTING SCIENCE TO TRACK GOLD
            </div>
            <h2 className="font-display text-2xl font-bold text-slate-900 mt-0.5">
              How Nutrition & Biomechanics Work Together on the Track
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-slate-700 leading-relaxed">
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-mono text-xs font-bold text-sky-700">
                1. ENERGY-GIVING FOODS & FALCON TUCK
              </div>
              <p>
                Holding a horizontal aerodynamic tuck (19° torso angle) for laps requires continuous isometric core and quad stamina. Quality carbohydrates—<strong>oats, brown rice, whole wheat, potatoes, and bananas</strong>—supply continuous muscle glycogen without blood sugar crashes.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-mono text-xs font-bold text-emerald-700">
                2. BODY-BUILDING FOODS & CHEETAH LEVER
              </div>
              <p>
                Driving lateral strides at a 50° push angle places intense eccentric load on the quadriceps, glutes, and calves. Body-building proteins—<strong>milk, eggs, pulses, grams, and peas</strong>—supply essential amino acids to repair worn-out fibers overnight.
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="font-mono text-xs font-bold text-amber-700">
                3. PROTECTIVE FOODS, HYDRATION & CORNERING
              </div>
              <p>
                Deep inward cornering crossovers exert 1.68 G of compression on shin and ankle bones. <strong>Calcium in milk and curd</strong> fortifies bone density, <strong>iron in spinach</strong> carries oxygen via hemoglobin, and <strong>8 to 10 glasses of water daily</strong> prevents calf muscle cramps.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Clean Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 px-6">
        <div className="max-w-[1380px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            AeroFuel Skate Science Lab · Class 4 EVS Nutrition, Digestion & Biomechanics Curriculum
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={exportStandaloneHtmlFile}
              className="text-slate-900 font-semibold underline underline-offset-2 hover:text-sky-700"
            >
              Download Standalone Single-File index.html
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
