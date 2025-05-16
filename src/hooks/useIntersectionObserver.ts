import { useEffect } from 'react';

type IntersectionObserverOptions = {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  onIntersect?: (entry: IntersectionObserverEntry) => void;
  targetClass?: string;
  triggerOnce?: boolean;
};

const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  options: IntersectionObserverOptions = {}
) => {
  const {
    root = null,
    rootMargin = '0px',
    threshold = 0.1,
    onIntersect,
    targetClass = 'fade-in',
    triggerOnce = true,
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement;
            
            // Add class to the target
            target.classList.add('appear');
            
            // Call callback if provided
            if (onIntersect) {
              onIntersect(entry);
            }
            
            // Unobserve if only triggering once
            if (triggerOnce) {
              observer.unobserve(target);
            }
          } else if (!triggerOnce) {
            // Remove class if not triggering once and element is out of view
            const target = entry.target as HTMLElement;
            target.classList.remove('appear');
          }
        });
      },
      { root, rootMargin, threshold }
    );

    const currentRef = ref.current;

    if (currentRef) {
      // If we want to observe all elements with a class
      if (targetClass) {
        const elements = currentRef.querySelectorAll(`.${targetClass}`);
        elements.forEach((el) => observer.observe(el));
      } else {
        // Just observe the ref element
        observer.observe(currentRef);
      }
    }

    return () => {
      if (currentRef) {
        if (targetClass) {
          const elements = currentRef.querySelectorAll(`.${targetClass}`);
          elements.forEach((el) => observer.unobserve(el));
        } else {
          observer.unobserve(currentRef);
        }
      }
    };
  }, [ref, root, rootMargin, threshold, onIntersect, targetClass, triggerOnce]);
};

export default useIntersectionObserver;