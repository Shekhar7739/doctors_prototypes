import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, MeshDistortMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { HeartPulse, Stethoscope, Activity, Calendar, ArrowRight, Phone, Mail, Clock, Star, MapPin, Facebook, Twitter, Linkedin, Instagram, Menu, X } from 'lucide-react';
import PatientDashboard from './PatientDashboard';

function AnimatedCell() {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial 
          color="#2563EB" 
          attach="material" 
          distort={0.4} 
          speed={2} 
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </Float>
  );
}

function Hero3D() {
  return (
    <div className="hero-3d-container">
      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <AnimatedCell />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}

function BookingModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={24} /></button>
        <h2>Book an Appointment</h2>
        <p>Please fill out the form below and our team will contact you to confirm.</p>
        <form onSubmit={(e) => { 
          e.preventDefault(); 
          alert("Booking request sent successfully! Our team will contact you shortly to confirm your appointment."); 
          onClose(); 
        }}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" required placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" required placeholder="john@example.com" />
          </div>
          <div className="form-group">
            <label>Preferred Date</label>
            <input type="date" required />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}>
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}

function LoginModal({ isOpen, onClose, onLogin }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}><X size={24} /></button>
        <h2>Patient Portal Login</h2>
        <p>Access your medical records, test results, and upcoming appointments.</p>
        <form onSubmit={(e) => { 
          e.preventDefault(); 
          alert("Logged in successfully! Welcome to your dashboard."); 
          onLogin();
          onClose(); 
        }}>
          <div className="form-group">
            <label>Email Address</label>
            <input type="email" required placeholder="patient@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" required placeholder="••••••••" />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}>
            Login to Portal
          </button>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentView, setCurrentView] = useState('landing');

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing to our newsletter! You will receive heart health tips shortly.");
    e.target.reset();
  };

  if (currentView === 'dashboard') {
    return <PatientDashboard onLogout={() => { setIsLoggedIn(false); setCurrentView('landing'); }} />;
  }

  return (
    <div className="app-container">
      {/* Booking Modal Prototype */}
      <AnimatePresence>
        {isBookingModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-wrapper">
             <BookingModal isOpen={isBookingModalOpen} onClose={() => setIsBookingModalOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal Prototype */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="modal-wrapper">
             <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} onLogin={() => { setIsLoggedIn(true); setCurrentView('dashboard'); }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <HeartPulse color="#2563EB" size={28} />
            <span>Dr. Smith</span>
          </div>
          
          <div className={`nav-links ${isMobileMenuOpen ? 'active' : ''}`}>
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)}>About</a>
            <a href="#specialties" onClick={() => setIsMobileMenuOpen(false)}>Specialties</a>
            <a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)}>Testimonials</a>
            {isLoggedIn ? (
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <button className="btn-secondary" style={{padding: '0.6rem 1.2rem', fontSize: '0.95rem'}} onClick={() => { setIsMobileMenuOpen(false); setCurrentView('dashboard'); }}>My Dashboard</button>
                <button className="btn-secondary" style={{padding: '0.6rem 1.2rem', fontSize: '0.95rem'}} onClick={() => { setIsMobileMenuOpen(false); setIsLoggedIn(false); setCurrentView('landing'); }}>Logout</button>
              </div>
            ) : (
              <button className="btn-secondary" style={{padding: '0.6rem 1.2rem', fontSize: '0.95rem'}} onClick={() => { setIsMobileMenuOpen(false); setIsLoginModalOpen(true); }}>Patient Login</button>
            )}
            <button className="btn-primary-small" onClick={() => { setIsMobileMenuOpen(false); setIsBookingModalOpen(true); }}>Book Now</button>
          </div>

          <div className="hamburger" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={28} color="#0F172A" /> : <Menu size={28} color="#0F172A" />}
          </div>
        </div>
      </nav>

      {/* Schedule Strip */}
      <div className="schedule-strip">
        <div className="schedule-strip-content">
          <span><Clock size={14} /> Mon-Fri: 8:00 AM - 6:00 PM</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h2 className="subtitle">Specialist Cardiologist</h2>
            <h1 className="title">Advanced Care for a Healthier Heart.</h1>
            <p className="description">
              Combining cutting-edge medical technology with compassionate care to provide you with the best cardiovascular health outcomes.
            </p>
            <div className="hero-buttons">
              <button className="btn-primary" onClick={() => setIsBookingModalOpen(true)}>
                Book Consultation <ArrowRight size={20} />
              </button>
              <a href="#specialties" style={{textDecoration: 'none'}}>
                <button className="btn-secondary">Our Services</button>
              </a>
            </div>
          </motion.div>
          <div className="hero-visual">
            <Hero3D />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="about-content">
          <motion.div 
            className="about-image-wrapper"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img src="https://images.unsplash.com/photo-1612349317150-e410f624c427?auto=format&fit=crop&q=80&w=600" alt="Dr. Smith Profile" className="about-image" />
            <div className="experience-badge">
              <h3>15+</h3>
              <p>Years<br/>Experience</p>
            </div>
          </motion.div>

          <motion.div 
            className="about-text"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="subtitle">About The Doctor</h2>
            <h3 className="section-title">Dedicated to Your Heart's Health</h3>
            <p>With over 15 years of experience in interventional cardiology, Dr. Smith is dedicated to providing compassionate, state-of-the-art cardiovascular care. He completed his residency at Johns Hopkins and is board-certified in both Internal Medicine and Cardiovascular Disease.</p>
            <p>Our practice believes in a patient-first approach, ensuring that every individual receives a personalized treatment plan designed for long-term heart health.</p>
            
            <div className="about-stats-new">
              <div className="stat-item">
                <h4>5k+</h4>
                <p>Happy Patients</p>
              </div>
              <div className="stat-item">
                <h4>3</h4>
                <p>Board Certifications</p>
              </div>
              <div className="stat-item">
                <h4>12</h4>
                <p>Awards Won</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="specialties" className="services">
        <div className="section-header">
          <h2 className="subtitle text-center">Areas of Expertise</h2>
          <h3 className="section-title text-center">Comprehensive Cardiovascular Services</h3>
        </div>
        <div className="services-grid">
          {[
            { title: "Cardiac Screening", icon: <Activity size={32} />, desc: "Comprehensive evaluation of heart health using state-of-the-art diagnostic tools." },
            { title: "Interventional Cardiology", icon: <HeartPulse size={32} />, desc: "Minimally invasive procedures to treat coronary artery disease and structural heart conditions." },
            { title: "Preventative Care", icon: <Stethoscope size={32} />, desc: "Personalized lifestyle and medical strategies to prevent heart disease before it starts." }
          ].map((service, idx) => (
            <motion.div 
              key={idx}
              className="service-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              whileHover={{ y: -5 }}
            >
              <div className="icon-wrapper">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Clinic Gallery */}
      <section className="gallery">
        <div className="section-header">
          <h2 className="subtitle text-center">Our Facilities</h2>
          <h3 className="section-title text-center">State-of-the-Art Clinic</h3>
        </div>
        <div className="gallery-grid">
          {[
            { src: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800", alt: "Clinic reception" },
            { src: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=800", alt: "Medical equipment" },
            { src: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80&w=800", alt: "Hospital hallway" },
            { src: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800", alt: "Consultation room" },
            { src: "https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800", alt: "Waiting area" },
            { src: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800", alt: "Operation theater" }
          ].map((img, idx) => (
            <motion.img 
               key={idx}
               src={img.src} 
               alt={img.alt}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               whileHover={{ scale: 1.03 }}
               transition={{ duration: 0.5, delay: idx * 0.1 }}
               className="gallery-image"
            />
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="testimonials">
        <div className="section-header">
          <h2 className="subtitle text-center">Patient Stories</h2>
          <h3 className="section-title text-center">What Our Patients Say</h3>
        </div>
        <div className="testimonials-grid">
          {[
            { name: "Sarah Johnson", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150", text: "Dr. Smith took the time to explain everything clearly. I felt completely at ease during my procedure." },
            { name: "Michael Chen", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150", text: "The clinic staff is incredibly professional and the level of care is unmatched. Highly recommend!" },
            { name: "Emily Davis", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150", text: "State-of-the-art facility with a doctor who genuinely cares about his patients' well-being." }
          ].map((testimonial, idx) => (
            <motion.div 
              key={idx}
              className="testimonial-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
            >
              <div className="rating">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#eab308" color="#eab308" />)}
              </div>
              <p className="testimonial-text">"{testimonial.text}"</p>
              <div className="patient-info">
                <img src={testimonial.image} alt={testimonial.name} />
                <span>{testimonial.name}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer / CTA */}
      <footer className="footer">
        <div className="footer-content">
          <div className="cta-box">
            <h2>Ready to prioritize your heart health?</h2>
            <button className="btn-primary btn-large mx-auto" onClick={() => setIsBookingModalOpen(true)}>
              <Calendar size={20} style={{marginRight: '8px'}} /> Schedule an Appointment
            </button>
          </div>
          
          <div className="footer-main">
            <div className="footer-col">
              <div className="logo footer-logo">
                <HeartPulse color="#2563EB" size={28} />
                <span>Dr. Smith</span>
              </div>
              <p className="footer-desc">Providing advanced cardiovascular care with a patient-first approach. Your health is our priority.</p>
              <div className="social-links">
                <a href="#"><Facebook size={20} /></a>
                <a href="#"><Twitter size={20} /></a>
                <a href="#"><Linkedin size={20} /></a>
                <a href="#"><Instagram size={20} /></a>
              </div>
            </div>
            
            <div className="footer-col">
              <h3>Quick Links</h3>
              <a href="#about">About Us</a>
              <a href="#specialties">Specialties</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#">Contact</a>
            </div>
            
            <div className="footer-col">
              <h3>Contact Info</h3>
              <p className="contact-item"><MapPin size={16} /> 123 Medical Center Drive, NY 10001</p>
              <p className="contact-item"><Phone size={16} /> +1 (555) 123-4567</p>
              <p className="contact-item"><Mail size={16} /> info@drsmithclinic.com</p>
            </div>
            
            <div className="footer-col">
              <h3>Newsletter</h3>
              <p className="footer-desc">Subscribe to our newsletter for heart health tips.</p>
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <input type="email" placeholder="Your email address" required />
                <button type="submit" className="btn-primary-small">Subscribe</button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 Dr. Smith Medical Portfolio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
