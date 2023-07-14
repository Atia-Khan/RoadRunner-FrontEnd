import React from 'react';
import { render, screen, act } from '@testing-library/react';
import CarsList from '../Car/CarsList';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';


const dummyCars = [
    {
        id: 1,
        name: 'Mercedez',
        shortDesc: 'This is an elegent car.',
            pricePerDay: 10025.00,
        imgLink: 'mercedez.jpg',
      },
      {
        id: 2,
        name: 'Bugatti',
        shortDesc: 'Powerful and elegence car',
        pricePerDay: 2564.00,
        imgLink: 'bugatti.png',
      }, 
];

fetchMock.enableMocks();
fetchMock.mockResponseOnce(JSON.stringify(dummyCars));

describe('CarsList testing', () => {
    // it('test that all the components of CarList are rendering smoothly', async () => {
    //   await act(async () => {
    //     render(
    //       <MemoryRouter>
    //         <CarsList />
    //       </MemoryRouter>
    //     );
    //   });
    //   expect(screen.getByText('Bugatti')).toBeInTheDocument();
    // expect(screen.getByText('This is an elegent car.')).toBeInTheDocument();
    // expect(screen.getByText('Rs:10025.00')).toBeInTheDocument();
    // expect(screen.getByAltText('Car Images')).toBeInTheDocument();

    // expect(screen.getByText('Mercedez')).toBeInTheDocument();
    // expect(screen.getByText('Powerful and elegence car')).toBeInTheDocument();
    // expect(screen.getByText('Rs: 2564.00')).toBeInTheDocument();
    // expect(screen.getByAltText('Car Images')).toBeInTheDocument();
    // });


    it("shows that the page goes to Loading until unless data fetched from backend", () => {
      const { getByText } = render(<CarsList />);
     
      const loadingText = screen.getByText(/Loading/i);
      expect(loadingText).toBeInTheDocument();
    });

    it('render the text successfully', () => {
      render(<MemoryRouter><CarsList /></MemoryRouter>);
  const element = screen.getByText(/Welcome to Road Runner/i);
  expect(element).toBeInTheDocument();
  
  });

});