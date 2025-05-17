import React, { useEffect, useRef } from 'react';
import { Shield, Lock, Check, Zap, Network, Globe2 } from 'lucide-react';

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
            The First Cross-Chain <span className="gradient-text">Mental Health DAO</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 fade-in" style={{ transitionDelay: '200ms' }}>
            Powered by LayerZero and Solana, SyncedSelf revolutionizes mental health support through decentralized governance, cross-chain accessibility, and the $SYNCED token economy.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12 fade-in" style={{ transitionDelay: '400ms' }}>
            <button className="btn-primary">Join SyncedSelf Today</button>
            <button className="btn-secondary">Learn More</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-12 fade-in" style={{ transitionDelay: '600ms' }}>
            <div className="bg-white p-6 rounded-xl card-shadow">
              <div className="bg-teal-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Network className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Cross-Chain Access</h3>
              <p className="text-gray-600">Seamlessly access therapy services across multiple blockchains via LayerZero.</p>
            </div>
            <div className="bg-white p-6 rounded-xl card-shadow">
              <div className="bg-purple-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">$SYNCED Token</h3>
              <p className="text-gray-600">Governance token for platform decisions and therapy payments.</p>
            </div>
            <div className="bg-white p-6 rounded-xl card-shadow">
              <div className="bg-blue-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Globe2 className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">DAO Governance</h3>
              <p className="text-gray-600">Community-driven decisions on platform development and therapist onboarding.</p>
            </div>
            <div className="bg-white p-6 rounded-xl card-shadow">
              <div className="bg-emerald-100 p-3 rounded-full w-fit mx-auto mb-4">
                <Shield className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Solana Powered</h3>
              <p className="text-gray-600">Fast, low-cost transactions on Solana's high-performance network.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;