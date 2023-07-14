import { render,screen } from "@testing-library/react";
import DetailedPage from "../Detail/DetailedPage.jsx";
import '@testing-library/jest-dom';
import { BrowserRouter } from "react-router-dom";
import { MemoryRouter } from 'react-router-dom';

const mockedCar = {
    
        id: 1,
        name: 'Mercedez',
        shortDesc: 'This is an elegent car.',
        pricePerDay: 10025.00,
        imgLink: 'mercedez.jpg',
      
};
describe("Detailed Page", () => {

it("shows that the page goes to Loading until unless data fetched from backend", () => {
  const { getByText } = render(<DetailedPage />); 
  const loadingText = screen.getByText(/Loading/i);
  expect(loadingText).toBeInTheDocument();
});

it("renders the button", () => {
  render(<MemoryRouter><DetailedPage /></MemoryRouter>);

  const submitButton = screen.getByTestId("rentMe");
    expect(submitButton).toBeInTheDocument();
  });
});
