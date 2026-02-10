"use client";

import { useEffect, useState } from "react";

export function useScroll(sectionHashes: string[]) {
  const [activeHash, setActiveHash] = useState<string>("");

  useEffect(() => {
    if (!sectionHashes?.length) return;

    const observers: IntersectionObserver[] = [];

    sectionHashes.forEach((hash) => {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${id}`);
          }
        },
        {
          rootMargin: "-40% 0px -50% 0px",
          threshold: 0,
        },
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => {
      observers.forEach((o) => o.disconnect());
    };
  }, [sectionHashes]);

  return activeHash;
}
