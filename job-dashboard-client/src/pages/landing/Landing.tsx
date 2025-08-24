import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import JobSeekersSection from '@/components/landing/JobSeeker';
import EmployersSection from '@/components/landing/Employer';

export default function Landing() {
  return (
    <div className="h-screen w-full overflow-y-scroll snap-y snap-mandatory">
      <section className="snap-start h-screen">
        <Header />
        <Hero />
      </section>
      <JobSeekersSection />
      <EmployersSection />
    </div>
  );
}
