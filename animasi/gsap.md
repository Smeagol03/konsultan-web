Baik, berikut saya buatkan **SUPER PACK 40 Animasi GSAP Modern** yang bisa kamu jadikan **library animasi reusable** untuk semua project website kamu (landing page, UMKM, SaaS, portfolio, dll).

Semua hanya **contoh sederhana** supaya mudah kamu kembangkan.

---

# A. BASIC ENTRANCE ANIMATION

## 1. fadeUp

```javascript
gsap.from(".fade-up", {
  y: 60,
  opacity: 0,
  duration: 0.8,
});
```

## 2. fadeDown

```javascript
gsap.from(".fade-down", {
  y: -60,
  opacity: 0,
  duration: 0.8,
});
```

## 3. fadeLeft

```javascript
gsap.from(".fade-left", {
  x: -80,
  opacity: 0,
});
```

## 4. fadeRight

```javascript
gsap.from(".fade-right", {
  x: 80,
  opacity: 0,
});
```

## 5. fadeIn

```javascript
gsap.from(".fade-in", {
  opacity: 0,
  duration: 1,
});
```

---

# B. SCALE & ROTATION

## 6. scaleIn

```javascript
gsap.from(".scale-in", {
  scale: 0.8,
  opacity: 0,
});
```

## 7. scaleUp

```javascript
gsap.from(".scale-up", {
  scale: 0,
  duration: 0.8,
});
```

## 8. rotateIn

```javascript
gsap.from(".rotate-in", {
  rotation: -15,
  opacity: 0,
});
```

## 9. flipIn

```javascript
gsap.from(".flip-in", {
  rotationY: 90,
  opacity: 0,
});
```

---

# C. TEXT ANIMATION (TREND 2026)

## 10. textSlideUp

```javascript
gsap.from(".text-slide-up", {
  yPercent: 100,
  duration: 1,
});
```

## 11. textSlideLeft

```javascript
gsap.from(".text-slide-left", {
  xPercent: -100,
});
```

## 12. textFadeWord

```javascript
gsap.from(".text-word span", {
  opacity: 0,
  stagger: 0.1,
});
```

HTML

```html
<h1 class="text-word">
  <span>Hello</span>
  <span>World</span>
</h1>
```

---

# D. STAGGER ANIMATION

## 13. staggerCards

```javascript
gsap.from(".card", {
  y: 40,
  opacity: 0,
  stagger: 0.2,
});
```

## 14. staggerList

```javascript
gsap.from(".list-item", {
  x: -40,
  opacity: 0,
  stagger: 0.1,
});
```

## 15. staggerGrid

```javascript
gsap.from(".grid-item", {
  scale: 0.8,
  opacity: 0,
  stagger: 0.15,
});
```

---

# E. SCROLL ANIMATION

## 16. scrollReveal

```javascript
gsap.registerPlugin(ScrollTrigger);

gsap.from(".scroll-reveal", {
  y: 80,
  opacity: 0,
  scrollTrigger: {
    trigger: ".scroll-reveal",
    start: "top 80%",
  },
});
```

## 17. scrollZoom

```javascript
gsap.from(".scroll-zoom", {
  scale: 1.3,
  scrollTrigger: ".scroll-zoom",
});
```

## 18. scrollRotate

```javascript
gsap.to(".scroll-rotate", {
  rotation: 360,
  scrollTrigger: {
    scrub: true,
  },
});
```

---

# F. PARALLAX (VERY TRENDING)

## 19. parallaxSlow

```javascript
gsap.to(".parallax-slow", {
  y: 200,
  scrollTrigger: {
    scrub: true,
  },
});
```

## 20. parallaxFast

```javascript
gsap.to(".parallax-fast", {
  y: 400,
  scrollTrigger: {
    scrub: true,
  },
});
```

---

# G. IMAGE ANIMATION

## 21. imageZoomReveal

```javascript
gsap.from(".img-zoom", {
  scale: 1.2,
  duration: 1,
});
```

## 22. imageSlide

```javascript
gsap.from(".img-slide", {
  x: -120,
});
```

## 23. imageMaskReveal

```javascript
gsap.from(".img-mask", {
  clipPath: "inset(0 100% 0 0)",
});
```

---

# H. HOVER EFFECT

## 24. cardHoverLift

```javascript
gsap.to(".card", {
  y: -10,
  paused: true,
});
```

## 25. buttonHoverScale

```javascript
gsap.to(".btn", {
  scale: 1.05,
  paused: true,
});
```

## 26. imageHoverZoom

```javascript
gsap.to(".img-hover", {
  scale: 1.1,
  paused: true,
});
```

---

# I. LOOP / CONTINUOUS ANIMATION

## 27. floating

```javascript
gsap.to(".floating", {
  y: -20,
  repeat: -1,
  yoyo: true,
});
```

## 28. pulse

```javascript
gsap.to(".pulse", {
  scale: 1.1,
  repeat: -1,
  yoyo: true,
});
```

## 29. rotateLoop

```javascript
gsap.to(".rotate-loop", {
  rotation: 360,
  repeat: -1,
  ease: "linear",
});
```

---

# J. ADVANCED MODERN UI

## 30. marquee

```javascript
gsap.to(".marquee", {
  xPercent: -100,
  repeat: -1,
  ease: "linear",
});
```

## 31. horizontalScroll

```javascript
gsap.to(".horizontal", {
  xPercent: -300,
  scrollTrigger: {
    pin: true,
    scrub: true,
  },
});
```

## 32. magneticButton

```javascript
document.addEventListener("mousemove", (e) => {
  gsap.to(".magnetic", {
    x: e.clientX * 0.02,
    y: e.clientY * 0.02,
  });
});
```

---

# K. MODERN SCROLL EFFECT

## 33. stackedCards

```javascript
gsap.to(".card-stack", {
  y: -100,
  scrollTrigger: {
    scrub: true,
  },
});
```

## 34. revealSection

```javascript
gsap.from(".section", {
  opacity: 0,
  y: 100,
});
```

## 35. progressBar

```javascript
gsap.to(".progress", {
  width: "100%",
  scrollTrigger: {
    scrub: true,
  },
});
```

---

# L. CURSOR EFFECT

## 36. cursorFollow

```javascript
document.addEventListener("mousemove", (e) => {
  gsap.to(".cursor", {
    x: e.clientX,
    y: e.clientY,
  });
});
```

---

# M. COOL MICRO ANIMATION

## 37. wiggle

```javascript
gsap.to(".wiggle", {
  rotation: 5,
  repeat: -1,
  yoyo: true,
});
```

## 38. bounce

```javascript
gsap.to(".bounce", {
  y: -20,
  repeat: -1,
  yoyo: true,
});
```

## 39. shake

```javascript
gsap.to(".shake", {
  x: 5,
  repeat: -1,
  yoyo: true,
});
```

---

# N. HERO SECTION EFFECT

## 40. heroReveal

```javascript
gsap
  .timeline()
  .from(".hero-title", { y: 80, opacity: 0 })
  .from(".hero-desc", { y: 40, opacity: 0 })
  .from(".hero-btn", { scale: 0.8, opacity: 0 });
```

---

# Struktur Folder Animasi yang Ideal

Untuk project kamu kedepannya:

```
animations

basic.js
scroll.js
hover.js
text.js
parallax.js
cursor.js
hero.js
```

---

# Rekomendasi Animasi Untuk Website UMKM (Client Kamu)

Hero:

- heroReveal
- imageZoomReveal

Service:

- staggerCards

Gallery:

- imageMaskReveal

Testimoni:

- fadeUp

CTA Button:

- buttonHoverScale

---
