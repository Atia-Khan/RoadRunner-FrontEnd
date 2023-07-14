import '@testing-library/jest-dom';
import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import React from 'react';


import { MemoryRouter } from 'react-router-dom';
import ThankYou from '../ThankYou/ThankYou.jsx';


describe("Thank You", () => {
    
    it("renders the ThankYou component", () => {
      render(<MemoryRouter><ThankYou /></MemoryRouter>);
      expect(screen.getByTestId("thankYou")).toBeInTheDocument();
    });


    it("renders the button", () => {
        render(<MemoryRouter><ThankYou /></MemoryRouter>);
      
        const submitButton = screen.getByTestId("navigate");
          expect(submitButton).toBeInTheDocument();
        });

        it('render the img file', () => {
            render(<MemoryRouter><ThankYou /></MemoryRouter>);
  expect(screen.getByTestId("checkMark")).toBeInTheDocument();

});
it('render the text successfully', () => {
    render(<MemoryRouter><ThankYou /></MemoryRouter>);
const element = screen.getByText(/Thank You!/i);
expect(element).toBeInTheDocument();

});


   

});