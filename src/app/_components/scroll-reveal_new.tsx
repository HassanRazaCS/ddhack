"use client";

import { useEffect } from "react";

export function ScrollReveal() {
  useEffect(() => {
    // IMMEDIATE REVEAL - BOSS DEMANDS IT LOADS RIGHT AWAY!
    const revealElements = () => {
      const elements = document.querySelectorAll('.scroll-reveal');
      elements.forEach((element, index) => {
        // Remove hidden class immediately for instant display
        element.classList.remove('hidden');
        element.classList.add('revealed');
        
        // Add staggered animation with immediate start
        setTimeout(() => {
          element.style.transform = 'translateY(0) rotateX(0deg)';
          element.style.opacity = '1';
        }, index * 100); // Quick stagger
      });
    };

    // INSTANT REVEAL ON PAGE LOAD
    setTimeout(revealElements, 50);

    // Enhanced scroll detection for lamp pulsing
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const lamps = document.querySelectorAll('.lamp-light');
      
      if (!isScrolling) {
        lamps.forEach(lamp => {
          lamp.classList.add('lamp-fast-pulse');
        });
        isScrolling = true;
      }

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        lamps.forEach(lamp => {
          lamp.classList.remove('lamp-fast-pulse');
        });
        isScrolling = false;
      }, 200);

      // Additional scroll reveals for elements that come into view
      const elements = document.querySelectorAll('.scroll-reveal:not(.revealed)');
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible) {
          element.classList.add('revealed');
          element.classList.remove('hidden');
        }
      });
    };

    // Enhanced magnetic button effects
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    
    magneticButtons.forEach(button => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = 100;
        
        if (distance < maxDistance) {
          const strength = (maxDistance - distance) / maxDistance;
          const moveX = (x / distance) * strength * 15;
          const moveY = (y / distance) * strength * 15;
          
          (button as HTMLElement).style.transform = `
            translate(${moveX}px, ${moveY}px) 
            scale(${1 + strength * 0.1}) 
            rotateX(${moveY * 0.5}deg) 
            rotateY(${moveX * 0.5}deg)
          `;
        }
      };
      
      const handleMouseLeave = () => {
        (button as HTMLElement).style.transform = 'translate(0px, 0px) scale(1) rotateX(0deg) rotateY(0deg)';
      };
      
      button.addEventListener('mousemove', handleMouseMove);
      button.addEventListener('mouseleave', handleMouseLeave);
    });

    // Enhanced lamp brightness on hover
    const enhanceLamps = () => {
      const lamps = document.querySelectorAll('.lamp-light');
      lamps.forEach(lamp => {
        lamp.addEventListener('mouseenter', () => {
          lamp.classList.add('lamp-fast-pulse');
        });
        lamp.addEventListener('mouseleave', () => {
          lamp.classList.remove('lamp-fast-pulse');
        });
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    enhanceLamps();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return null;
}
