import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>),
    history,
  });
};

describe('Testa a página NotFound', () => {
  it('testa se a página contém um "h2" com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    expect(screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i })).toBeInTheDocument();
  });

  it('testa se a página mostra a imagem de NotFound', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByAltText(/pikachu crying/i);
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', imgUrl);
  });
});
