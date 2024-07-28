import styled from "styled-components";

export const StyledGameArea = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  gap: 1rem;
  padding: 15rem 1rem;
  font-size: 1.5rem;
`;

export const StyledStartButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #f5f5f5;
  border-radius: 0.25rem;
  font-size: 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const StyledUserMessage = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
`;
