import styled from "styled-components";

export const StyledCup = styled.button`
  color: white;
  width: 120px;
  height: 80px;
  background: #8b5a2b; /* Wood color */
  border-radius: 20px 20px 10px 10px; /* Rounded top */
  border: 4px solid #6f4f28; /* Darker border */
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Soft shadow for 3D effect */
  overflow: hidden;
  z-index: 1;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 20px;
    background: #6f4f28; /* Darker wood color for the top band */
    border-radius: 10px 10px 0 0;
    top: 0;
    left: 0;
    box-shadow: inset 0 -2px 4px rgba(0, 0, 0, 0.2); /* Inner shadow */
  }
`;

export const StyledBall = styled.div`
  width: 20px;
  height: 20px;
  background: #f0ad4e; /* Gold color for the ball */
  border-radius: 50%; /* Perfect circle */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* Soft shadow for a 3D effect */
  position: absolute;
  bottom: 10px; /* Positioned at the bottom of the chest */
`;
