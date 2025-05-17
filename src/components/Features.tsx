import React, { useEffect, useRef } from 'react';
import { Shield, Users, Lock, Sparkles, Clock, Banknote, Network, Vote } from 'lucide-react';

const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: string;
}> = ({ icon, title, description, delay }) => {
  return (
    <div className="bg-white p-8 rounded-xl card-shadow fade-in" style={{ transitionDelay: delay }}>
      <div className="bg-teal-50 p-3 rounded-full w-fit mb-6">
        {icon}
      </div>
      <h3 className="font-semibold text-xl mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
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
    <section id="features" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-heading fade-in">Why Choose SyncedSelf?</h2>
          <p className="section-subheading fade-in" style={{ transitionDelay: '100ms' }}>
            Our platform combines the benefits of blockchain technology with mental health support.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Shield className="h-6 w-6 text-teal-600" />}
            title="Cross-Chain Integration"
            description="Access mental health services seamlessly across multiple blockchains through LayerZero's secure messaging protocol."
            delay="200ms"
          />
          <FeatureCard
            icon={<Users className="h-6 w-6 text-teal-600" />}
            title="DAO Governance"
            description="$SYNCED token holders participate in platform decisions, from feature development to therapist verification."
            delay="300ms"
          />
          <FeatureCard
            icon={<Lock className="h-6 w-6 text-teal-600" />}
            title="Token Economy"
            description="Use $SYNCED tokens for therapy payments, governance voting, and earning rewards through platform participation."
            delay="400ms"
          />
          <FeatureCard
            icon={<Sparkles className="h-6 w-6 text-teal-600" />}
            title="Community Rewards"
            description="Earn $SYNCED tokens through consistent platform engagement and helping others in the community."
            delay="500ms"
          />
          <FeatureCard
            icon={<Clock className="h-6 w-6 text-teal-600" />}
            title="Solana Speed"
            description="Lightning-fast transactions and low fees powered by Solana's high-performance blockchain."
            delay="600ms"
          />
          <FeatureCard
            icon={<Banknote className="h-6 w-6 text-teal-600" />}
            title="Token Staking"
            description="Stake $SYNCED tokens to earn platform fees and participate in governance decisions."
            delay="700ms"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;