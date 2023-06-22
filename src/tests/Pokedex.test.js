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

describe('Testa a página Pokedex', () => {
  it('testa se a página contém um "h2" com o texto "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i })).toBeInTheDocument();
  });

  it('testa se o botão "Próximo pokémon" funciona e aparece o Charmander', () => {
    renderWithRouter(<App />);

    const nextPokButton = screen.getByTestId('next-pokemon');

    expect(nextPokButton).toBeInTheDocument();

    userEvent.click(nextPokButton);
    const charmander = screen.getByText('Charmander');

    expect(charmander).toBeInTheDocument();
  });

  it('testa se os botões de filtro existem e funcionam corretamente', () => {
    renderWithRouter(<App />);

    const buttonsLength = 7;
    const filterByTypeButtons = screen.getAllByTestId('pokemon-type-button');
    const buttonAllTypes = screen.getByText('All');
    const typesOfPokemon = [
      'Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];

    filterByTypeButtons.forEach((button, index) => {
      expect(button).toHaveTextContent(typesOfPokemon[index]);
    });

    expect(filterByTypeButtons).toHaveLength(buttonsLength);
    expect(buttonAllTypes).toBeInTheDocument();

    userEvent.click(buttonAllTypes);
    const pikachu = screen.getByText('Pikachu');
    const allButtonsLength = 9;
    const allButtons = screen.getAllByRole('button');

    expect(pikachu).toBeInTheDocument();
    expect(allButtons).toHaveLength(allButtonsLength);
  });
});
