import { useEffect } from "react";

function useAboutAnimations() {
  useEffect(() => {
    // ==========================
    // INTRO ANIMATION
    // ==========================

    const introLogo =
      document.getElementById("introLogo");

    const finalLogo =
      document.querySelector(".logo");

    const introScreen =
      document.querySelector(".intro-screen");

    if (
      introLogo &&
      finalLogo &&
      introScreen
    ) {
      const finalRect =
        finalLogo.getBoundingClientRect();

      const introRect =
        introLogo.getBoundingClientRect();

      const moveX =
        finalRect.left +
        finalRect.width / 2 -
        (introRect.left +
          introRect.width / 2);

      const moveY =
        finalRect.top +
        finalRect.height / 2 -
        (introRect.top +
          introRect.height / 2);

      setTimeout(() => {
        introLogo.style.transform =
          `translate(${moveX}px, ${moveY}px) scale(0.8222) scaleX(0.88)`;
      }, 500);

      setTimeout(() => {
        introScreen.classList.add("hide");
      }, 2500);
    }

    // ==========================
    // SECTION REFERENCES
    // ==========================

    const aboutSection =
      document.querySelector(
        ".about-section"
      );

    const splitWrapper =
      document.querySelector(
        ".split-wrapper"
      );

    const bottomSection =
      document.getElementById(
        "bottomSection"
      );

    const bottomBg =
      document.getElementById(
        "bottomBg"
      );

    const parallaxText =
      document.getElementById(
        "parallaxText"
      );

    const ptop1 =
      document.getElementById("ptop1");

    const ptop2 =
      document.getElementById("ptop2");

    const pbot1 =
      document.getElementById("pbot1");

    const pbot2 =
      document.getElementById("pbot2");

    const pbot3 =
      document.getElementById("pbot3");

    let expanded = false;
    let photosRevealed = false;

    const lerp = (a, b, t) =>
      a + (b - a) * t;

    const clamp = (val, min, max) =>
      Math.min(Math.max(val, min), max);

    // ==========================
    // SCROLL ANIMATION
    // ==========================

    const handleScroll = () => {
      if (
        !aboutSection ||
        !splitWrapper ||
        !bottomSection
      )
        return;

      const scrollY =
        window.scrollY;

      const winH =
        window.innerHeight;

      const sectionTop =
        aboutSection.getBoundingClientRect()
          .top;

      const triggerPoint =
        winH * 0.65;

      // ABOUT EXPAND
      if (
        sectionTop <
          triggerPoint &&
        !expanded
      ) {
        expanded = true;

        aboutSection.classList.add(
          "active"
        );

        splitWrapper.classList.add(
          "active"
        );
      }

      if (
        scrollY < 150 &&
        expanded
      ) {
        expanded = false;

        aboutSection.classList.remove(
          "active"
        );

        splitWrapper.classList.remove(
          "active"
        );
      }

      const bRect =
        bottomSection.getBoundingClientRect();

      const bTop = bRect.top;

      const bH = bRect.height;

      const rawProgress =
        (winH - bTop) /
        (winH + bH);

      const progress = clamp(
        rawProgress,
        0,
        1
      );

      // BG PARALLAX
      if (bottomBg) {
        const bgShift =
          lerp(
            -60,
            60,
            progress
          );

        bottomBg.style.transform =
          `translateY(${bgShift}px) scale(1.1)`;
      }

      // TEXT PARALLAX
      if (parallaxText) {
        const textHeight =
          parallaxText.offsetHeight ||
          20;

        const textY =
          lerp(
            -textHeight,
            bH * 0.45,
            progress
          );

        parallaxText.style.transform =
          `translate(-50%, ${textY}px)`;
      }

      // PHOTO REVEAL
      const revealThreshold =
        bTop < winH * 0.6;

      if (
        revealThreshold &&
        !photosRevealed
      ) {
        photosRevealed = true;

        [ptop1, ptop2].forEach(
          (el, i) => {
            if (!el) return;

            setTimeout(() => {
              el.style.transition =
                "transform 1.1s cubic-bezier(.22,1,.36,1), opacity 0.7s ease";

              el.style.transform =
                "translateY(0)";

              el.style.opacity =
                "1";
            }, i * 150);
          }
        );

        [pbot1, pbot2, pbot3].forEach(
          (el, i) => {
            if (!el) return;

            setTimeout(() => {
              el.style.transition =
                "transform 1.1s cubic-bezier(.22,1,.36,1), opacity 0.7s ease";

              el.style.transform =
                "translateY(0)";

              el.style.opacity =
                "1";
            }, 100 + i * 150);
          }
        );
      }

      // CONTINUOUS PARALLAX
      if (photosRevealed) {
        const photoProgress =
          clamp(
            (progress - 0.1) /
              0.8,
            0,
            1
          );

        const topDrift =
          lerp(
            0,
            -50,
            photoProgress
          );

        const botDrift =
          lerp(
            0,
            50,
            photoProgress
          );

        if (ptop1)
          ptop1.style.transform =
            `translateY(${topDrift}px)`;

        if (ptop2)
          ptop2.style.transform =
            `translateY(${topDrift * 0.8}px)`;

        if (pbot1)
          pbot1.style.transform =
            `translateY(${botDrift}px)`;

        if (pbot2)
          pbot2.style.transform =
            `translateY(${botDrift * 1.2}px)`;

        if (pbot3)
          pbot3.style.transform =
            `translateY(${botDrift * 0.9}px)`;
      }
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    handleScroll();

    return () => {
      window.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);
}

export default useAboutAnimations;