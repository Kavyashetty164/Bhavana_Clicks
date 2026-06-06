// ======================================
// INTRO LOGO ANIMATION
// ======================================

window.addEventListener("load", () => {

    const introLogo = document.getElementById("introLogo");
    const finalLogo = document.querySelector(".logo");
    const introScreen = document.querySelector(".intro-screen");

    finalLogo.classList.remove("show");

    const finalRect = finalLogo.getBoundingClientRect();
    const introRect = introLogo.getBoundingClientRect();

    const moveX =
        finalRect.left + finalRect.width / 2 -
        (introRect.left + introRect.width / 2);

    const moveY =
        finalRect.top + finalRect.height / 2 -
        (introRect.top + introRect.height / 2);

    setTimeout(() => {
        introLogo.style.transform =
            `translate(${moveX}px, ${moveY}px) scale(0.8222) scaleX(0.88)`;
    }, 500);

    setTimeout(() => {
        introScreen.classList.add("hide");
    }, 2500);
});


// ======================================
// SMOOTH SCROLL
// ======================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});


// ======================================
// SPLIT IMAGE CINEMATIC EFFECT
// ======================================

const aboutSection  = document.querySelector('.about-section');
const splitWrapper  = document.querySelector('.split-wrapper');

let expanded = false;

// ======================================
// PARALLAX SCROLL — bottom section
// ======================================

const bottomSection = document.getElementById('bottomSection');
const bottomBg      = document.getElementById('bottomBg');
const parallaxText  = document.getElementById('parallaxText');

// Photo elements
const ptop1 = document.getElementById('ptop1');
const ptop2 = document.getElementById('ptop2');
const pbot1 = document.getElementById('pbot1');
const pbot2 = document.getElementById('pbot2');
const pbot3 = document.getElementById('pbot3');

// Track if photos have been revealed
let photosRevealed = false;

function lerp(a, b, t){ return a + (b - a) * t; }

function clamp(val, min, max){ return Math.min(Math.max(val, min), max); }

window.addEventListener('scroll', () => {

    const scrollY      = window.scrollY;
    const winH         = window.innerHeight;

    // ---- About section expand trigger ----
    const sectionTop = aboutSection.getBoundingClientRect().top;
    const triggerPoint = winH * 0.65;

    if(sectionTop < triggerPoint && !expanded){
        expanded = true;
        aboutSection.classList.add('active');
        splitWrapper.classList.add('active');
    }

    if(scrollY < 150 && expanded){
        expanded = false;
        aboutSection.classList.remove('active');
        splitWrapper.classList.remove('active');
    }

    // ---- Bottom section parallax ----
    if(!bottomSection) return;

    const bRect  = bottomSection.getBoundingClientRect();
    const bTop   = bRect.top;
    const bH     = bRect.height;

    // progress: 0 = section enters viewport bottom, 1 = section exits viewport top
    const rawProgress = (winH - bTop) / (winH + bH);
    const progress = clamp(rawProgress, 0, 1);

    // ---- 1. Background image parallax (slow drift) ----
    const bgShift = lerp(-60, 60, progress);
    bottomBg.style.transform = `translateY(${bgShift}px) scale(1.1)`;

    // ---- 2. Parallax text ----
    // Text starts at translateY(-100%) via CSS (behind/above the about section)
    // As user scrolls, it moves DOWN into the bottom section
    // We drive it from -100% of its own height down to a resting position
    // Use px: text is ~320px tall (2 lines × 160px). Start at -320px above section top.
    // At progress=0: text top edge = bottom section top edge - textHeight (hidden above)
    // At progress=0.5: text is nicely centered in the section
    const textHeight = parallaxText.offsetHeight || 320;
    // Map progress 0→1 to Y: start fully above (-textHeight), settle to center of section
    const textY = lerp(-textHeight, bH * 0.25, progress);
    parallaxText.style.transform = `translate(-50%, ${textY}px)`;
    parallaxText.style.opacity = '1';

    // ---- 3. Photo parallax reveal ----
    // Trigger photos when bottom section is ~40% into viewport
    const revealThreshold = bTop < winH * 0.6;

    if(revealThreshold && !photosRevealed){
        photosRevealed = true;

        // TOP-DOWN photos: delay staggered
        [ptop1, ptop2].forEach((el, i) => {
            setTimeout(() => {
                el.style.transition = 'transform 1.1s cubic-bezier(.22,1,.36,1), opacity 0.7s ease';
                el.style.transform  = 'translateY(0)';
                el.style.opacity    = '1';
            }, i * 150);
        });

        // BOTTOM-UP photos: delay staggered after top ones
        [pbot1, pbot2, pbot3].forEach((el, i) => {
            setTimeout(() => {
                el.style.transition = 'transform 1.1s cubic-bezier(.22,1,.36,1), opacity 0.7s ease';
                el.style.transform  = 'translateY(0)';
                el.style.opacity    = '1';
            }, 100 + i * 150);
        });
    }

    // ---- 4. Continuous parallax drift on revealed photos ----
    // Top photos drift upward as you scroll (parallax)
    // Bottom photos drift downward (opposite direction)
    if(photosRevealed){
        const photoProgress = clamp((progress - 0.1) / 0.8, 0, 1);

        // Top-down photos move upward as scroll progresses (they came from top, continue drifting up slightly)
        const topDrift  = lerp(0, -50, photoProgress);
        // Bottom-up photos move downward slightly
        const botDrift  = lerp(0, 50, photoProgress);

        ptop1.style.transform = `translateY(${topDrift}px)`;
        ptop2.style.transform = `translateY(${topDrift * 0.8}px)`;
        pbot1.style.transform = `translateY(${botDrift}px)`;
        pbot2.style.transform = `translateY(${botDrift * 1.2}px)`;
        pbot3.style.transform = `translateY(${botDrift * 0.9}px)`;
    }

});