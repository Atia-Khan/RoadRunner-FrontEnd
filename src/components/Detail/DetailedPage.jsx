
import Header from '../Header/Header';
import React, { useEffect, useState } from "react";
import { Typography, Button } from "@mui/material";
import { useParams, Link } from "react-router-dom";

import "./Detail.css";

const DetailedPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8082/cars/get/${id}`)
      .then((response) => response.json())
      .then((data) => setCar(data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!car) {
    return <div>Loading...</div>;
  }

  return (
<>
    <Header />
    <div className="container">
      <img src={car.imgLink} alt={car.name} className="image" />
      <Typography variant="h5" className="title bold">
        {car.name}
      </Typography>
      <Typography variant="subtitle1" className="subtitle bold">
        Description: {car.shortDesc}
      </Typography>
      
      <Typography variant="body1" className="description bold">
        Details: {car.longDesc}
      </Typography>
      
      
      <Typography variant="subtitle1" className="subtitle bold">
        Price per Day: Rs:{car.pricePerDay}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
        className="button">
        Return to Search Page
      </Button>

      <Button
        variant="contained"
        color="primary"
        component={Link}
        to={`/Rentform/${car.id}`}
        className="button">
        Rent Me Now
      </Button>
    </div>
    </>
  );
};

export default DetailedPage;
