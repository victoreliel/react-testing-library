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

const pikachuDetailsUrl = '/pokemons/25';

describe('Testa o componente PokemonDetails', () => {
  it('testa se as informações detalhadas do pokémon aparecem na tela', () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });

    history.push(pikachuDetailsUrl);

    expect(screen.getByText(/pikachu details/i)).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    expect(screen.getByRole('heading', {
      level: 2,
      name: /summary/i })).toBeInTheDocument();
    expect(screen.getByText(/This intelligent Pokémon/i)).toBeInTheDocument();
  });

  it('testa se existe uma seção com as localizações do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuDetailsUrl);

    const imgs = screen.getAllByRole('img', { name: /pikachu location/i });
    const imgsUrl = ['https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png'];

    expect(screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i })).toBeInTheDocument();
    expect(imgs).toHaveLength(2);

    imgs.forEach((img, index) => {
      expect(img).toHaveAttribute('src', imgsUrl[index]);
    });
  });

  it('testa se o usuário pode favoritar um pokémon na página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pikachuDetailsUrl);
    const favoriteCheckbox = screen.getByLabelText(/pokémon favoritado?/i);

    expect(favoriteCheckbox).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);
    const favoriteIcon = screen.getByRole('img', { name: /is marked as favorite/i });

    expect(favoriteIcon).toBeInTheDocument();

    userEvent.click(favoriteCheckbox);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
