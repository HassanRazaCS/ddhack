'use client';

import { useEffect } from 'react';

export function ScrollReveal() {
  useEffect(() => {
    // Intersection Observer for scroll reveal animations
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Observe all elements with scroll-reveal class
    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));

    // Enhanced lamp pulsing on scroll
    const lampElements = document.querySelectorAll('.animate-lamp-glow');
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollSpeed = Math.abs(currentScrollY - lastScrollY);
          
          if (scrollSpeed > 30) {
            lampElements.forEach(lamp => {
              lamp.classList.remove('animate-lamp-glow');
              lamp.classList.add('animate-lamp-glow-fast');
              
              // Return to normal after 2 seconds
              setTimeout(() => {
                lamp.classList.remove('animate-lamp-glow-fast');
                lamp.classList.add('animate-lamp-glow');
              }, 2000);
            });
          }
          
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Magnetic button effect
    const magneticButtons = document.querySelectorAll('.magnetic-btn');
    
    magneticButtons.forEach((btn) => {
      const button = btn as HTMLElement;
      
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const distance = Math.sqrt(x * x + y * y);
        const maxDistance = Math.max(rect.width, rect.height);
        
        if (distance < maxDistance) {
          const strength = (maxDistance - distance) / maxDistance;
          const moveX = (x / maxDistance) * 20 * strength;
          const moveY = (y / maxDistance) * 20 * strength;
          
          button.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
        }
      });
      
      button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0px, 0px) scale(1)';
      });
    });

    // Cleanup function
    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return null;
}
