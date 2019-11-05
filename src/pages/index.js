import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import { LandingLayout, Article, Wrapper, Button, SectionTitle } from '../components';
import { media } from '../utils/media';

const BigLink = styled.a`
  font-size: 2rem;
  color: #4392f1;
`;

const IndexPage = ({ data }) => {
  console.log(data.allMarkdownRemark.edges[0].node.frontmatter.path);
  const { frontmatter } = data.allMarkdownRemark.edges[0].node;

  return (
    <LandingLayout>
      <div>
        <BigLink href={frontmatter.path}>[ {frontmatter.title} ]</BigLink>
      </div>
    </LandingLayout>
  );
};

export default IndexPage;

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export const IndexQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { in: ["announcements", "events"] } } }
      limit: 1
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            date
            path
          }
          html
        }
      }
    }
  }
`;
