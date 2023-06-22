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

describe('Testa o componente Pokemon', () => {
  it('testa se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);

    const img = screen.getByRole('img', { name: /pikachu sprite/i });
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';

    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-weight')).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', imgUrl);
  });

  it('testa se o tipo do pokemon está correto', () => {
    renderWithRouter(<App />);

    expect(screen.getByTestId('pokemon-type', { name: /electric/i })
      .innerHTML).toBe('Electric');
  });

  it('testa se o card do pokémon contém um link de mais detalhes funcional', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });

    expect(moreDetails).toBeInTheDocument();

    userEvent.click(moreDetails);
    expect(history.location.pathname).toBe('/pokemons/25');
  });

  it('testa se existe um ícone de favorito funcional', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getAllByRole('link', { name: /more details/i });

    userEvent.click(moreDetails[0]);
    const favoriteCheckbox = screen.getByLabelText(/pokémon favoritado?/i);

    userEvent.click(favoriteCheckbox);
    const favoriteIcon = screen.getByRole('img', { name: /is marked as favorite/i });

    expect(favoriteIcon).toBeInTheDocument();
    expect(favoriteIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
