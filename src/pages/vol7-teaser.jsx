/* eslint no-unused-expressions:0 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import SEO from '../components/SEO';
import theme from '../../config/Theme';
import { media } from '../utils/media';

import FoamLayer from '../components/Foam';
import Bubbles from '../components/Bubbles';
import Clip from '../components/Clip';
import Logo from '../components/Logo';

const GlobalStyle = createGlobalStyle`
  *, :after, :before {
    box-sizing: border-box;
  }
  ::selection {
    color: ${theme.colors.bg};
    background: ${theme.colors.primary};
  }
  body, html {
    background: ${theme.colors.landingBg};
    color: ${theme.default};
    font-display: swap;
    @media ${media.phone} {
      font-size: 14px;
    }
    width: 100vw;
    height: 100vh;
    overflow: hidden;

  }
  a {
    color: ${theme.colors.grey.dark};
    text-decoration: none;
    transition: all ${theme.transitions.normal};
  }
  a:hover {
    color: ${theme.colors.primary};
  }
  h1, h2, h3, h4 {
    color: ${theme.colors.grey.dark};
  }
  blockquote {
    font-style: italic;
    position: relative;
  }

  blockquote:before {
    content: "";
    position: absolute;
    background: ${theme.colors.primary};
    height: 100%;
    width: 6px;
    margin-left: -1.6rem;
  }
  label {
    margin-bottom: .5rem;
    color: ${theme.colors.grey.dark};
  }
  input, textarea {
    border-radius: .5rem;
    border: none;
    background: rgba(0, 0, 0, 0.05);
    padding: .25rem 1rem;
    &:focus {
      outline: none;
    }
  }
`;

const Contents = styled.div`
  position: absolute;
  z-index: 40;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  padding-top: 5vh;

  h2 {
    font-weight: 100;
    text-align: center;
    font-size: 1.3rem;
    width: 350px;
    // margin-top: 1rem;
  }
`;

const Sticker = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;

  h1 {
    margin-bottom: 0.5rem;
    font-weight: normal;
  }
`;

const Middle = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Talks = styled.div`
  padding-top: 40px;
  display: flex;
  justify-content: space-between;
  width: 1300px;

  img {
    box-shadow: 0px 2.8px 2.2px rgba(0, 0, 0, 0.02), 0px 6.7px 5.3px rgba(0, 0, 0, 0.028),
      0px 12.5px 10px rgba(0, 0, 0, 0.035), 0px 22.3px 17.9px rgba(0, 0, 0, 0.042),
      0px 41.8px 33.4px rgba(0, 0, 0, 0.05), 0px 100px 80px rgba(0, 0, 0, 0.07);
    width: 340px;
  }
`;

const TeaserPage = () => (
  <ThemeProvider theme={theme}>
    <>
      <SEO />
      <GlobalStyle />
      <FoamLayer />
      <Bubbles />
      <Contents>
        <Middle>
          <Sticker>
            {/* <Logo /> */}
            <Talks>
              <img src="/img/vol7-Blazhe.png" alt="Blazhe cover" />
              <img src="/img/vol7-Andrej.png" alt="Andrej cover" />
              <img src="/img/vol7-Kristian.png" alt="Kristian cover" />
            </Talks>
          </Sticker>
        </Middle>
        <Clip />
      </Contents>
    </>
  </ThemeProvider>
);

export default TeaserPage;
