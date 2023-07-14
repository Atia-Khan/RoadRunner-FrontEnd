import { render,screen } from "@testing-library/react";
import DetailedPage from "../Detail/DetailedPage.jsx";

const mockedCar = {
    
        id: 1,
        name: 'Mercedez',
        shortDesc: 'This is an elegent car.',
        pricePerDay: 10025.00,
        imgLink: 'mercedez.jpg',
      
};

test("shows that the page goes to Loading until unless data fetched from backend", () => {
  const { getByText } = render(<DetailedPage />);
 
  const loadingText = screen.getByText(/Loading/i);
  expect(loadingText).toBeInTheDocument();
});