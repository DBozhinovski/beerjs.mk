import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
// import kebabCase from 'lodash/kebabCase';
import { Layout, Wrapper, Header, SectionTitle, Logo, Navigation, Article } from '../components';
import { media } from '../utils/media';

import config from '../../config/SiteConfig';

const Content = styled.div`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  padding: 2rem 4rem;
  background-color: ${props => props.theme.colors.bg};
  z-index: 9000;
  margin-top: -3rem;
  @media ${media.tablet} {
    padding: 3rem 3rem;
  }
  @media ${media.phone} {
    padding: 2rem 1.5rem;
  }
`;

// const Title = styled.h3`
//   position: relative;
//   text-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
//   margin-bottom: 0.75rem;
// `;

const Category = ({ pageContext, data }) => {
  console.log(data.allMarkdownRemark);

  return (
    <Layout>
      <Wrapper>
        <Helmet title={`Categories | ${config.siteTitle} | ${pageContext.category}`} />
        <Header>
          <Link to="/">
            <Logo scale={0.6} />
          </Link>
          <Navigation />
        </Header>
        <Content>
          <SectionTitle>{pageContext.category}</SectionTitle>
          {data.allMarkdownRemark.edges.map(({ node }) => (
            <Article
              title={node.frontmatter.title}
              date={node.frontmatter.date}
              excerpt={node.excerpt}
              timeToRead={node.timeToRead}
              slug={node.frontmatter.path}
              categories={node.frontmatter.categories}
              key={node.frontmatter.path}
            />
          ))}
        </Content>
      </Wrapper>
    </Layout>
  );
};

export default Category;

Category.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.object.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export const postQuery = graphql`
  query($category: String!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { category: { eq: $category } } }
    ) {
      edges {
        node {
          html
          frontmatter {
            title
            date(formatString: "DD.MM.YYYY")
            path
            category
          }
          excerpt
          timeToRead
        }
      }
    }
  }
`;
