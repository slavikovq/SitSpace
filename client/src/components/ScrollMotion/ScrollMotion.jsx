import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const ScrollReveal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const elementPosition = document.getElementById("revealElement").offsetTop;
    
    if (scrollPosition > elementPosition) {
      setIsVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      id="revealElement"
      initial={{ opacity: 0, y: 50 }}   
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 2 }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
