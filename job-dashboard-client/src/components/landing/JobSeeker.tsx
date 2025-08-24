import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function JobSeekersSection() {
  const navigate = useNavigate();

  return (
    <section className="snap-start flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 mt-30 mb-20 md:px-20 h-screen gap-4 md:gap-8 bg-[#f0f8ff]">
      <div className="md:w-1/2 flex justify-center mt-4 md:mt-0">
        <img
          src="/images/job-seeker.jpg"
          alt="Job Seekers"
          className="w-full h-auto md:max-h-[80vh] object-cover rounded-xl shadow-lg"
        />
      </div>
      <div className="md:w-1/2 flex flex-col gap-4 md:pl-12">
        <h2 className="text-3xl md:text-4xl font-bold">Job Seekers</h2>
        <p className="text-lg md:text-xl text-gray-600">
          Explore thousands of job listings, apply easily, and track your applications all in one
          place.
        </p>
        <p className="text-gray-500 sm:text-base md:text-lg">
          Build a professional profile and showcase your skills to potential employers worldwide.
          Get personalized job recommendations tailored to your experience.
        </p>
        <p className="text-gray-500 sm:text-base md:text-lg">
          Network with professionals and stay ahead with market insights and career tips.
        </p>
        <button
          onClick={() => navigate('/signup')}
          className="bg-green-500 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg hover:bg-green-600 transition text-sm md:text-base"
        >
          Get Started
        </button>
      </div>
    </section>
  );
}
