import React, { useState, useEffect } from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';
import styled from 'styled-components';
import axios from 'axios';
import { Layout, Wrapper, Header, Logo, Navigation } from '../components';
import { media } from '../utils/media';
import config from '../../config/SiteConfig';
import '../utils/prismjs-theme.css';

const Content = styled.article`
  grid-column: 2;
  box-shadow: 0 4px 120px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
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

const Title = styled.h1`
  margin-bottom: 4rem;
  text-align: center;
`;

const BeerGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
`;

const BeerEmoji = styled.div`
  font-size: 12rem;
`;

const NotFound = () => {
  const [beer, setBeer] = useState({
    name: '',
    description: '',
    abv: '',
    first_brewed: '',
    food_pairing: [],
  });

  useEffect(() => {
    async function fetchBeer() {
      const randomBeer = await axios('https://api.punkapi.com/v2/beers/random');
      setBeer(randomBeer.data[0]);
    }

    fetchBeer();
  }, []);

  return (
    <Layout>
      <Wrapper>
        <Helmet title={`Страницата не е пронајдена | ${config.siteTitle}`} />
        <Header>
          <Link to="/">
            <Logo scale={0.6} />
          </Link>
          <Navigation />
        </Header>
        <Content>
          <Title>404 <br/> Страницата не е пронајдена</Title>
          <div>
            <p>
              Рандом пиво од <strong>BrewDog</strong> како утешна награда:
            </p>
            <h3>"{beer.name}"</h3>
            <BeerGrid>
              <div>
                <blockquote>{beer.description}</blockquote>
                <p>ABV: {beer.abv}</p>
                <p>First brewed: {beer.first_brewed}</p>
                <h4>Food pairing:</h4>
                <ul>
                  {beer.food_pairing.map(p => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              {beer.image_url ? <img src={beer.image_url} alt={beer.name} /> : <BeerEmoji>🍺</BeerEmoji>}
            </BeerGrid>
          </div>
        </Content>
      </Wrapper>
    </Layout>
  );
};

export default NotFound;
