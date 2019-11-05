import React from 'react';
import styled, { keyframes } from 'styled-components';

const flowing = keyframes`
  0 100% {
    transform: scaleY(1);
  }

  50% {
    transform: scaleY(1.1);
  }
`;

const FoamOverflow = styled.div`
  position: absolute;
  z-index: 4;
  top: 0;
  width: 100vw;
  height: 30vh;
  background: linear-gradient(180deg, #fff 0, hsla(0, 0%, 100%, 0.7) 80%, hsla(0, 0%, 100%, 0.2));
  clip-path: url(#clip);
  transform: scaleY(0.9) translateY(-100px);
`;

const Foam = styled.div`
  position: absolute;
  z-index: 2;
  top: 0;
  width: 100vw;
  height: 30vh;
  opacity: 0.65;
  background: linear-gradient(180deg, #fff 0, hsla(0, 0%, 100%, 0.5) 80%, hsla(0, 0%, 100%, 0.1));
  clip-path: url(#clip);
  animation: ${flowing} 6s linear infinite;
`;

const FoamTop = styled.div`
  position: absolute;
  z-index: 3;
  top: 0;
  width: 100vw;
  height: 30vh;
  opacity: 0.7;
  background: linear-gradient(180deg, #fff 0, hsla(0, 0%, 100%, 0.7) 80%, hsla(0, 0%, 100%, 0.2));
  clip-path: url(#clip);
  transform: scaleY(0.9) translateY(-15px);
  animation: ${flowing} 9s linear infinite;
`;

const FoamLayer = () => (
  <React.Fragment>
    <Foam />
    <FoamTop />
    <FoamOverflow />
  </React.Fragment>
);

export default FoamLayer;
