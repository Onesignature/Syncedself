import React, { useEffect, useRef } from 'react';
import { Check } from 'lucide-react';

interface PlanFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  features: PlanFeature[];
  cta: string;
  highlighted: boolean;
  delay: string;
}

const plans: PricingPlan[] = [
  {
    name: "Basic",
    description: "Essential mental health support",
    price: "20",
    period: "session",
    features: [
      { text: "Access to verified therapists", included: true },
      { text: "Secure text messaging", included: true },
      { text: "Basic encryption", included: true },
      { text: "Weekly check-ins", included: true },
      { text: "Audio/video sessions", included: false },
      { text: "Priority matching", included: false },
    ],
    cta: "Get Started",
    highlighted: false,
    delay: "200ms"
  },
  {
    name: "Premium",
    description: "Complete therapy experience",
    price: "35",
    period: "session",
    features: [
      { text: "Access to verified therapists", included: true },
      { text: "Secure text messaging", included: true },
      { text: "Advanced encryption", included: true },
      { text: "Unlimited check-ins", included: true },
      { text: "Audio/video sessions", included: true },
      { text: "Priority matching", included: true },
    ],
    cta: "Get Premium",
    highlighted: true,
    delay: "400ms"
  },
  {
    name: "Professional",
    description: "Advanced organizational support",
    price: "50",
    period: "session",
    features: [
      { text: "Access to verified therapists", included: true },
      { text: "Secure text messaging", included: true },
      { text: "Military-grade encryption", included: true },
      { text: "Unlimited check-ins", included: true },
      { text: "Audio/video sessions", included: true },
      { text: "Priority matching", included: true },
    ],
    cta: "Contact Sales",
    highlighted: false,
    delay: "600ms"
  }
];

const PricingCard: React.FC<{ plan: PricingPlan }> = ({ plan }) => {
  return (
    <div 
      className={`bg-white rounded-xl overflow-hidden transition-all duration-500 fade-in ${
        plan.highlighted 
          ? 'card-shadow scale-105 border-2 border-teal-500' 
          : 'card-shadow hover:translate-y-[-8px]'
      }`}
      style={{ transitionDelay: plan.delay }}
    >
      {plan.highlighted && (
        <div className="bg-teal-600 text-white text-center py-2 font-medium text-sm">
          MOST POPULAR
        </div>
      )}
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
        <p className="text-gray-600 mb-6">{plan.description}</p>
        <div className="mb-6">
          <span className="text-4xl font-bold">${plan.price}</span>
          <span className="text-gray-600">/{plan.period}</span>
        </div>
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check 
                className={`h-5 w-5 mr-3 ${
                  feature.included ? 'text-teal-500' : 'text-gray-300'
                }`} 
              />
              <span className={feature.included ? 'text-gray-700' : 'text-gray-400'}>
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
        <button 
          className={`w-full py-3 px-6 rounded-lg font-medium transition ${
            plan.highlighted 
              ? 'bg-teal-600 text-white hover:bg-teal-700' 
              : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
          }`}
        >
          {plan.cta}
        </button>
      </div>
    </div>
  );
};

const Pricing: React.FC = () => {
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
    <section id="pricing" ref={sectionRef} className="py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-heading fade-in">Transparent Pricing</h2>
          <p className="section-subheading fade-in" style={{ transitionDelay: '100ms' }}>
            Choose a plan that works for you, with no hidden fees or intermediary costs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>

        <div className="mt-12 text-center fade-in" style={{ transitionDelay: '800ms' }}>
          <p className="text-gray-600 mb-4">
            All plans include access to SyncedSelf tokens for direct therapist payments.
          </p>
          <a href="#" className="text-teal-600 font-medium hover:underline">
            Learn more about our token economy →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Pricing;