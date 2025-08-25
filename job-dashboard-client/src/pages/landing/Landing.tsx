import React from 'react';
import Header from '@/components/landing/Header';
import Hero from '@/components/landing/Hero';
import JobSeekersSection from '@/components/landing/JobSeeker';
import EmployersSection from '@/components/landing/Employer';
import styled from '@emotion/styled';

const LandingContainer = styled.div`
  height: 100vh;
  width: 100%;
  overflow-y: auto;
  scroll-snap-type: y mandatory;
`;

const SectionWrapper = styled.section`
  scroll-snap-align: start;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export default function Landing() {
  return (
    <LandingContainer>
      <SectionWrapper>
        <Header />
        <Hero />
      </SectionWrapper>
      <SectionWrapper>
        <JobSeekersSection />
      </SectionWrapper>
      <SectionWrapper>
        <EmployersSection />
      </SectionWrapper>
    </LandingContainer>
  );
}
