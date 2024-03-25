import { useEffect } from 'react';

export const useOnClickOutside = (
   ref: React.MutableRefObject<HTMLElement | null | undefined>,
   handler: (event: MouseEvent) => void,
   selector?: string,
   active: boolean = true
) => {
   useEffect(() => {
      const listener = (event: MouseEvent) => {
         if (
            !ref.current ||
            ref.current.contains(event.target as Node) ||
            (selector && event.target && (event.target as HTMLElement).closest(selector))
         ) {
            return;
         }

         handler(event);
      };

      if (active) {
         document.addEventListener('mousedown', listener);
      } else {
         document.removeEventListener('mousedown', listener);
      }

      return () => {
         document.removeEventListener('mousedown', listener);
      };
   }, [ref, handler, selector, active]);
};
