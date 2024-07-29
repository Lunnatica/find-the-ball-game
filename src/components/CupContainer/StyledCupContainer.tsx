import styled from "styled-components";

export const StyledCupContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  padding-bottom: 5rem;

  @media (min-width: 420px) {
    gap: 3rem;
  }
`;

export const StyledCupLoader = styled.div`
  font-size: 2rem;
  font-weight: bold;
  height: 12.5rem;
  text-align: center;
`;
