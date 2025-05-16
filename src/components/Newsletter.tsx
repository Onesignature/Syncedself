import React, { useEffect, useRef, useState } from 'react';
import { Send } from 'lucide-react';

const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your API
      setIsSubmitted(true);
      setEmail('');
      
      // Reset the submitted state after a few seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }
  };

  return (
    <section ref={sectionRef} className="py-20">
      <div className="container-custom">
        <div className="bg-gradient-to-r from-teal-600 to-purple-600 rounded-2xl p-10 md:p-16 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" 
                 style={{ 
                   backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 2px)', 
                   backgroundSize: '30px 30px' 
                 }}></div>
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 fade-in">Stay Updated on SyncedSelf</h2>
            <p className="text-lg md:text-xl mb-8 text-white/90 fade-in" style={{ transitionDelay: '100ms' }}>
              Join our newsletter to receive updates about our launch, new features, and mental health resources.
            </p>
            
            <form onSubmit={handleSubmit} className="max-w-md mx-auto fade-in" style={{ transitionDelay: '200ms' }}>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-white text-teal-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition duration-200 flex items-center justify-center"
                >
                  <span className="mr-2">Subscribe</span>
                  <Send size={18} />
                </button>
              </div>
              
              {isSubmitted && (
                <div className="mt-4 text-white bg-white/20 rounded-lg p-3 animate-fade-in">
                  Thank you for subscribing! We'll keep you updated.
                </div>
              )}
            </form>
            
            <p className="mt-6 text-sm text-white/80 fade-in" style={{ transitionDelay: '300ms' }}>
              We respect your privacy. Your information will never be shared with third parties.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;