import React from 'react';
import { CONTENT } from '../constants';

interface MenuProps {
  content: typeof CONTENT.en;
}

const Menu: React.FC<MenuProps> = ({ content }) => {
  const { menu } = content;

  return (
    <section className="py-24 bg-stone-900 text-stone-100">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="font-serif text-4xl md:text-5xl mb-12 text-rose-100">{menu.title}</h2>
        
        <div className="space-y-12">
          {menu.sections.map((section, idx) => (
            <div key={idx} className="relative">
              <h3 className="font-serif text-2xl text-rose-200 mb-6 italic border-b border-stone-700 inline-block px-8 pb-2">
                {section.category}
              </h3>
              <ul className="space-y-4">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="text-lg font-light tracking-wide text-stone-300">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-sm text-stone-500 italic">
          {menu.dietaryNote}
        </div>
      </div>
    </section>
  );
};

export default Menu;
