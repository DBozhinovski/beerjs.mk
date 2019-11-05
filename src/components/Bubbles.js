import styled from 'styled-components';
import Particles from 'react-particles-js';
import React from 'react';

import bubbles from './bubbles.json';

const Wrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  height: 100vh;
  background: #f8dc3d;

  .particles {
    width: 100vw;
    height: 100vh;
    top: 0;
  }
`;

const Bubbles = () => (
  <Wrapper>
    <Particles params={bubbles} className="particles" />
  </Wrapper>
);

export default Bubbles;
