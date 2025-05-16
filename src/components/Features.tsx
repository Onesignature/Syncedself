import React, { useEffect, useRef } from 'react';
import { Shield, Users, Lock, Sparkles, Clock, Banknote } from 'lucide-react';

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
            title="Enhanced Privacy"
            description="Your data is encrypted and secured through blockchain technology, ensuring your therapy sessions remain confidential."
            delay="200ms"
          />
          <FeatureCard
            icon={<Users className="h-6 w-6 text-teal-600" />}
            title="Global Therapist Network"
            description="Access qualified therapists from around the world, matched to your specific needs and preferences."
            delay="300ms"
          />
          <FeatureCard
            icon={<Lock className="h-6 w-6 text-teal-600" />}
            title="Self-Sovereign Identity"
            description="You control your health data and can selectively share information, maintaining full autonomy."
            delay="400ms"
          />
          <FeatureCard
            icon={<Sparkles className="h-6 w-6 text-teal-600" />}
            title="Verified Credentials"
            description="Therapist qualifications are verified on the blockchain, ensuring trust and transparency."
            delay="500ms"
          />
          <FeatureCard
            icon={<Clock className="h-6 w-6 text-teal-600" />}
            title="Flexible Sessions"
            description="Schedule sessions at your convenience with no intermediaries or restrictions."
            delay="600ms"
          />
          <FeatureCard
            icon={<Banknote className="h-6 w-6 text-teal-600" />}
            title="Transparent Pricing"
            description="Pay directly to therapists with lower fees through our token system, making therapy more accessible."
            delay="700ms"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;