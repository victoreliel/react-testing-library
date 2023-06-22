import userEvent from '@testing-library/user-event';
import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={ history }>{component}</Router>),
    history,
  });
};

describe('Testando a navegação do site', () => {
  it('testa se o topo da aplicação contém um conjunto fixo de links', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /favorite pokémons/i })).toBeInTheDocument();
  });

  it('testa o uso do link Home', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });

    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  it('testa o uso do link About', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });

    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  it('testa o uso do link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });

    userEvent.click(favoriteLink);
    expect(history.location.pathname).toBe('/favorites');
  });
});
