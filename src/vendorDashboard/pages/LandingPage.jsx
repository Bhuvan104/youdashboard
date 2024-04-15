import React ,{useState} from 'react'
import NavBar from '../components/NavBar'
import SideBar from '../components/SideBar'
import Login from '../components/forms/Login'
import Register from '../components/forms/Register'
import AddFirm from '../components/forms/AddFirm'
import AddProduct from '../components/forms/AddProduct'
import Welcome from '../components/Welcome'
import AllProduct from '../components/AllProduct'
const LandingPage = () => {
    const [showLogin,setShowLogin]=useState(false)
    const [showRegister,setShowRegister]=useState(false)
    const [showFirm,setshowFirm]=useState(false)
    const [showProduct,setshowProduct]=useState(false)
    const [showWelcome,setshowwelcome]=useState(false)
    const [showallProduct,setshowallProduct]=useState(false)
    const showLoginHandler=()=>{
        setShowLogin(true)
        setShowRegister(false)
        setshowFirm(false)
        setshowProduct(false)
        setshowwelcome(false)
    }
    
    const showRegisterHandler=()=>{
        setShowRegister(true)
        setShowLogin(false)
        setshowFirm(false)
        setshowProduct(false)
        setshowwelcome(false)
    }
    const showFirmHandler=()=>{
        setShowLogin(false)
        setShowRegister(false)
        setshowFirm(true)
        setshowProduct(false)
        setshowwelcome(false)
    }
    const showProductHandler=()=>{
        setShowLogin(false)
        setShowRegister(false)
        setshowFirm(false)
        setshowProduct(true)
        setshowwelcome(false)
    }
    const setshowwelcomeHandler=()=>{
        setShowLogin(false)
        setShowRegister(false)
        setshowFirm(false)
        setshowProduct(false)
        setshowwelcome(true)
    }
    const showAllProductHandler=()=>{
        setShowLogin(false)
        setShowRegister(false)
        setshowFirm(false)
        setshowProduct(false)
        setshowwelcome(false)
        setshowallProduct(true)
    }
    
    
  return (
    <>
    <section className='landingSection'>
        <NavBar showLoginHandler={showLoginHandler} showRegisterHandler={showRegisterHandler}  ></NavBar>
        <div className="collectionSection">
        <div className="sideBar">
        <SideBar showFirmHandler={showFirmHandler} showAllProductHandler={showAllProductHandler} showProductHandler={showProductHandler} ></SideBar>
        </div>
        <div className="mainBar">
            {showLogin && <Login setshowwelcomeHandler={setshowwelcomeHandler}></Login> }
            {showRegister && <Register showLoginHandler={showLoginHandler}></Register>}
            {showFirm && <AddFirm></AddFirm>}
            {showProduct && <AddProduct></AddProduct>}
            {showWelcome && <Welcome></Welcome>}
            {showallProduct && <AllProduct></AllProduct>}
        </div>
        </div>
    </section>

    </>
  )
}

export default LandingPage
