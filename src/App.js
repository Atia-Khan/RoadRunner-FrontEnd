
import CarsList from "./components/Cart/CarsList";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailedPage from "./components/Detail/DetailedPage";
import RentForm from './components/RentForm/RentForm';
import ThankYou from "./components/ThankYou/ThankYou";
function App() {
  return (
  <BrowserRouter>
  <Routes>
  <Route exact path="/" element={<CarsList />} />
        <Route path="/cars/:id" element={<DetailedPage />} />
        <Route path="/Rentform/:id" element={<RentForm />} />
        <Route path="/ThankYou" element={<ThankYou />} />


  </Routes>
  
  </BrowserRouter>
    // <div className="App">
    //  <CarsList />
    // </div>
  );
}

export default App;
