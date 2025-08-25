import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Section = styled.section`
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  height: 100vh;
  gap: clamp(2rem, 5vw, 4rem);
  padding: 0 clamp(1rem, 5vw, 5rem);
  align-items: stretch;
  justify-content: center;

  @media (min-width: 1145px) {
    flex-direction: row-reverse;
    align-items: center;
    justify-content: space-between;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;

  @media (min-width: 1024px) {
    width: auto;
    flex: 1;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  width: 100%;
  flex: 1;
  gap: 1rem;

  @media (min-width: 1024px) {
    width: auto;
    flex: 1;
    align-items: flex-start;
  }
`;

const Title = styled.h2`
  font-size: clamp(1.5rem, 5vw, 3rem);
  font-weight: bold;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #4b5563;
`;

const Button = styled.button`
  background-color: #a855f7;
  color: #fff;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  margin-top: 1rem;
  cursor: pointer;
  border: none;
  transition: background-color 0.3s ease;
  width: 100%;

  &:hover {
    background-color: #9333ea;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  max-height: 80vh;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
`;

export default function EmployersSection() {
  const navigate = useNavigate();

  return (
    <Section>
      <ImageContainer>
        <Image src="/images/recruiter.jpg" alt="Recruiters & Employers" />
      </ImageContainer>
      <ContentContainer>
        <Title>Recruiters & Employers</Title>
        <Paragraph>
          Post jobs, manage applications, and find top talent efficiently with our intuitive
          platform.
        </Paragraph>
        <Paragraph>
          Use advanced filters and AI-powered matching to quickly identify the most qualified
          candidates.
        </Paragraph>
        <Paragraph>
          Showcase your company culture, boost employer branding, and connect with professionals
          across industries.
        </Paragraph>
        <Button onClick={() => navigate('/signup')}>Post a Job</Button>
      </ContentContainer>
    </Section>
  );
}
