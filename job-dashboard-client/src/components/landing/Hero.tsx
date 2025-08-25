import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Section = styled.section`
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0 clamp(1rem, 5vw, 5rem);
  gap: clamp(2rem, 5vw, 4rem);
  align-items: stretch;
  justify-content: center;

  @media (min-width: 1145px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  flex: 1;
  gap: 1rem;

  @media (min-width: 1024px) {
    width: auto;
    flex: 1;
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

const Title = styled.h1`
  font-size: clamp(1.5rem, 6vw, 4rem);
  font-weight: bold;
  color: #006fbf;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color: #4b5563;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: clamp(0.5rem, 2vw, 1rem);
  margin-top: clamp(0.5rem, 2vw, 1rem);
  width: 100%;

  @media (min-width: 1024px) {
    width: auto;
  }
`;

const PrimaryButton = styled.button`
  background-color: #006fbf;
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex: 1;

  &:hover {
    background-color: #005a9e;
  }
`;

const SecondaryButton = styled(PrimaryButton)`
  background-color: #e5e7eb;
  color: #1f2937;
  border: 1px solid #d1d5db;

  &:hover {
    background-color: #d1d5db;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: auto;
  max-height: 70vh;
  object-fit: cover;
  border-radius: 1rem;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
`;

export default function Hero() {
  const navigate = useNavigate();

  return (
    <Section>
      <ContentContainer>
        <Title>Welcome to SkillSynapse</Title>
        <Paragraph>“Connecting Talent with Opportunity” – simple and professional.</Paragraph>
        <Paragraph>
          Browse thousands of job listings, apply in one click, and get discovered by top employers.
        </Paragraph>
        <Paragraph>
          For recruiters, post jobs effortlessly and find the perfect candidate faster than ever.
        </Paragraph>
        <ButtonGroup>
          <PrimaryButton onClick={() => navigate('/signup')}>Join Now</PrimaryButton>
          <SecondaryButton onClick={() => navigate('/login')}>Log In</SecondaryButton>
        </ButtonGroup>
      </ContentContainer>
      <ImageContainer>
        <HeroImage src="/images/company.png" alt="SkillSynapse" />
      </ImageContainer>
    </Section>
  );
}
