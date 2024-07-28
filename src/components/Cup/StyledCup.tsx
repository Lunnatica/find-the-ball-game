import styled, { css } from "styled-components";

import { animated } from "@react-spring/web";

import cupImage from "../../../public/cup.png";
import scallopImage from "../../../public/scallop.png";
import seashellImage from "../../../public/seashell.png";
import shellImage from "../../../public/shell.png";

// TODO: Decide image and delete the ones not used

export const StyledCup = styled(animated.button)<{
  $animate?: boolean;
  $animation?: string;
}>`
  cursor: pointer;
  /* background: url(${cupImage.src}) no-repeat center center;
  background-size: contain;
  width: 150px;
  height: 150px;
  border: none;
  transform: rotateX(180deg); */

  /* background: url(${scallopImage.src}) no-repeat center center;
  background-size: contain;
  min-height: 100px;
  min-width: 100px;
  border: none;
  transform: rotateX(180deg); */

  background: url(${seashellImage.src}) no-repeat center center;
  background-size: contain;
  min-height: 100px;
  min-width: 100px;
  border: none;
  transform: rotateX(180deg);

  /* background: url(${shellImage.src}) no-repeat center center;
  background-size: contain;
  min-height: 100px;
  min-width: 100px;
  border: none; */

  &:disabled {
    cursor: not-allowed;
  }

  /* animation: ${(props) => props.$animation}; */

  ${(props) =>
    props.$animate &&
    css`
      animation: ${props.$animation} 0.1s ease-in-out;
    `}
`;

export const StyledBall = styled.div`
  width: 20px;
  height: 20px;
  background: #f0ad4e;
  margin: 3rem auto 0 auto;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`;
