import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../pages/About';

describe('Testando a página About', () => {
  it('testa se a página contém um "h2" com o texto "About Pokédex"', () => {
    render(<About />);

    expect(screen.getByRole('heading', { level: 2, name: /about pokédex/i }))
      .toBeInTheDocument();
  });

  it('testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);

    expect(screen.getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
    expect(screen.getByText(/One can filter Pokémons by type/i)).toBeInTheDocument();
  });

  it('testa se a página contém a imagem correta de uma Pokédex', () => {
    render(<About />);

    const img = screen.getByRole('img');
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', imgUrl);
  });
});
