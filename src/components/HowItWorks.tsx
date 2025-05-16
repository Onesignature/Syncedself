import React, { useEffect, useRef } from 'react';
import { UserCircle, Search, MessageCircle, BadgeCheck } from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  number: number;
  title: string;
  description: string;
  delay: string;
}

const Step: React.FC<StepProps> = ({ icon, number, title, description, delay }) => {
  return (
    <div className="flex flex-col items-center text-center fade-in" style={{ transitionDelay: delay }}>
      <div className="bg-white p-4 rounded-full card-shadow mb-6 relative">
        <div className="gradient-bg rounded-full text-white w-8 h-8 flex items-center justify-center text-sm font-bold absolute -top-2 -right-2">
          {number}
        </div>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 max-w-xs mx-auto">{description}</p>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

    const sectionElement = sectionRef.current;
    if (sectionElement) {
      const fadeElements = sectionElement.querySelectorAll('.fade-in');
      fadeElements.forEach(el => observer.observe(el));
    }

    return () => {
      if (sectionElement) {
        const fadeElements = sectionElement.querySelectorAll('.fade-in');
        fadeElements.forEach(el => observer.unobserve(el));
      }
    };
  }, []);

  return (
    <section id="how-it-works" ref={sectionRef} className="py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-heading fade-in">How SyncedSelf Works</h2>
          <p className="section-subheading fade-in" style={{ transitionDelay: '100ms' }}>
            Getting started with decentralized therapy is simple and secure.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-purple-500 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
            <Step
              icon={<UserCircle className="h-10 w-10 text-teal-600" />}
              number={1}
              title="Create Your Profile"
              description="Set up your secure, self-sovereign identity on the blockchain."
              delay="200ms"
            />
            <Step
              icon={<Search className="h-10 w-10 text-teal-600" />}
              number={2}
              title="Find Your Match"
              description="Browse verified therapists and find the perfect match for your needs."
              delay="400ms"
            />
            <Step
              icon={<MessageCircle className="h-10 w-10 text-teal-600" />}
              number={3}
              title="Connect Securely"
              description="Engage in encrypted sessions via text, audio, or video."
              delay="600ms"
            />
            <Step
              icon={<BadgeCheck className="h-10 w-10 text-teal-600" />}
              number={4}
              title="Track Progress"
              description="Monitor your mental health journey with blockchain-verified records."
              delay="800ms"
            />
          </div>
        </div>

        <div className="mt-16 text-center fade-in" style={{ transitionDelay: '1000ms' }}>
          <button className="btn-primary">Get Started Now</button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;