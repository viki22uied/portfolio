import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export function useGsapSectionReveal(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".section-reveal").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
            },
          }
        );
      });
    }, document.body);

    return () => {
      ctx.revert();
    };
  }, [enabled]);
}
