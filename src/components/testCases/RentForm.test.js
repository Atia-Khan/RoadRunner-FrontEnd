import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import RentForm from '../RentForm/RentForm.jsx';


describe("Confirmation", () => {
    
    it("renders Confirmation component", () => {
      render(<MemoryRouter><RentForm /></MemoryRouter>);
      expect(screen.getByText("Booking Form")).toBeInTheDocument();
    });
        test('renders the form fields', () => {
          render(<MemoryRouter><RentForm /></MemoryRouter>);
          
          
          expect(screen.getByTestId("name")).toBeInTheDocument();
          expect(screen.getByTestId("number")).toBeInTheDocument();
          expect(screen.getByTestId("address")).toBeInTheDocument();
          expect(screen.getByTestId("driverLicense")).toBeInTheDocument();
          expect(screen.getByTestId("pricePerDay")).toBeInTheDocument();
       
          expect(screen.getByTestId("pickupDate")).toBeInTheDocument();
          expect(screen.getByTestId("dropofDate")).toBeInTheDocument();
          expect(screen.getByTestId("totalDays")).toBeInTheDocument();
          expect(screen.getByTestId("totalPrice")).toBeInTheDocument();
        
          expect(screen.getByTestId("damageprotection")).toBeInTheDocument();
          
        const submitButton = screen.getByTestId("changeCar");
          expect(submitButton).toBeInTheDocument();
        });
});