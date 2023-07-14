import React, { useEffect, useState } from "react";
import  styles from "./carList.module.css";
import {  Link, useNavigate } from 'react-router-dom';
import RentForm from '../RentForm/RentForm';
import { Box } from "@mui/material";
import Header from "../Header/Header";

const CarsList = () => {
 const nav = useNavigate();
    const [carList, setCarList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

const navigateForm = () => {
 nav('./RentForm.jsx');
}


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
      <div className={styles.mainContainer}>

        <div className={styles.homePage}>

        </div>

        <div className={styles.cars}>
        {carList.map((car, index) => {
            if(index <= 4){
            return (
         <div>
            <div key={car.id} className={styles.carcard}>
                <div>
                    <img src={car.imgLink} alt="cars"  />
                </div>
                <div className={styles.textContainer}>
                    <Link to={`/cars/${car.id}`} style={{textDecoration: 'none'}}>
                    <h1 className={styles.carName}>{car.name}</h1>
                    </Link>
                    <p>{car.shortDesc}</p>
                    <p className={styles.price}>Rs:{car.pricePerDay}</p>
                </div>
                <div>
                    <Link to={`/Rentform/${car.id}`}>
                    <button type="submit" >Rent Me</button>
                    </Link>
                </div>

            </div> 
       
        </div>
            )
            }
        })}
        </div>
       
            </div>
     
  
    </>
  )
}

export default CarsList