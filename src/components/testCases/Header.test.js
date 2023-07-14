import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Header from '../Header/Header';
import { MemoryRouter } from 'react-router-dom';


describe("Header", () => {
    
    it("It should render Header Components", () => {
      render(<MemoryRouter><Header /></MemoryRouter>);

    });
        test('render the header components', () => {
          render(<MemoryRouter><Header /></MemoryRouter>);
expect(screen.getByTestId("logo")).toBeInTheDocument();
        });
    });
