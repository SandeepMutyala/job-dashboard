import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function EmployersSection() {
  const navigate = useNavigate();

  return (
    <section className="snap-start flex flex-col md:flex-row items-center justify-between px-4 sm:px-6 md:px-20 h-screen gap-4 md:gap-8">
      <div className="md:w-1/2 flex flex-col gap-4">
        <h2 className="text-3xl md:text-4xl font-bold">Recruiters & Employers</h2>
        <p className="text-lg md:text-xl text-gray-600">
          Post jobs, manage applications, and find top talent efficiently with our intuitive
          platform.
        </p>
        <p className="text-gray-500 sm:text-base md:text-lg">
          Use advanced filters and AI-powered matching to quickly identify the most qualified
          candidates.
        </p>
        <p className="text-gray-500 sm:text-base md:text-lg">
          Showcase your company culture, boost employer branding, and connect with professionals
          across industries.
        </p>
        <button
          onClick={() => navigate('/signup')}
          className="bg-purple-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-purple-600 transition text-sm md:text-base"
        >
          Post a Job
        </button>
      </div>
      <div className="xl:ml-10 md:w-1/2 flex justify-center mt-4 md:mt-0">
        <img
          src="/images/recruiter.jpg"
          alt="Recruiters"
          className="w-full h-auto md:max-h-[80vh] object-cover rounded-xl shadow-lg"
        />
      </div>
    </section>
  );
}
