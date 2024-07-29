"use client";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  padding: 1rem;
  align-items: center;
  background-color: #333;
  color: #fff;
`;

const StyledHeaderTitle = styled.div`
  margin-left: 1rem;

  h1 {
    font-size: 1.5rem;
    color: #fff;
  }

  p {
    font-size: 0.75rem;
    color: #fff;
  }
`;

export { StyledHeader, StyledHeaderTitle };
