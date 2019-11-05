import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Logo = styled.div`
  background: #fff;
  width: ${props => props.scale * 190}px;
  height: ${props => props.scale * 190}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 3px dotted #999;
  img {
    width: ${props => props.scale * 110}px;
    margin: 0;
  }
`;

const LogoComp = ({ scale }) => (
  <Logo scale={scale}>
    <img src="/social/beerjs.svg" alt="BeerJS logo" />
  </Logo>
);

export default LogoComp;

LogoComp.propTypes = {
  scale: PropTypes.number,
};

LogoComp.defaultProps = {
  scale: 1,
};
