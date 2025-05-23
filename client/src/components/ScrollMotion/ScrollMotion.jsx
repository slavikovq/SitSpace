import React from 'react';
import { useInView } from 'react-intersection-observer';
import '../../scss/main-style.scss'; 

export default function ScrollMotion({ children }) {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.2,
  });

  return (
    <div
      ref={ref}
      className={`scroll-animation ${inView ? 'animate' : ''}`}
    >
      {children}
    </div>
  );
};
