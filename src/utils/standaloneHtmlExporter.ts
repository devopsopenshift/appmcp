export function exportStandaloneHtmlFile(): void {
  const standaloneContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>AeroFuel Skate Science Lab — Standalone Interactive Dashboard</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700&family=IBM+Plex+Mono:wght@400;600&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap" rel="stylesheet">
  <style>
    body { font-family: 'Plus Jakarta Sans', sans-serif; background-color: #F8FAFC; color: #0F172A; }
    h1, h2, h3, .font-display { font-family: 'Bricolage Grotesque', sans-serif; text-wrap: balance; }
    .font-mono { font-family: 'IBM Plex Mono', monospace; }
  </style>
</head>
<body class="min-h-screen flex flex-col">
  <!-- Top Bar Contract -->
  <header class="flex items-center justify-between gap-8 px-6 py-4 bg-white border-b border-slate-200 sticky top-0 z-30">
    <a href="#top" class="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
      AeroFuel Skate Science Lab
    </a>
    <nav class="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600">
      <a href="#biomechanics" class="hover:text-slate-900 whitespace-nowrap">01. Biomechanics Wind Tunnel</a>
      <a href="#anatomy" class="hover:text-slate-900 whitespace-nowrap">02. Digestive Anatomy Simulator</a>
      <a href="#metabolic" class="hover:text-slate-900 whitespace-nowrap">03. Metabolic Charts</a>
      <a href="#planner" class="hover:text-slate-900 whitespace-nowrap">04. Fixed Meal Protocol</a>
    </nav>
    <button onclick="speakText('AeroFuel Skate Science Lab applies Class 4 EVS principles of Food and Digestion and Animal Adaptations to help your son become a fast and powerful inline speed skater.')" class="px-4 py-2 text-xs font-semibold text-white bg-[#0284C7] rounded-lg hover:bg-sky-700 whitespace-nowrap shrink-0">
      Narrate Overview
    </button>
  </header>

  <main class="max-w-[1360px] w-full mx-auto px-6 py-8 space-y-12">
    <!-- Hero Section -->
    <section class="bg-white border border-slate-200 rounded-xl p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      <div class="lg:col-span-7 space-y-4">
        <div class="text-xs font-mono text-slate-500">CLASS 4 EVS CURRICULUM APPLIED · FOOD & DIGESTION + ANIMAL ADAPTATIONS</div>
        <h1 class="font-display text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
          Engineering a Fast & Powerful Inline Speed Skater Through Science
        </h1>
        <p class="text-slate-600 text-base leading-relaxed">
          Interactive sports science and educational visual storytelling combining metabolic nutrition (Energy-Giving Carbs, Body-Building Proteins, Protective Calcium & Iron, Hydration & Mastication Discipline) with nature's fastest animal biomechanics.
        </p>
        <div class="flex flex-wrap items-center gap-3 pt-2">
          <button onclick="speakText('Unit 1: Energy-Giving Foods. Quality carbohydrates like whole wheat, oats, brown rice, potatoes, and bananas supply continuous muscle glycogen for explosive speed.')" class="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800">
            Play Carbs Narration
          </button>
          <button onclick="speakText('Unit 2: Body-Building Foods. Proteins from milk, eggs, pulses, grams, and peas repair microscopic tears in quadriceps, calves, and glutes after hard skating sessions.')" class="px-4 py-2 bg-emerald-700 text-white text-xs font-semibold rounded-lg hover:bg-emerald-800">
            Play Proteins Narration
          </button>
          <button onclick="speakText('Unit 3: Protective Foods and Hydration. Milk and curd provide calcium for strong bones under 1.68 G corners. Spinach provides iron for oxygen-carrying hemoglobin. Drink 8 to 10 glasses of water daily.')" class="px-4 py-2 bg-amber-700 text-white text-xs font-semibold rounded-lg hover:bg-amber-800">
            Play Calcium & Hydration
          </button>
        </div>
      </div>
      <div class="lg:col-span-5 bg-slate-900 text-white rounded-xl p-5 space-y-3">
        <div class="text-xs font-mono text-sky-400">LIVE AUDIO SCRIPT VIEWER</div>
        <p id="script-box" class="text-sm text-slate-200 leading-relaxed min-h-[90px]">
          Click any button or section to trigger live spoken audio narration and explore the interactive scientific diagrams.
        </p>
      </div>
    </section>

    <!-- Biomechanics Section -->
    <section id="biomechanics" class="space-y-4">
      <h2 class="font-display text-2xl font-bold text-slate-900">01. Biomechanical Wind Tunnel & Animal Movement Blueprints</h2>
      <div class="bg-slate-950 text-white rounded-xl p-6 space-y-4">
        <div class="flex justify-between text-xs font-mono text-slate-400">
          <span>STREAMLINE AIRFLOW SIMULATION</span>
          <span class="text-emerald-400">● 19° FALCON TUCK: -42% DRAG</span>
        </div>
        <svg viewBox="0 0 600 220" class="w-full h-auto">
          <line x1="20" y1="200" x2="580" y2="200" stroke="#334155" strokeWidth="3" />
          <path d="M 20 60 Q 200 40 350 45 T 580 60" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="6 4" />
          <path d="M 20 100 Q 220 70 360 80 T 580 100" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeDasharray="6 4" />
          <line x1="260" y1="130" x2="160" y2="195" stroke="#F59E0B" strokeWidth="10" strokeLinecap="round" />
          <line x1="260" y1="130" x2="350" y2="100" stroke="#38BDF8" strokeWidth="14" strokeLinecap="round" />
          <circle cx="370" cy="94" r="14" fill="#0284C7" />
          <line x1="260" y1="130" x2="285" y2="170" stroke="#0284C7" strokeWidth="12" strokeLinecap="round" />
          <line x1="285" y1="170" x2="270" y2="195" stroke="#0284C7" strokeWidth="10" strokeLinecap="round" />
          <text x="270" y="80" fill="#38BDF8" class="font-mono text-[11px] font-bold">19° FALCON TUCK PROFILE</text>
          <text x="120" y="180" fill="#F59E0B" class="font-mono text-[10px] font-bold">50° CHEETAH LEVER</text>
        </svg>
      </div>
    </section>

    <!-- Digestive Anatomy Section -->
    <section id="anatomy" class="space-y-4">
      <h2 class="font-display text-2xl font-bold text-slate-900">02. Digestive Organs & Nutrient Pathway to Leg Muscles</h2>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div class="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
          <div class="text-xs font-mono text-sky-700 font-bold">01. MOUTH</div>
          <div class="font-display font-bold text-slate-900">Mastication</div>
          <p class="text-xs text-slate-600">Chew 30 times per bite. Salivary amylase breaks starch into glucose early.</p>
        </div>
        <div class="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
          <div class="text-xs font-mono text-sky-700 font-bold">02. FOOD PIPE</div>
          <div class="font-display font-bold text-slate-900">Peristalsis</div>
          <p class="text-xs text-slate-600">Fixed meal times train smooth passage into the stomach 2.5 hours pre-skate.</p>
        </div>
        <div class="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
          <div class="text-xs font-mono text-emerald-700 font-bold">03. STOMACH</div>
          <div class="font-display font-bold text-slate-900">Protein Breakdown</div>
          <p class="text-xs text-slate-600">Pepsin & gastric acid break down milk, eggs, and pulses into amino acids.</p>
        </div>
        <div class="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
          <div class="text-xs font-mono text-amber-700 font-bold">04. SMALL INTESTINE</div>
          <div class="font-display font-bold text-slate-900">Villi Absorption</div>
          <p class="text-xs text-slate-600">95% uptake of glucose, amino acids, calcium, and iron into capillaries.</p>
        </div>
        <div class="bg-white border border-slate-200 rounded-xl p-4 space-y-2">
          <div class="text-xs font-mono text-purple-700 font-bold">05. BLOOD & LEGS</div>
          <div class="font-display font-bold text-slate-900">Muscle Delivery</div>
          <p class="text-xs text-slate-600">Water and hemoglobin fuel quads, glutes, and calves for 38 km/h sprints.</p>
        </div>
      </div>
    </section>
  </main>

  <script>
    function speakText(txt) {
      document.getElementById('script-box').textContent = txt;
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(txt);
        u.rate = 1.0;
        window.speechSynthesis.speak(u);
      }
    }
  </script>
</body>
</html>`;

  const blob = new Blob([standaloneContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'index.html';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
