import React, { useState, useEffect } from "react";
// import "./BookingForm.css";
import { Box } from "@mui/material";
import { useParams, Link, useNavigate } from "react-router-dom";
import ThankYou from "../ThankYou/ThankYou";
import "./rentform.css";
import Header from '../Header/Header';

const BookingForm = () => {
  const [selectedCar, setSelectedCar] = useState("");
  const [checked, setChecked] = useState(false);
  // const [confirmationStatus, setConfirmationStatus] = useState(false);

  const nav = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pickupDate: "",
    dropofDate: "",
    totalPrice: "",
    driverLicense: "",
    number: "",
    carId: ""
    
  });


  

  useEffect(() => {
    fetch(`http://localhost:8082/cars/get/${id}`)
      .then(response => response.json())
      .then(data => setSelectedCar(data))
      .catch(error => console.log(error));

      let oldData = localStorage.getItem("userData");
      oldData = JSON.parse(oldData);
      if(oldData){
        console.log("old data jis",oldData);
        setFormData({
          name:oldData.name,
          address: oldData.address,
          number: oldData.number,
          dropofDate: oldData.drop,
          pickupDate: oldData.pickup,
          driverLicense: oldData.driverLicense,
          totalDays: oldData.totalDays,
        })
      }
    
  }, [id]);
  // console.log(selectedCar.pricePerDay);
 

  const handleChecked = (event) => {
    setChecked(event.target.checked);
  }

  const {
    name,
    number,
    address,
    pickupDate,
    dropofDate,
    driverLicense,
    carId,
    totalPrice,
  
  } = formData;

  const navigateHome = () => {
    console.log("clicked");
    nav('/');
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTotalDays = () => {
    const pick = new Date(pickupDate);
    const drop = new Date(dropofDate);
   const totalDays= Math.ceil((drop - pick) / (1000 * 60 * 60 * 24));
    return totalDays + 1;
  };

  const calculateTotalPrice = () => {
    const pricePerDay = selectedCar.pricePerDay;
    const totalDays = calculateTotalDays();
    const totalPrice = pricePerDay * totalDays;
    return totalPrice;
  };
  const calculateTotalProtectionCoverage = () => {
    const coveragePerDay = 15000;
    const totalDays = calculateTotalDays();
    return coveragePerDay * totalDays;
  };
  const calculateOrderPrice = () => {
    const totalPrice = calculateTotalPrice();
    const totalProtectionCoverage = calculateTotalProtectionCoverage();
    return totalPrice + totalProtectionCoverage;
  };
 
  function handleLocalStorage(){

    const userData ={
      name: name,
      address: address,
      number: number,
      pickup: pickupDate,
      drop: dropofDate,
      driverLicense: driverLicense, 
    }
    localStorage.setItem("userData", JSON.stringify(userData));
nav('/');
  }



    const handleCheckOut= (e) => {
      e.preventDefault();

      if(checked === false){
        const formInfo = {
          carId: selectedCar.id,
          name: name,
          number: number,
          address: address,
          driverLicense: driverLicense,
          pickup:pickupDate,
          drop: dropofDate,
          totalPrice: calculateTotalPrice()
        }
        fetch('http://localhost:8083/forms/post', {
          method: 'POST' ,
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formInfo),
        })
        .then((response) => response.json())
            .then(response => {
                console.log("store the actual price without damage protection.")
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });
      
        }
        else {
          const formInfoWithDamageProtection ={
            carId: selectedCar.id,
            name: name,
            number: number,
            address: address,
            driverLicense: driverLicense,
            pickup:pickupDate,
            drop: dropofDate,
            totalPrice: calculateOrderPrice()
          }
          fetch('http://localhost:8083/forms/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formInfoWithDamageProtection)
        })
            .then(response => {
                console.log("store the price with damage Protection")
      
            })
            .catch(error => {
                console.error('Error saving data:', error);
            });
      
            const DamageProtection = {
              carId: 6,
              name: name,
            number: number,
            address: address,
            driverLicense: driverLicense,
            pickup:pickupDate,
            drop: dropofDate,
            totalPrice: calculateTotalProtectionCoverage()
            }
            fetch('http://localhost:8083/forms/post', {
                      method: 'POST',
                      headers: {
                          'Content-Type': 'application/json'
                      },
                      body: JSON.stringify(DamageProtection)
                  })
                      .then(response => {
                          console.log("store the damage protection too..")
      
                      })
                      .catch(error => {
                          console.error('Error saving data:', error);
                      });
                    } 
                    localStorage.clear();
                  
                    nav('/ThankYou');
                    
                  }

    // const totalNights = calculateTotalNights();
    // const totalPrice = calculateTotalPrice();
    // const taxAmount = calculateTax();
    // const totalPriceWithTax = calculateTotalWithTax();

  //   const data = {
  //     name: formData.name,
  //     address: formData.address,
  //     number: formData.number,
  //     pickup: formData.pickupDate,
  //     drop: formData.dropofDate,
  //     carId: selectedCar.id,
  //     driverLicense: formData.driverLicense,
  //     totalPrice: calculateTotalPrice(),
  //     damageProtection: calculateOrderPrice(),
  //   };

  //   console.log(data);
  //   fetch("http://localhost:8083/forms/post", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   })
  //     .then((response) => response.json())
  //     .then((responseData) => {
  //       console.log("Booking data sent:", responseData);
  //       if (responseData.ok) {
          
         
  //         setConfirmationStatus(true);

  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error sending booking data:", error);
  //     });

  //   nav("/confirmationpage");
  // };

  return (
<>
    <Header/>
    <Box className="booking">


      <h1>Please Fill the Form for Booking Your Car</h1>


      <Box className="outerBox">


        <div key={selectedCar.id} className="carcard">
          <div>
            <img src={selectedCar.imgLink} alt="cars" />
          </div>
          <div className="textContainer">
            <Link to={`/cars/${selectedCar.id}`} style={{ textDecoration: 'none' }}>
              <h1 className="carName">{selectedCar.name}</h1>
            </Link>
            <p className="shortDesc">{selectedCar.shortDesc}</p>
            <p className="price"><bolder>{selectedCar.pricePerDay}</bolder></p>
          </div>

        </div>
        <div className="booking-form-container" >
          <h2>Booking Form</h2>
          <form onSubmit={handleCheckOut} className="booking-form">
            <div className="form-field">
              <label htmlFor="name">Name:</label>
              <input
              data-testId="name"
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="number">Contact Number:</label>
              <input
                type="text"
                data-testId="number"
                id="number"
                name="number"
                value={number}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                data-testId="address"
                name="address"
                value={address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="driverLicense">Driver's License Number</label>
              <input
                type="text"
                data-testId="driverLicense"
                id="driverLicense"
                name="driverLicense"
                value={driverLicense}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="pickupDate">Pickup Date:</label>
              <input
                type="datetime-local"
                data-testId="pickupDate"
                id="pickupDate"
                name="pickupDate"
                value={pickupDate}
                onChange={handleChange}
                required
              />
            </div>



            <div className="form-field">
              <label htmlFor="dropofDate">Drop of Date:</label>
              <input
                type="datetime-local"
                id="dropofDate"
                data-testId="dropofDate"
                name="dropofDate"
                value={dropofDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="pricePerDay">Price per Day:</label>
              <input
                type="text"
                data-testId="pricePerDay"
                id="pricePerDay"
                value={selectedCar.pricePerDay}
                readOnly
              />
            </div>

            <div className="form-field">
              <label htmlFor="totalDays">Total Days:</label>
              <input
                type="text"
                data-testId="totalDays"
                placeholder="0"
                id="totalDays"
                value={calculateTotalDays()}
                readOnly
              />
            </div>



            <div>

              <label htmlFor="DamageCoverage">Do You Need Damage Protection?</label>
              <input
                type="checkbox"
                data-testId="damageprotection"
                id="damageprotection"
                name="protection"
                placeholder="0"
                onChange={handleChecked}
             

              />

            </div>

            {checked ? (
              <div>
                <p>Damage Protection Amount per day is: <strong>Rs:15000/-</strong> </p>
                <div className="form-field">
                  <label htmlFor="totalProtectionCoverage">Total Protection Coverage:</label>
                  <input
                    type="text"
                    data-testId="totalProtectionCoverage"
                    id="totalProtectionCoverage"

                    value={calculateTotalProtectionCoverage()}
                    readOnly
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="orderPrice">Order Price(Including Damage Protection):</label>
                  <input
                    type="text"
                    data-testId="OrderPrice"
                    id="orderPrice"
                    value={calculateOrderPrice()}
                    readOnly
                  />
                </div>

              </div>
            ) : (
              <div className="form-field">
                <label htmlFor="totalPrice">Total Amount:</label>
                <input
                  type="text"
                  data-testId="totalPrice"
                  id="totalPrice"

                  value={calculateTotalPrice()}
                  readOnly
                />
              </div>
            )}





            <button
               onClick={handleCheckOut} data-testId="Checkout"
              className="submit-button">
            CheckOut
            </button>


          
            

          </form>

          <button
               onClick={handleLocalStorage} data-testId="changeCar"
              className="changeCarBtn">
              Choose Another Car
            </button>
        </div>
        {/* {confirmationStatus && <ThankYou />} */}
      </Box>
    </Box>
  </>

  );
            }

export default BookingForm;
