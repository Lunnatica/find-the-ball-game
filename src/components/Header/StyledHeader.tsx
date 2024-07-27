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
  margin-left: 15px;

  h1 {
    font-size: 24px;
    color: #fff;
  }

  p {
    font-size: 12px;
    color: #fff;
  }
`;

export { StyledHeader, StyledHeaderTitle };
