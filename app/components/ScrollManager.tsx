"use client";

import { useEffect } from "react";

export default function ScrollManager() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");

      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        const id = anchor.hash.slice(1);
        const element = document.getElementById(id.toLowerCase());

        if (element) {
          e.preventDefault();
          const offset = 80; // Height of the fixed navbar
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });

          // Update URL without jumping
          window.history.pushState(null, "", `#${id}`);
        }
      }
    };

    window.addEventListener("click", handleAnchorClick);
    return () => window.removeEventListener("click", handleAnchorClick);
  }, []);

  return null;
}
