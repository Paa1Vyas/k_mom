import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Heart, Flower, Music, Volume2, VolumeX, X } from 'lucide-react';
import confetti from 'canvas-confetti';

// Floating Particle Component
const FloatingParticle = ({ type }) => {
  const [style, setStyle] = useState({});
  const isUp = type === 'butterfly';

  useEffect(() => {
    const x = Math.random() * 100;
    const duration = 10 + Math.random() * 20;
    const size = 15 + Math.random() * 25;
    const delay = Math.random() * 10;
    
    setStyle({
      '--x': `${(Math.random() - 0.5) * 400}px`,
      '--r': `${Math.random() * 720}deg`,
      left: `${x}%`,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      fontSize: `${size}px`,
      opacity: 0.3 + Math.random() * 0.4
    });
  }, []);

  return (
    <div className={`floating-particle ${isUp ? 'particle-up' : 'particle-down'}`} style={style}>
      {type === 'heart' ? '❤️' : type === 'flower' ? '🌸' : type === 'butterfly' ? '🦋' : '✨'}
    </div>
  );
};

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleCelebrate = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 3000 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: ['#FFB7C5', '#E6E6FA', '#FFF0F5']
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: ['#FFB7C5', '#E6E6FA', '#FFF0F5']
      });
    }, 250);
  };

  const images = [
    '/images/img1.jpeg',
    '/images/image_.jpeg',
    '/images/image_2.jpeg',
    '/images/image_3.jpeg',
    '/images/image_4.jpeg',
    '/images/image_5.jpeg',
    '/images/image_7.jpeg',
    '/images/image_8.jpeg',
    '/images/image_9.jpeg',
  ];

  const particles = Array.from({ length: 40 }).map((_, i) => (
    <FloatingParticle 
      key={i} 
      type={i % 4 === 0 ? 'heart' : i % 4 === 1 ? 'flower' : i % 4 === 2 ? 'butterfly' : 'sparkle'} 
    />
  ));

  return (
    <div className="app-container">
      {/* Progress Bar */}
      <motion.div className="progress-bar" style={{ 
        scaleX, 
        position: 'fixed', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: '6px', 
        background: 'var(--primary-pink)', 
        transformOrigin: '0%',
        zIndex: 1000 
      }} />

      {/* Floating Particles Background */}
      {particles}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div 
              className="lightbox-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <img src={selectedImage} alt="Large memory" className="lightbox-image" />
              <button 
                className="glass"
                style={{
                  position: 'absolute',
                  top: '-50px',
                  right: '0',
                  padding: '10px',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedImage(null)}
              >
                <X size={24} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Music Toggle */}
      <button 
        onClick={() => setIsPlaying(!isPlaying)}
        className="glass"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          zIndex: 100,
          padding: '15px',
          cursor: 'pointer',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          color: 'var(--deep-plum)'
        }}
      >
        {isPlaying ? <Volume2 size={24} /> : <VolumeX size={24} />}
        <span style={{ fontWeight: 'bold' }}>{isPlaying ? 'Music On' : 'Music Off'}</span>
      </button>

      {/* Hero Section */}
      <section className="hero">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ cursor: 'pointer' }}
          onClick={handleCelebrate}
          whileHover={{ scale: 1.05 }}
        >
          <h1 className="hero-title">Happy Mother’s Day ❤️</h1>
          <p className="hero-subtitle">For The Best Mom Ever</p>
          <p style={{ marginTop: '10px', opacity: 0.6, fontSize: '0.9rem' }}>(Click to celebrate! ✨)</p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ marginTop: '40px' }}
        >
          <a href="#memories" style={{ textDecoration: 'none' }}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="glass"
              style={{
                padding: '15px 40px',
                fontSize: '1.2rem',
                border: 'none',
                color: 'var(--deep-plum)',
                cursor: 'pointer',
                fontFamily: 'Playfair Display, serif',
                fontWeight: 'bold'
              }}
            >
              Explore Memories
            </motion.button>
          </a>
        </motion.div>
      </section>

      {/* Memories Section */}
      <section id="memories">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Beautiful Memories
        </motion.h2>

        <div className="gallery-grid">
          {images.map((src, index) => (
            <motion.div
              key={index}
              className="gallery-card glass"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedImage(src)}
              style={{ cursor: 'pointer' }}
            >
              <img src={src} alt={`Memory ${index + 1}`} />
              <div className="card-overlay">
                <Heart fill="white" size={24} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Sweet Note Section */}
      <section id="note">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          A Sweet Note
        </motion.h2>
        
        <div className="note-container">
          <motion.div 
            className="note-card"
            initial={{ rotate: -5, opacity: 0, scale: 0.9 }}
            whileInView={{ rotate: -1, opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)' }}>
              <Flower size={60} color="var(--primary-pink)" />
            </div>
            
            <p className="note-text">
              “Thank you for every hug, every sacrifice, and every smile you gave me. 
              You are my first home, my forever comfort, and my biggest blessing. 
              I love you forever, Mom ❤️”
            </p>
            
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ marginTop: '20px' }}
            >
              <Heart fill="var(--primary-pink)" stroke="none" size={40} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Animated Signature Section */}
      <section className="signature-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p style={{ fontSize: '1.5rem', marginBottom: '10px' }}>With love always,</p>
          <div className="signature-text">
             kisu and misu
          </div>
          <div style={{ marginTop: '20px' }}>
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              ❤️
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Made with Love for Mom <span className="heart-footer">💖</span>
        </motion.p>
      </footer>
    </div>
  );
}

export default App;
