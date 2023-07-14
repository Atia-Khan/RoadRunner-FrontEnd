import React from 'react'
import Header from '../Header/Header';
import './thankyou.css';
import checkMark from '../../images/check-mark.png';
import { useNavigate } from 'react-router-dom';

const ThankYou = () => {
  const nav = useNavigate();

  const handleNavigation = () =>{
    nav("/");
  }


  
 return (
    <>
    <Header />

    <div className="mainContainer">
<div className='text'> 
<h1 data-testId="thankYou">Thank You!</h1>
<img src={checkMark} alt="checkMark" data-testId="checkMark" />

<div className="btn">
<button onClick={handleNavigation} data-testId="navigate">Go To Home</button>

</div>

</div>

    </div>
    

    </>
  )
}

export default ThankYou