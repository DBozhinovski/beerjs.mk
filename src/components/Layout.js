/* eslint no-unused-expressions:0 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';
import SEO from './SEO';
import theme from '../../config/Theme';
import { media } from '../utils/media';

const GlobalStyle = createGlobalStyle`
  ::selection {
    color: ${theme.colors.bg};
    background: ${theme.colors.primary};
  }
  body {
    background: ${theme.colors.bg};
    color: ${theme.default};
    font-display: swap;
    @media ${media.phone} {
      font-size: 14px;
    }
  }
  a {
    // color: ${theme.colors.grey.dark};
    // Make this part of the theme at some point
    color: #4392f1; 
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
  .friends {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 1.3rem;

    a {
      margin-bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      margin-bottom: 0;
    }

    .current {
      display: flex;
      // align-items: space-between;

      img {
        width: 30vw;
        padding: 1vw;
      }
    }

    .past {
      display: flex;

      img {
        width: 10vw;
        pading: 0.5vw
      }
    }
  }
`;

const Footer = styled.footer`
  text-align: center;
  padding: 3rem 0;
  span {
    font-size: 0.75rem;
  }
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          buildTime(formatString: "DD.MM.YYYY")
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme}>
        <>
          <SEO />
          <GlobalStyle />
          {children}
          <Footer>
            By BeerJS Skopje.&nbsp;
            <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/?source=follow_footer--------------------------follow_footer-">
              CC BY-NC-SA 4.0
            </a>
            &nbsp;
            <br />
            <a href="https://github.com/DBozhinovski/beerjs.mk">GitHub Repository</a> <br />
            <span>Last build: {data.site.buildTime}</span>
          </Footer>
        </>
      </ThemeProvider>
    )}
  />
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired,
};
