'use client';

import { Minus, Plus } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import * as motion from 'motion/react-client';
import { useState } from 'react';

interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  id: string;
}

export function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
  id,
}: AccordionItemProps) {
  return (
    <div className="mb-4">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-[#1A1B1E]/40 backdrop-blur-sm rounded-lg text-left
          relative before:absolute before:inset-0 before:rounded-lg before:pointer-events-none
          before:bg-gradient-to-b before:from-transparent before:to-transparent
          before:border before:border-[#00A3FF]/10 before:shadow-[0_0_25px_rgba(0,163,255,0.1)]"
        aria-expanded={isOpen}
        aria-controls={`accordion-${id}`}
      >
        <span className="font-medium">{question}</span>
        <span className="ml-4 flex-shrink-0 text-[#00A3FF]">
          {isOpen ? (
            <Minus className="h-5 w-5" />
          ) : (
            <Plus className="h-5 w-5" />
          )}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`accordion-${id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="p-4 text-gray-400 text-sm leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface AccordionProps {
  items: {
    question: string;
    answer: string;
  }[];
}

export function CustomAccordion({ items }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(new Set([0])); // First item open by default

  const toggleItem = (index: number) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          id={index.toString()}
          question={item.question}
          answer={item.answer}
          isOpen={openItems.has(index)}
          onToggle={() => toggleItem(index)}
        />
      ))}
    </div>
  );
}
