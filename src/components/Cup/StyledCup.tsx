import styled from "styled-components";

export const StyledCup = styled.button`
  cursor: pointer;
  width: 60px;
  height: 90px; /* Slightly increased height for realism */
  background: linear-gradient(
    to bottom,
    #d9534f,
    #c9302c
  ); /* Realistic gradient for depth */
  border-radius: 8px 8px 20px 20px; /* More natural rounded bottom */
  border: 2px solid #b52d1a; /* Darker border for contrast */
  position: relative;
  display: flex;
  align-items: flex-start; /* Align content to the top */
  justify-content: center;
  box-shadow: 0 -4px 12px rgba(0, 0, 0, 0.4); /* Enhanced shadow for 3D effect */
  padding-top: 8px; /* Space for the ball */

  &:disabled {
    cursor: not-allowed;
    opacity: 0.9; /* Slightly transparent when disabled */
  }

  &:hover {
    background: linear-gradient(
      to bottom,
      #c9302c,
      #ac2925
    ); /* Slightly lighter gradient on hover */
  }

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 18px; /* Adjusted height for the lip */
    background: linear-gradient(
      to bottom,
      #c9302c,
      #a41e1b
    ); /* Darker gradient for the lip */
    border-radius: 0 0 20px 20px; /* Rounded top */
    bottom: 0; /* Positioned at the bottom of the cup */
    left: 0;
    box-shadow: inset 0 -2px 6px rgba(0, 0, 0, 0.3); /* Inner shadow for depth */
  }
`;

export const StyledBall = styled.div`
  width: 20px;
  height: 20px;
  background: #f0ad4e; /* Gold color for the ball */
  border-radius: 50%; /* Perfect circle */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4); /* Enhanced shadow for 3D effect */
`;
