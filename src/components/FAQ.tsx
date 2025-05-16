import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "How does blockchain technology enhance my therapy experience?",
    answer: "Blockchain technology ensures your data remains private and secure. It verifies therapist credentials, creates immutable session records, and allows you to control exactly who has access to your information. This creates a trustless system where you don't need to rely on a central authority to protect your sensitive mental health data."
  },
  {
    question: "What are SyncedSelf tokens and how do they work?",
    answer: "SyncedSelf tokens are our platform's cryptocurrency that facilitate direct payments between clients and therapists. They reduce transaction fees compared to traditional payment systems, enable micropayments for shorter sessions, and can be purchased with fiat currency or other cryptocurrencies. Tokens are stored in your secure wallet within the platform."
  },
  {
    question: "How are therapists verified on the platform?",
    answer: "Therapists undergo a rigorous verification process where their credentials, licenses, and qualifications are validated and then recorded on the blockchain. This creates a transparent, tamper-proof record of their qualifications that you can trust. We also maintain a reputation system based on verified session feedback."
  },
  {
    question: "What happens to my data on SyncedSelf?",
    answer: "Your data is encrypted and stored in a decentralized manner. Only you hold the encryption keys, meaning only you can grant or revoke access to your information. Session notes and records are tokenized and stored on the blockchain without personally identifiable information, maintaining privacy while creating an immutable record of your therapy journey."
  },
  {
    question: "Can I use SyncedSelf anonymously?",
    answer: "Yes, SyncedSelf supports pseudonymous therapy sessions. You can create a blockchain identity that doesn't require revealing your real name or personal information. This allows you to receive mental health support while maintaining privacy, which is particularly valuable for those concerned about stigma or those in positions where confidentiality is paramount."
  },
  {
    question: "What if I lose access to my account or wallet?",
    answer: "We implement a secure recovery process using a combination of seed phrases and optional trusted contacts who can help verify your identity. While maintaining the security benefits of blockchain, we ensure you won't permanently lose access to your therapy records or account. We recommend storing your recovery information in a safe, offline location."
  }
];

const FAQItem: React.FC<{ item: FAQItem; index: number; delay: string }> = ({ 
  item, 
  index, 
  delay 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="border-b border-gray-200 py-6 fade-in"
      style={{ transitionDelay: delay }}
    >
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <h3 className="text-lg md:text-xl font-semibold text-gray-800">{item.question}</h3>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="h-6 w-6 text-teal-600" />
          ) : (
            <ChevronDown className="h-6 w-6 text-teal-600" />
          )}
        </span>
      </button>
      <div 
        id={`faq-answer-${index}`}
        className={`mt-3 text-gray-600 overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p>{item.answer}</p>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
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
    <section id="faq" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-heading fade-in">Frequently Asked Questions</h2>
          <p className="section-subheading fade-in" style={{ transitionDelay: '100ms' }}>
            Everything you need to know about SyncedSelf and decentralized therapy.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <FAQItem 
              key={index} 
              item={item} 
              index={index} 
              delay={`${(index + 2) * 100}ms`} 
            />
          ))}
        </div>

        <div className="mt-12 text-center fade-in" style={{ transitionDelay: '900ms' }}>
          <p className="mb-6 text-gray-700">Still have questions?</p>
          <button className="btn-primary">Contact Us</button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;