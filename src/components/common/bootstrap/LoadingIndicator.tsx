import React from "react";
import styled, { keyframes } from "styled-components";

interface Props {
  size?: number;
  color?: string;
}

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

// TODO: FIX THIS STYLED DIV MESS AND USE A PROPER SCSS FILE
const LoadingIndicatorWrapper = styled.div`
  display: inline-block;
  position: relative;
  width: ${({ size }: Props) => size}px;
  height: ${({ size }: Props) => size}px;
  div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: ${({ size }: Props) => size}px;
    height: ${({ size }: Props) => size}px;
    border-radius: 50%;
    //@ts-ignore
    border: ${({ size }: Props) =>
        Math.ceil(
          //@ts-ignore
          size / 10
        )}px
      solid ${({ color }: Props) => color};
    animation: ${rotate} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: ${({ color }: Props) => color} transparent transparent
      transparent;
  }
  div:nth-child(1) {
    animation-delay: -0.45s;
  }
  div:nth-child(2) {
    animation-delay: -0.3s;
  }
  div:nth-child(3) {
    animation-delay: -0.15s;
  }
`;

const LoadingIndicator: React.FC<Props> = ({
  size = 50,
  color = "#2e638b",
}) => {
  return (
    <LoadingIndicatorWrapper size={size} color={color}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </LoadingIndicatorWrapper>
  );
};

export default LoadingIndicator;
