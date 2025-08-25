import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: clamp(0.5rem, 2vw, 1rem) clamp(1rem, 5vw, 5rem);
`;

const Logo = styled.img`
  height: clamp(3.5rem, 5vw, 6.5rem);
  width: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: clamp(0.5rem, 2vw, 1rem);
`;

const BaseButton = styled.button`
  background-color: #006fbf;
  color: white;
  padding: clamp(0.4rem, 1vw, 0.6rem) clamp(0.8rem, 2vw, 1.2rem);
  border-radius: clamp(0.4rem, 1vw, 0.5rem);
  font-size: clamp(0.875rem, 1.5vw, 1.125rem);
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const PrimaryButton = styled(BaseButton)``;

const SecondaryButton = styled(BaseButton)`
  background-color: #e5e7eb;
  color: #1f2937;

  &:hover {
    background-color: #d1d5db;
  }
`;

export default function Header() {
  const navigate = useNavigate();

  return (
    <Container>
      <Logo src="/images/logo-full.png" alt="SkillSynapse Logo" />
      <ButtonGroup>
        <PrimaryButton onClick={() => navigate('/signup')}>Join Now</PrimaryButton>
        <SecondaryButton onClick={() => navigate('/login')}>Log In</SecondaryButton>
      </ButtonGroup>
    </Container>
  );
}
