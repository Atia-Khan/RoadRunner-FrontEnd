import React, { useEffect, useState } from "react";
import "./carList.css";
import {  Link } from 'react-router-dom';
import RentForm from './RentForm';
import { Box } from "@mui/material";
import Header from "./Header";

const CarsList = () => {
    const [carList, setCarList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch("http://localhost:8082/cars/getallcars")
        .then((response) => response.json())
        .then((data) => {
          setCarList(data);
          console.log(data);
          setLoading(false);
        })
        .catch((errors) => {
          setError(error);
          setLoading(false);
        });
    }, []);
    
    if(loading){
        return <div>Loading.....</div>
    }

    if(error){
        return <div>Error: {error.message}</div>
    }
  return (
    <>
   
      <Header />
      <div className="mainContainer">
        {carList.map((car) => {
            return (
         <div>
            <div key={car.id} className="carcard">
                <div>
                    <img src={car.imgLink} alt="cars"  />
                </div>
                <div className="textContainer">
                    <Link to={`/cars/${car.id}`} style={{textDecoration: 'none'}}>
                    <h1 className="carName">{car.name}</h1>
                    </Link>
                    <p className="shortDesc">{car.shortDesc}</p>
                    <p className="price">{car.pricePerDay}</p>
                </div>
                <div>
                    <Link to={`/form/${car.id}`}>
                    <button type="submit">Rent Me</button>
                    </Link>
                </div>

            </div>
           
            {/* <RentForm key={car.id}/> */}
       
        </div>
            )
        })}

       
            </div>
     
  
    </>
  )
}

export default CarsList