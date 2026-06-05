/* ==========================================================================
   MODAL FORGE - INTERACTIVE APP ENGINE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initControlDeck();
  initGallery();
  initSandbox();
  initModuleDirectory();
});

/* --- Navbar Scroll Effect --- */
function initNavbar() {
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* --- Control Deck Preset Simulator --- */
function initControlDeck() {
  // Define Presets and their Dial Values
  const presets = {
    'pause-menu': {
      name: 'Pause Menu',
      icon: '⏸️',
      dialsCount: 27,
      description: 'A calm, centered dark overlay that holds the moment — quiet surface, soft dim, breath before the next move.',
      modalClass: 'modal-pause-menu',
      dials: [
        { id: 'layout', name: 'ctl-layout', value: 'Single Column (Centered)', desc: 'Centered list options for clean overlay layout', type: 'structure', locked: true },
        { id: 'sizing', name: 'ctl-sizing', value: 'Width: 380px (Lock Grid)', desc: 'Constrains width to central vertical menu', type: 'structure', locked: true },
        { id: 'density', name: 'ctl-density', value: 'Comfortable Balanced', desc: 'Provides breathable padding between options', type: 'structure', locked: true },
        { id: 'theme-mode', name: 'ctl-theme-mode', value: 'Dark Mode (Rounded Corners)', desc: 'Sleek dark backing to highlight options', type: 'theme', locked: true },
        { id: 'theme-accent', name: 'ctl-theme-accent', value: 'Hex Violet', desc: 'Deep purple highlights for inactive overlays', type: 'theme', locked: true },
        { id: 'mi-tone', name: 'ctl-mi-tone', value: 'Calm / Mysterious', desc: 'Slow, graceful overlays and entrance easing', type: 'motion', locked: true },
        { id: 'mi-signature', name: 'ctl-mi-signature', value: 'Holo-Drift / Neon-Pulse', desc: 'Subtle floating glow behind overlay menu', type: 'motion', locked: true },
        { id: 'comp-choice', name: 'ctl-comp-choice', value: 'Menu items (Border outline)', desc: 'Boxed selection items that hover-glow', type: 'component', locked: false }
      ]
    },
    'inventory-grid': {
      name: 'Inventory Grid',
      icon: '🎒',
      dialsCount: 31,
      description: 'A spacious two-column RPG inventory panel – gear on the left, stats on the right, status badges across the top.',
      modalClass: 'modal-inventory',
      dials: [
        { id: 'layout', name: 'ctl-layout', value: 'Two-Column Split', desc: 'Columns split for character visual / grids list', type: 'structure', locked: true },
        { id: 'sizing', name: 'ctl-sizing', value: 'Width: 640px (Locked)', desc: 'Locks layout into widescreen asset screen', type: 'structure', locked: true },
        { id: 'density', name: 'ctl-density', value: 'Compact Tight', desc: 'Compresses margins for maximum items count grid', type: 'structure', locked: true },
        { id: 'theme-mode', name: 'ctl-theme-mode', value: 'Dark Mode (Sharp Corners)', desc: 'Gothic slate-colored backings', type: 'theme', locked: true },
        { id: 'theme-accent', name: 'ctl-theme-accent', value: 'Terminal Green', desc: 'Classic neon green rarity indicators', type: 'theme', locked: true },
        { id: 'mi-tone', name: 'ctl-mi-tone', value: 'Elegant / Kinetic', desc: 'Quick slot-drags and sharp item tooltips', type: 'motion', locked: true },
        { id: 'mi-signature', name: 'ctl-mi-signature', value: 'CRT-Flicker', desc: 'Retro pixel scanlines for tactical UI', type: 'motion', locked: true },
        { id: 'comp-rows', name: 'ctl-comp-rows', value: 'Grid Inventory Slots', desc: 'Generates grids layout with active cell rows', type: 'component', locked: true }
      ]
    },
    'quest-log': {
      name: 'Quest Log',
      icon: '📜',
      dialsCount: 31,
      description: 'A calm, scrollable journal of active and completed quests — flat sections, meta breadcrumbs, single status badge per entry.',
      modalClass: 'modal-quest-log',
      dials: [
        { id: 'layout', name: 'ctl-layout', value: 'Flat List Layout', desc: 'Non-nested layout sections for scanning quests', type: 'structure', locked: true },
        { id: 'sizing', name: 'ctl-sizing', value: 'Width: 500px (Locked)', desc: 'Perfect reading pane width', type: 'structure', locked: true },
        { id: 'density', name: 'ctl-density', value: 'Comfortable Balanced', desc: 'Comfortable reading gap with separators', type: 'structure', locked: true },
        { id: 'theme-mode', name: 'ctl-theme-mode', value: 'Dark Mode (Glow Corners)', desc: 'Faint glow bounds for high text legibility', type: 'theme', locked: true },
        { id: 'theme-accent', name: 'ctl-theme-accent', value: 'Cyan Spark', desc: 'Tech-cyan highlights for active tracking', type: 'theme', locked: true },
        { id: 'mi-tone', name: 'ctl-mi-tone', value: 'Calm', desc: 'Soft page transitions to prevent text distraction', type: 'motion', locked: true },
        { id: 'mi-signature', name: 'ctl-mi-signature', value: 'Neon-Pulse', desc: 'Faint pulsing indicator on currently tracked quest', type: 'motion', locked: true },
        { id: 'comp-toggles', name: 'ctl-comp-toggles', value: 'Progress Checkboxes', desc: 'Custom checkboxes for sub-objective tasks', type: 'component', locked: true }
      ]
    },
    'form-heavy': {
      name: 'Form Heavy',
      icon: '📝',
      dialsCount: 32,
      description: 'Dense data-entry modal with grouped sections, live sliders, and calm sans-serif clarity.',
      modalClass: 'modal-form-heavy',
      dials: [
        { id: 'layout', name: 'ctl-layout', value: 'Grouped Sections Grid', desc: 'Forms categorized with subtle headers and labels', type: 'structure', locked: true },
        { id: 'sizing', name: 'ctl-sizing', value: 'Width: 520px', desc: 'Optimal container width for double inputs', type: 'structure', locked: true },
        { id: 'density', name: 'ctl-density', value: 'Compact Tight', desc: 'High packing density for complex data fields', type: 'structure', locked: true },
        { id: 'theme-mode', name: 'ctl-theme-mode', value: 'Dark Mode (Rounded)', desc: 'Clean slate backdrop to lower screen fatigue', type: 'theme', locked: true },
        { id: 'theme-accent', name: 'ctl-theme-accent', value: 'Neutral Silver', desc: 'Faded gray accents to keep focus on input fields', type: 'theme', locked: true },
        { id: 'mi-tone', name: 'ctl-mi-tone', value: 'Calm', desc: 'Subtle transitions only on focus switches', type: 'motion', locked: true },
        { id: 'mi-signature', name: 'ctl-mi-signature', value: 'Holo-Drift (Faded)', desc: 'Faded animations: layout is kept fully static', type: 'motion', locked: false },
        { id: 'comp-inputs', name: 'ctl-comp-inputs', value: 'Inputs & Labels', desc: 'Includes form blocks, labels, validation nodes', type: 'component', locked: true }
      ]
    },
    'soft-daylight': {
      name: 'Soft Daylight',
      icon: '☀️',
      dialsCount: 27,
      description: 'Bright, airy, and unhurried – a light-mode modal that breathes.',
      modalClass: 'modal-light-mode',
      dials: [
        { id: 'layout', name: 'ctl-layout', value: 'Single Column (Flat)', desc: 'Clean, simple one-block body list', type: 'structure', locked: true },
        { id: 'sizing', name: 'ctl-sizing', value: 'Width: 420px', desc: 'Comfortable container width', type: 'structure', locked: true },
        { id: 'density', name: 'ctl-density', value: 'Spacious Airy', desc: 'Large margin gaps (24px+) to allow elements to breathe', type: 'structure', locked: true },
        { id: 'theme-mode', name: 'ctl-theme-mode', value: 'Light Mode (Rounded)', desc: 'Bright, clean-styled surface backing', type: 'theme', locked: true },
        { id: 'theme-accent', name: 'ctl-theme-accent', value: 'Soft Blue / Slate', desc: 'Muted warm color palettes', type: 'theme', locked: true },
        { id: 'mi-tone', name: 'ctl-mi-tone', value: 'Calm / Elegant', desc: 'Smooth, slow overlays and entrance fading', type: 'motion', locked: true },
        { id: 'mi-signature', name: 'ctl-mi-signature', value: 'Off', desc: 'No scanlines or glitch effects; clean transitions', type: 'motion', locked: true },
        { id: 'comp-choice', name: 'ctl-comp-choice', value: 'Rounded Buttons', desc: 'Standard clean-line buttons and inputs', type: 'component', locked: true }
      ]
    },
    'coin-op': {
      name: 'Coin-Op Marquee',
      icon: '🕹️',
      dialsCount: 31,
      description: 'Arcade marquee energy — orange neon, upper-case shout, kinetic pulse.',
      modalClass: 'modal-coin-op',
      dials: [
        { id: 'layout', name: 'ctl-layout', value: 'Single Column (Centered)', desc: 'Classic arcade screen centering', type: 'structure', locked: true },
        { id: 'sizing', name: 'ctl-sizing', value: 'Width: 460px (Locked)', desc: 'Arcade screen container limit scale', type: 'structure', locked: true },
        { id: 'density', name: 'ctl-density', value: 'Comfortable Balanced', desc: 'Standard gap ratios', type: 'structure', locked: true },
        { id: 'theme-mode', name: 'ctl-theme-mode', value: 'Dark Mode (Sharp Corners)', desc: 'Midnight backings with thick glowing borders', type: 'theme', locked: true },
        { id: 'theme-accent', name: 'ctl-theme-accent', value: 'Orange Neon', desc: 'Vibrant neon orange marquee overlays', type: 'theme', locked: true },
        { id: 'mi-tone', name: 'ctl-mi-tone', value: 'Aggressive / Playful', desc: 'Bouncing UI elements, snappy animations', type: 'motion', locked: true },
        { id: 'mi-signature', name: 'ctl-mi-signature', value: 'CRT-Flicker / Particle-Trails', desc: 'CRT scan line distortion and tail glows', type: 'motion', locked: true },
        { id: 'comp-choice', name: 'ctl-comp-choice', value: 'Arcade Grid Buttons', desc: 'Thick-bordered bold buttons', type: 'component', locked: true }
      ]
    }
  };

  const presetButtons = document.querySelectorAll('.preset-btn');
  const lockedCounter = document.getElementById('locked-dials-val');
  const dialsContainer = document.getElementById('dials-grid-container');
  const vizCanvas = document.getElementById('viz-canvas-wrapper');

  // Trigger default preset on load
  applyPreset('pause-menu');

  // Add click listeners to preset buttons
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const presetId = btn.getAttribute('data-preset');
      // Update active class
      presetButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      applyPreset(presetId);
    });
  });

  function applyPreset(presetId) {
    const preset = presets[presetId];
    if (!preset) return;

    // Update locked counter pill text
    lockedCounter.textContent = `${preset.dialsCount} DIALS`;

    // Rebuild dials grid with animation trigger
    dialsContainer.innerHTML = '';
    
    preset.dials.forEach((dial, idx) => {
      const card = document.createElement('div');
      card.className = `dial-card ${dial.locked ? (dial.type === 'motion' ? 'locked-purple' : 'locked') : ''}`;
      
      // Delay entrance animation for organic stagger
      card.style.opacity = '0';
      card.style.transform = 'translateY(8px)';
      card.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
      
      card.innerHTML = `
        <div class="dial-top">
          <span class="dial-name">${dial.name}</span>
          <span class="lock-indicator" title="${dial.locked ? 'Locked by Preset' : 'Unlocked (Auto)'}">
            ${dial.locked ? '🔒 Locked' : '⚙️ Auto'}
          </span>
        </div>
        <div class="dial-value">${dial.value}</div>
        <div class="dial-desc">${dial.desc}</div>
      `;

      dialsContainer.appendChild(card);
      
      // Trigger animations
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, idx * 40);
    });

    // Update visualizer modal content
    // Hide all modal previews
    const modals = vizCanvas.querySelectorAll('.simulated-modal');
    modals.forEach(m => m.classList.remove('active'));

    // Find or create correct preview
    const activeModal = vizCanvas.querySelector(`.${preset.modalClass}`);
    if (activeModal) {
      activeModal.classList.add('active');
    }
  }
}

/* --- Gallery Filter & Lightbox Viewer --- */
function initGallery() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox-viewer');
  const lightboxImg = lightbox.querySelector('.lightbox-img');
  const lightboxTitle = lightbox.querySelector('.lightbox-title');
  const lightboxDesc = lightbox.querySelector('.lightbox-desc');
  const lightboxClose = lightbox.querySelector('.lightbox-close');

  // 1. Gallery Filtering Logic
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active class
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const categories = item.getAttribute('data-category').split(' ');
        if (filter === 'all' || categories.includes(filter)) {
          item.classList.remove('hidden');
          // Simple stagger animation entry
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // 2. Lightbox Open/Close Logic
  // Detailed descriptions for each screenshot
  const imageDetails = {
    'screenshot-01': {
      title: 'Main Forge Workspace Home',
      desc: 'The clean landing workspace interface of Modal Forge. Features direct prompt input, dynamic variance pill selections (Similar, A bit more variation, Experimental), a quick-ideas helper panel, and the upper configuration of the active Control Deck.'
    },
    'screenshot-02': {
      title: 'Active Text Prompt Input',
      desc: 'Refining the visual prompt. You describe the layout, design themes, and details in plain English, and the generator maps your keywords to creative brief settings.'
    },
    'screenshot-03': {
      title: 'Variance Settings Panel',
      desc: 'Allows users to steer how tightly the generative wisps should stick to the brief or how much variation they should experiment with.'
    },
    'screenshot-04': {
      title: 'Creative Palette Swatches',
      desc: 'The color palette engine in action, pulling harmonious swatches (Ember Gold, Iron Slate, Hex Violet) that will coordinate across the takes.'
    },
    'screenshot-05': {
      title: 'Workspace Initial Load',
      desc: 'Welcome onboarding interface showing clean default states, guide tips, and suggested starting structures for dialogue modals.'
    },
    'screenshot-06': {
      title: 'Creative Brief compilation',
      desc: 'Before generating, the prompt is parsed into a core Creative Direction brief mapping specific platform styles and layout grids.'
    },
    'screenshot-07': {
      title: 'Initial Generation Queue',
      desc: 'Queue status of modal generators dispatching multiple tasks concurrently to generate 4 distinct cards.'
    },
    'screenshot-08': {
      title: 'Modal Card Close-up',
      desc: 'A single, high-fidelity dark-fantasy popup card detailing structural components and action nodes.'
    },
    'screenshot-09': {
      title: 'Creative Direction Planner',
      desc: 'Reviewing the structural brief properties including typography definitions, motion transitions, palette codes, and thematic descriptions prior to forge execution.'
    },
    'screenshot-10': {
      title: 'Workspace Panel Inspection',
      desc: 'Deep inspection overlay showing the container width, borders, and paddings of the generated layout block.'
    },
    'screenshot-11': {
      title: 'Arcane Codex Inventory Modal Detail',
      desc: 'Deep inspection of the Arcane Codex generated layout: featuring character slots (Theron Rogue Arcane), inventory grids, burden indicators, fitted items, and export/share controls.'
    },
    'screenshot-12': {
      title: 'Fitted Inventory Slots Inspections',
      desc: 'Analyzing the detail code output and responsive layout properties of individual equipped item slots.'
    },
    'screenshot-13': {
      title: 'Forging Takes Landing',
      desc: 'The moment generated takes load into the workspace layout slots, rendering real functional HTML preview blocks.'
    },
    'screenshot-14': {
      title: 'Multiple Card Generations',
      desc: 'Comparing visual interpretations side-by-side: testing dark slate themes vs. flat solid backings.'
    },
    'screenshot-15': {
      title: 'Forge Director Controls',
      desc: 'Accessing hybridization buttons on the generated cards to blend design traits or spin off mutations.'
    },
    'screenshot-16': {
      title: 'Save & Library Modal',
      desc: 'Modal library dialog: saving the final keeper to local catalogs with tags, classifications, and category labels.'
    },
    'screenshot-17': {
      title: 'Library View Catalog',
      desc: 'Reviewing saved modal cards library, allowing sorting, re-editing, or direct code copying.'
    },
    'screenshot-18': {
      title: 'Control Deck: Sizing & Structure Dials',
      desc: 'Granular sizing options showing width limits sliders and layout grids constraints toggle controls.'
    },
    'screenshot-19': {
      title: 'Control Deck: Typography & Mode settings',
      desc: 'Text dials showing typography selections, casing flags, and dark/light toggles.'
    },
    'screenshot-20': {
      title: 'Control Deck: Motion Entrance & BACKDROP blurs',
      desc: 'Settings for entrance animation curves, hover glow effects, and backdrop blur strength.'
    },
    'screenshot-21': {
      title: 'Control Deck: 34 Preset Catalog Menu',
      desc: 'The preset selection list: clicking on a preset like Form Heavy or Coin-Op Marquee snaps the entire control deck config in one click.'
    },
    'screenshot-22': {
      title: 'Control Deck: Motion Intelligence (Feel Dials)',
      desc: 'Dials configuring emotional tone (Calm, Playful, Mysterious) and animation energy vectors.'
    },
    'screenshot-23': {
      title: 'Control Deck: Components Palette Toggles',
      desc: 'Locking parameters for choice grids, inputs fields formatting, sliders, and badges.'
    },
    'screenshot-24': {
      title: 'Control Deck: Behavior Flags settings',
      desc: 'Locking backend behaviors like backdrop-click-to-close, background scrolling blocks, and scrollable body layers.'
    },
    'screenshot-25': {
      title: 'Showcase Preview Dashboard',
      desc: 'Comprehensive review view displaying multiple generated modals ready for HTML code copying.'
    }
  };

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-img');
      const imgSrc = img.getAttribute('src');
      const filename = imgSrc.split('/').pop().split('.')[0]; // e.g., screenshot-01
      
      const details = imageDetails[filename] || { title: 'Modal Forge View', desc: 'Generated design workflow.' };

      lightboxImg.setAttribute('src', imgSrc);
      lightboxTitle.textContent = details.title;
      lightboxDesc.textContent = details.desc;

      lightbox.classList.add('active');
    });
  });

  // Close Lightbox
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
      closeLightbox();
    }
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
  }
}

/* --- Mini-Forge Sandbox Simulator --- */
function initSandbox() {
  const input = document.getElementById('sandbox-prompt-input');
  const btn = document.getElementById('sandbox-forge-btn');
  const consoleEl = document.getElementById('sandbox-console-output');
  const resultsContainer = document.getElementById('sandbox-results-container');

  const defaultPrompts = [
    'A cyberpunk deck dashboard with active neon widgets and holographic grids.',
    'A cozy medieval tavern menu for buying food and renting rooms.',
    'A minimalist sci-fi hacking console with retro font and custom sliders.'
  ];

  // Pick random default input on load
  input.placeholder = defaultPrompts[Math.floor(Math.random() * defaultPrompts.length)];

  btn.addEventListener('click', () => {
    const promptText = input.value.trim() || input.placeholder;
    startSimulation(promptText);
  });

  function startSimulation(promptText) {
    btn.disabled = true;
    input.disabled = true;
    resultsContainer.innerHTML = '';
    consoleEl.innerHTML = '';

    const logs = [
      { text: `> Initializing generation request...`, delay: 0 },
      { text: `> Prompt parsed: "${promptText}"`, delay: 600, class: 'input' },
      { text: `> Dispatching wisps...`, delay: 1200 },
      { text: `> Savi (Forge Director): "Let's compile a responsive dashboard spec. Aligning grid patterns..."`, delay: 1800, class: 'system' },
      { text: `> Creative brief generated: [Theme: Dark, Style: Neon, Platform: Web]`, delay: 2500, class: 'system' },
      { text: `> Executing ctl-brief-compose constraint aggregation...`, delay: 3100 },
      { text: `> Generating 4 distinct takes...`, delay: 3600 },
      { text: `[✔] Take 1: Cyber-Glow Deck [Locked ctl-layout]`, delay: 4200, class: 'success' },
      { text: `[✔] Take 2: Matrix HUD [Locked ctl-theme-accent]`, delay: 4600, class: 'success' },
      { text: `[✔] Take 3: Void Terminal [Locked ctl-sizing]`, delay: 5000, class: 'success' },
      { text: `[✔] Take 4: Pixel Arcade [Locked ctl-mi-signature]`, delay: 5400, class: 'success' },
      { text: `> Forging completed! 4 cards successfully landed in 5.8s.`, delay: 5900, class: 'success' }
    ];

    logs.forEach(log => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = `console-line ${log.class || ''}`;
        line.textContent = log.text;
        consoleEl.appendChild(line);
        consoleEl.scrollTop = consoleEl.scrollHeight;

        // When logs finish, reveal mockup cards
        if (log.text.startsWith('> Forging completed')) {
          revealMockupCards(promptText);
        }
      }, log.delay);
    });
  }

  function revealMockupCards(promptText) {
    btn.disabled = false;
    input.disabled = false;

    const mockups = [
      {
        title: 'Cyber-Glow Deck',
        badge: 'Take 1',
        class: 'badge-green',
        desc: `A responsive cyberpunk layout matching: "${promptText}". Uses green neon glows, outline borders, and a grouped cards grid structure.`
      },
      {
        title: 'Matrix HUD Overlay',
        badge: 'Take 2',
        class: 'badge-purple',
        desc: `A tactical monospace design matching: "${promptText}". Sharp edges, CRT scanline signature overlays, and a single column layout.`
      }
    ];

    mockups.forEach((mock, idx) => {
      const card = document.createElement('div');
      card.className = 'sim-output-card glass-card';
      card.style.opacity = '0';
      card.style.transform = 'translateY(10px)';
      card.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      
      card.innerHTML = `
        <div class="sim-output-header">
          <span class="sim-output-title">${mock.title}</span>
          <span class="badge ${mock.class} sim-output-badge">${mock.badge}</span>
        </div>
        <div class="sim-output-desc">${mock.desc}</div>
        <div class="sim-output-btns">
          <button class="btn btn-secondary sim-output-btn" onclick="alert('HTML/CSS copied to clipboard! (Simulated)')">Copy HTML</button>
          <button class="btn btn-primary sim-output-btn" style="padding: 0.35rem 0.75rem;" onclick="alert('Launching Full-Screen Preview... (Simulated)')">Preview</button>
        </div>
      `;

      resultsContainer.appendChild(card);

      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, idx * 150);
    });
  }
}

/* --- Control Deck Modules Directory Filtering --- */
function initModuleDirectory() {
  const dirButtons = document.querySelectorAll('.dir-tab-btn');
  const dirCards = document.querySelectorAll('.dir-card');

  if (dirButtons.length && dirCards.length) {
    dirButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        dirButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');
        filterModules(category);
      });
    });
  }

  function filterModules(category) {
    dirCards.forEach(card => {
      const cardCat = card.getAttribute('data-category');
      if (category === 'all' || cardCat === category) {
        card.style.display = 'block';
        card.style.opacity = '0';
        card.style.transform = 'translateY(8px)';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 50);
      } else {
        card.style.display = 'none';
      }
    });
  }
}
