import { useEffect, useRef } from 'react';

const FadeInAnimation = ({ children, duration = 1000, delay = 0 }) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '34px 0px' // This will trigger the animation 50px before the element comes into view
      }
    );

    const element = elementRef.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div
      ref={elementRef}
      style={{
        opacity: 0,
        transform: 'translateY(20px)',
        transition: `all ${duration}ms ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeInAnimation;
