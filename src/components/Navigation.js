import React from 'react';
import styled from 'styled-components';
import { media } from '../utils/media';

const Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: #4392f1;
    font-size: 1.3rem;
  }

  a:hover {
    color: ${props => props.theme.colors.primary}};
  }

  a + a::before {
    content: '|';
    text-overflow: '' '';
    color: #000;
  }

  a + a:hover::before {
    color: #000;
  }

  @media ${media.phone} {
    flex-direction: column;
    align-items: flex-end;

    a {
      font-size: 1rem;
    }

    a + a::before {
      content: '';
    }
  }
`;

const NavComp = () => (
  <Navigation>
    <a href="/info/about-beerjs">За BeerJS&nbsp;</a>
    <a href="/categories/events">&nbsp;Претходни&nbsp;</a>
    <a href="/categories/blog">&nbsp;Блог&nbsp;</a>
    <a href="/contact">&nbsp;Контакт</a>
  </Navigation>
);

export default NavComp;
