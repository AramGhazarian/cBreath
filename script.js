// C-Breath landing page — small interactions only.
// 1) Cycle the breathing orb's center text through phases at the same pace as the CSS animation.
// 2) Stamp the current year in the footer.

(function () {
    'use strict';

    // ---- Footer year ----
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ---- Breathing-orb phase text ----
    // CSS .orb-ring animation is 16s with phases at 0–25–50–75%:
    //   0–25%   Inhale    (scaling up)
    //   25–50%  Hold      (held at peak)
    //   50–75%  Exhale    (scaling down)
    //   75–100% Hold      (held at base)
    const orbText = document.getElementById('orbText');
    if (orbText && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const phases = ['Inhale', 'Hold', 'Exhale', 'Hold'];
        const phaseMs = 4000; // 16000 / 4

        const setPhase = (label) => {
            orbText.style.opacity = '0';
            setTimeout(() => {
                orbText.textContent = label;
                orbText.style.opacity = '1';
            }, 350);
        };

        let i = 0;
        setPhase(phases[i]);
        setInterval(() => {
            i = (i + 1) % phases.length;
            setPhase(phases[i]);
        }, phaseMs);
    }

    // ---- Reveal-on-scroll for cards & section headers ----
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
        );

        document
            .querySelectorAll('.practice-card, .stat-card, .section-header, .science-copy, .premium-card, .download-inner')
            .forEach((el) => observer.observe(el));
    }
})();
