import React from 'react';
import { render, screen } from '@testing-library/react';
import { FavoritePokemons } from '../pages';

describe('Testa a página Favorite Pokémons', () => {
  it('testa se sem favoritos aparece a mensagem "No favorite pokemon found"', () => {
    render(<FavoritePokemons />);

    expect(screen.getByText(/No favorite pokemon found/i)).toBeInTheDocument();
  });
});
