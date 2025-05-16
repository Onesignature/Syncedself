import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface Testimonial {
  id: number;
  content: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    content: "SyncedSelf changed my life. The privacy aspect made me comfortable enough to open up for the first time. My therapist is amazing and I love knowing my data is secure.",
    author: "Sarah Johnson",
    role: "Software Engineer",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5
  },
  {
    id: 2,
    content: "As someone who values privacy, the blockchain aspect of SyncedSelf was the deciding factor for me. The therapists are top-notch and I appreciate the transparent pricing model.",
    author: "Michael Chen",
    role: "Data Analyst",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 5
  },
  {
    id: 3,
    content: "I was skeptical about online therapy until I tried SyncedSelf. The platform is easy to use, sessions are smooth, and I love that I control my data completely.",
    author: "Emily Rodriguez",
    role: "Marketing Manager",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    rating: 4
  }
];

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
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

  const handlePrev = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const activeTestimonial = testimonials[activeIndex];

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="section-heading fade-in">What Our Users Say</h2>
          <p className="section-subheading fade-in" style={{ transitionDelay: '100ms' }}>
            Real stories from people who have experienced the benefits of decentralized therapy.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          <div className="bg-white rounded-2xl card-shadow p-8 md:p-12 fade-in" style={{ transitionDelay: '200ms' }}>
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={24}
                    className={`inline-block ${
                      i < activeTestimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-xl md:text-2xl text-gray-700 mb-8 italic">
                "{activeTestimonial.content}"
              </p>
              <div className="flex flex-col items-center">
                <img
                  src={activeTestimonial.avatar}
                  alt={activeTestimonial.author}
                  className="w-16 h-16 rounded-full object-cover mb-4"
                />
                <h4 className="font-semibold text-lg">{activeTestimonial.author}</h4>
                <p className="text-gray-600">{activeTestimonial.role}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-4 fade-in" style={{ transitionDelay: '300ms' }}>
            <button
              onClick={handlePrev}
              className="bg-white p-3 rounded-full card-shadow hover:bg-teal-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-teal-600" />
            </button>
            <button
              onClick={handleNext}
              className="bg-white p-3 rounded-full card-shadow hover:bg-teal-50 transition-colors"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-teal-600" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;