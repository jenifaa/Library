import { useEffect, useRef, useCallback, useState } from "react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";

gsap.registerPlugin(Observer);

export default function Banner() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const slidesRef = useRef<HTMLDivElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const slideTexts = [
    {
      title: "Discover New Worlds",
      subtitle: "Explore our bestselling fiction collection",
      description: "Immerse yourself in captivating stories that transport you to different realms",
      cta: "Explore Collection"
    },
    {
      title: "Expand Your Knowledge",
      subtitle: "Non-fiction that inspires growth",
      description: "Learn from experts and transform your perspective with every page",
      cta: "Learn More"
    },
    {
      title: "Limited Time Offers",
      subtitle: "Special discounts on featured collections",
      description: "Get up to 40% off on our curated selection of must-read books",
      cta: "Shop Now"
    }
  ];

  const wrap = (min: number, max: number, value: number) => {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
  };

  const gotoSlide = useCallback((index: number) => {
    const nextIndex = wrap(0, slidesRef.current.length, index);
    setCurrentIndex(nextIndex);
    
    slidesRef.current.forEach((slide, i) => {
      if (i === nextIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });
  }, []);
  const navigate = useNavigate()

  useEffect(() => {
    if (!bodyRef.current) return;

    slidesRef.current = Array.from(
      bodyRef.current.querySelectorAll<HTMLDivElement>(".slide")
    );

  
    slidesRef.current[0].classList.add("active");

  
    const observer = Observer.create({
      target: bodyRef.current,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onUp: () => gotoSlide(currentIndex + 1),
      onDown: () => gotoSlide(currentIndex - 1),
      preventDefault: true,
    });

    // Keyboard navigation
    const handleKey = (e: KeyboardEvent) => {
      if (e.code === "ArrowDown" || e.code === "ArrowRight") {
        gotoSlide(currentIndex + 1);
      }
      if (e.code === "ArrowUp" || e.code === "ArrowLeft") {
        gotoSlide(currentIndex - 1);
      }
    };

    document.addEventListener("keydown", handleKey);

    // Auto-advance
    const interval = setInterval(() => {
      gotoSlide(currentIndex + 1);
    }, 5000);

    return () => {
      document.removeEventListener("keydown", handleKey);
      clearInterval(interval);
      observer.kill();
    };
  }, [currentIndex, gotoSlide]);

  return (
    <div ref={bodyRef} className="banner-container relative w-full h-[500px] overflow-hidden bg-gray-900">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10"></div>
      
      {/* Slides */}
      <div className="slide absolute inset-0 opacity-0 transition-opacity duration-1000">
        <div className="slide__container h-full flex items-center justify-center gap-8 px-12">
          <motion.img 
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="slide__img w-64 h-80 object-cover rounded-2xl shadow-2xl" 
            src="/src/assets/images/book1.jpg" 
            alt="Book 1" 
          />
          <motion.img 
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="slide__img w-72 h-96 object-cover rounded-2xl shadow-2xl" 
            src="/src/assets/images/book6.jpg" 
            alt="Book 6" 
          />
          <motion.img 
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="slide__img w-64 h-80 object-cover rounded-2xl shadow-2xl" 
            src="/src/assets/images/book3.jpg" 
            alt="Book 3" 
          />
        </div>
      </div>

      <div className="slide absolute inset-0 opacity-0 transition-opacity duration-1000">
        <div className="slide__container h-full flex items-center justify-center gap-8 px-12">
          <motion.img 
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="slide__img w-72 h-96 object-cover rounded-2xl shadow-2xl" 
            src="/src/assets/images/boo4.jpg" 
            alt="Book 4" 
          />
          <motion.img 
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="slide__img w-64 h-80 object-cover rounded-2xl shadow-2xl" 
            src="/src/assets/images/book5.jpg" 
            alt="Book 5" 
          />
          <motion.img 
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="slide__img w-72 h-96 object-cover rounded-2xl shadow-2xl" 
            src="/src/assets/images/book6.jpg" 
            alt="Book 6" 
          />
        </div>
      </div>

      <div className="slide absolute inset-0 opacity-0 transition-opacity duration-1000">
        <div className="slide__container h-full flex items-center justify-center gap-8 px-12">
          <motion.img 
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="slide__img w-64 h-80 object-cover rounded-2xl shadow-2xl" 
            src="/src/assets/images/book5.jpg" 
            alt="Book 5" 
          />
          <motion.img 
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="slide__img w-72 h-96 object-cover rounded-2xl shadow-2xl" 
            src="/src/assets/images/book3.jpg" 
            alt="Book 3" 
          />
          <motion.img 
            whileHover={{ scale: 1.05, y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="slide__img w-64 h-80 object-cover rounded-2xl shadow-2xl" 
            src="/src/assets/images/b6.jpg" 
            alt="Book 2" 
          />
        </div>
      </div>

    
      <div className="text-content absolute top-1/2 left-20 transform -translate-y-1/2 z-20 text-white max-w-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
           
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-6xl font-bold leading-tight"
            >
              {slideTexts[currentIndex].title}
            </motion.h2>

           
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-2xl text-blue-300 font-light tracking-wide"
            >
              {slideTexts[currentIndex].subtitle}
            </motion.h3>

           
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="text-xl text-gray-200 leading-relaxed font-light max-w-md"
            >
              {slideTexts[currentIndex].description}
            </motion.p>

          
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(37, 99, 235, 0.3)"
              }}
              onClick={()=>navigate("/books")}
              whileTap={{ scale: 0.95 }}
              className="cta-button bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg shadow-2xl"
            >
              {slideTexts[currentIndex].cta}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Counter */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 right-8 z-20 flex items-center space-x-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
      >
        <motion.span 
          key={currentIndex}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="count text-white text-2xl font-bold"
        >
          {currentIndex + 1}
        </motion.span>
        <span className="text-white/70 text-lg">/ {slidesRef.current.length}</span>
      </motion.div>

      {/* Navigation Arrows */}
      <motion.button 
        whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.6)" }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 text-white text-4xl bg-black/30 rounded-full w-14 h-14 flex items-center justify-center backdrop-blur-sm"
        onClick={() => gotoSlide(currentIndex - 1)}
      >
        ‹
      </motion.button>
      <motion.button 
        whileHover={{ scale: 1.1, backgroundColor: "rgba(0,0,0,0.6)" }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 text-white text-4xl bg-black/30 rounded-full w-14 h-14 flex items-center justify-center backdrop-blur-sm"
        onClick={() => gotoSlide(currentIndex + 1)}
      >
        ›
      </motion.button>

    
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full"
      >
        {[0, 1, 2].map((index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.3 }}
            whileTap={{ scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400 }}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-white' : 'bg-white/30'
            }`}
            onClick={() => gotoSlide(index)}
          />
        ))}
      </motion.div>
    </div>
  );
}