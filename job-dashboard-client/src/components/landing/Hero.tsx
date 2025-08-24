import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col md:flex-row items-center justify-between w-full h-full gap-4 md:gap-8 px-4 sm:px-6 md:px-20">
      <div className="md:w-1/2 flex flex-col gap-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#006FBF]">
          Welcome to SkillSynapse
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600">
          “Connecting Talent with Opportunity” – simple and professional.
        </p>
        <p className="text-gray-500 sm:text-base md:text-lg">
          Browse thousands of job listings, apply in one click, and get discovered by top employers.
        </p>
        <p className="text-gray-500 sm:text-base md:text-lg">
          For recruiters, post jobs effortlessly and find the perfect candidate faster than ever.
        </p>
        <div className="flex gap-4 mt-4">
          <button
            onClick={() => navigate('/signup')}
            className="bg-[#006FBF] text-white px-4 py-2 rounded-lg hover:opacity-90 transition text-sm"
          >
            Join Now
          </button>
          <button
            onClick={() => navigate('/login')}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition text-sm"
          >
            Log In
          </button>
        </div>
      </div>

      <div className="md:w-1/2 mt-4 md:mt-0 flex justify-center">
        <img
          src="/images/company.png"
          alt="SkillSynapse"
          className="w-full h-auto md:max-h-[70vh] object-cover rounded-xl shadow-lg"
        />
      </div>
    </div>
  );
}
