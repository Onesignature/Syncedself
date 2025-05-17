import React, { useEffect, useRef } from 'react';
import { Shield, Lock, Check } from 'lucide-react';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('appear');
          }
        });
      },
      { threshold: 0.1 }
    );

    const heroElement = heroRef.current;
    if (heroElement) {
      const fadeElements = heroElement.querySelectorAll('.fade-in');
      fadeElements.forEach(el => observer.observe(el));
    }

    return () => {
      if (heroElement) {
        const fadeElements = heroElement.querySelectorAll('.fade-in');
        fadeElements.forEach(el => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section 
      ref={heroRef}
      className="pt-28 pb-20 md:pt-32 md:pb-24 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-purple-50 z-0"></div>
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 fade-in">
            Welcome to <span className="gradient-text">SyncedSelf</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 fade-in" style={{ transitionDelay: '200ms' }}>
            Experience the future of mental health support with SyncedSelf. Our blockchain-powered platform ensures your journey is private, secure, and completely on your terms.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 fade-in" style={{ transitionDelay: '400ms' }}>
            <button className="btn-primary">Join SyncedSelf Today</button>
            <button className="btn-secondary">Learn More</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 fade-in" style={{ transitionDelay: '600ms' }}>
            <div className="bg-white p-6 rounded-xl card-shadow">
              <div className="bg-teal-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Shield className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">SyncedSelf Security</h3>
              <p className="text-gray-600">Your data on SyncedSelf is encrypted and only accessible by you.</p>
            </div>
            <div className="bg-white p-6 rounded-xl card-shadow">
              <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Lock className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Decentralized Care</h3>
              <p className="text-gray-600">SyncedSelf ensures no central authority controls your health information.</p>
            </div>
            <div className="bg-white p-6 rounded-xl card-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Check className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">SyncedSelf Verified</h3>
              <p className="text-gray-600">Our blockchain technology ensures verifiable therapy credentials.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;