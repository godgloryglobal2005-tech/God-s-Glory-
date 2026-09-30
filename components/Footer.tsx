
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent mt-8">
      <div className="container mx-auto px-4 py-4 text-center text-[var(--color-text-subtle)] text-xs">
        <p>&copy; {new Date().getFullYear()} God's Glory Tutors. All rights reserved.</p>
        <p className="mt-1">
          AI-generated solutions may contain inaccuracies. Always verify critical information.
        </p>
      </div>
    </footer>
  );
};

export default Footer;