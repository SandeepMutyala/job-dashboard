import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center px-4 sm:px-6 md:px-20 pt-4 md:pt-8 mb-6 md:mb-1">
      <img
        src="/images/logo-full.svg"
        alt="SkillSynapse Logo"
        className="h-14 md:h-24 lg:h-28 xl:h-32 w-auto max-h-32"
      />
      <div className="flex gap-3">
        <button
          onClick={() => navigate('/signup')}
          style={{ backgroundColor: '#006FBF' }}
          className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition text-md"
        >
          Join Now
        </button>
        <button
          onClick={() => navigate('/login')}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-md"
        >
          Log In
        </button>
      </div>
    </div>
  );
}
