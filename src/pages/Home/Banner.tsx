import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

gsap.registerPlugin(Observer);

export default function Banner() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const countRef = useRef<HTMLSpanElement | null>(null);
  let currentIndex = 0;
  let animating = false;

  const wrap = (min: number, max: number, value: number) => {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
  };

useEffect(() => {
  if (!bodyRef.current) return;

  slidesRef.current = Array.from(
    bodyRef.current.querySelectorAll<HTMLDivElement>(".slide")
  );

  countRef.current = bodyRef.current.querySelector(".count");

  slidesRef.current[0].classList.add("active");

  const gotoSlide = (index: number) => {
    if (animating) return;
    animating = true;
    const nextIndex = wrap(0, slidesRef.current.length, index);

    slidesRef.current.forEach((s) => s.classList.remove("active"));
    slidesRef.current[nextIndex].classList.add("active");

    gsap.fromTo(
      slidesRef.current[nextIndex],
      { autoAlpha: 0, y: 50 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: () => (animating = false),
      }
    );

    if (countRef.current) countRef.current.textContent = `${nextIndex + 1}`;
    currentIndex = nextIndex;
  };

  
  Observer.create({
    target: bodyRef.current, 
    type: "wheel,touch,pointer",
    wheelSpeed: -1,
    onUp: () => gotoSlide(currentIndex + 1),
    onDown: () => gotoSlide(currentIndex - 1),
    preventDefault: true,
  });

  const handleKey = (e: KeyboardEvent) => {
    if (e.code === "ArrowDown" || e.code === "ArrowRight")
      gotoSlide(currentIndex + 1);
    if (e.code === "ArrowUp" || e.code === "ArrowLeft")
      gotoSlide(currentIndex - 1);
  };

  document.addEventListener("keydown", handleKey);
  return () => document.removeEventListener("keydown", handleKey);
}, []);

  return (
    <div ref={bodyRef} className="body mt-4 w-10/12 mx-auto">
   

      <div className="slide">
        <div className="slide__container">
          <img className="slide__img" src="/src/assets/images/book1.jpg" />
          <img className="slide__img" src="/src/assets/images/book6.jpg" />
          <img className="slide__img" src="/src/assets/images/book3.jpg" />
        </div>
      </div>

      <div className="slide ">
        <div className="slide__container">
          <img className="slide__img" src="/src/assets/images/boo4.jpg" />
          <img className="slide__img" src="/src/assets/images/book5.jpg" />
          <img className="slide__img" src="/src/assets/images/book6.jpg" />
        </div>
      </div>

      <div className="slide">
        <div className="slide__container">
          <img className="slide__img" src="/src/assets/images/book5.jpg" />
          <img className="slide__img" src="/src/assets/images/book3.jpg" />
          <img className="slide__img" src="/src/assets/images/book2.webp" />
        </div>
      </div>
    </div>
  );
}
