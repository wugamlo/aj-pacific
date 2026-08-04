import React from 'react';
import Link from 'next/link';

interface ServiceCardProps {
  title: string;
  description: string;
  bullets: string[];
  icon?: React.ReactNode;
  href?: string;
  ctaText?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, bullets, icon, href, ctaText = "Learn more →" }) => {
  const cardContent = (
    <>
      {icon && <div className="mb-4 text-blue-600">{icon}</div>}
      <h3 className="text-2xl font-bold mb-4 text-slate-900">{title}</h3>
      <p className="text-slate-600 mb-6 flex-grow">{description}</p>
      <ul className="space-y-2 mb-6">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex items-center text-sm text-slate-700">
            <span className="w-1.5 h-1.5 bg-brand rounded-full mr-2"></span>
            {bullet}
          </li>
        ))}
      </ul>
      {href && (
        <div className="mt-auto pt-4 border-t border-gray-100">
          <span className="text-brand font-semibold hover:text-brand-dark transition-colors inline-flex items-center group">
            {ctaText}
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className="glass p-8 flex flex-col h-full hover:scale-[1.02] hover:shadow-xl transition-all duration-300 cursor-pointer group">
        {cardContent}
      </Link>
    );
  }

  return (
    <div className="glass p-8 flex flex-col h-full hover:scale-[1.02] transition-transform duration-300">
      {cardContent}
    </div>
  );
};

export default ServiceCard;
