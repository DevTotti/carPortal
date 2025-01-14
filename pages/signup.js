import React, { useState, useEffect } from "react";
import { RotateSpinner } from 'react-spinners-kit'
import axios from 'axios'
import Toast from "../components/Toast"
import styles from '../styles/Login.module.css'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'



function Signup() {
    // const history = useHistory()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [toastInfo, setToastInfo] = useState({})
    
    const registered = () => {
      const int = setInterval(() => {
        // history.push('/login')
        
      }, 2000);
      return () => {
        clearInterval(int)
      }
    }
  
    const register = async () => {
      setLoading(true)
      const data = {
        name,
        email,
        password,
        password2: confirmPassword,
        phone
      }
  
      axios.post('https://thecarportal.herokuapp.com/user/register/', data)
      .then(response => {
        console.log(response);
        setLoading(false)
        setToastInfo({title: "Success!", msg: "Your registration was successful", bg: "#26a62e"})
        setShowToast(true)
        setConfirmPassword('')
        setEmail('')
        setName('')
        setPassword('')
        setPhone('')
        registered()
      })
      .catch(error => {
        console.log(error.response);
        console.log(error.message);
        setLoading(false)
        if(error.response.status >= 400){
          setToastInfo({title: "Error!", msg: `${error.response.data.email[0]}`, bg: "#df4759"})
          setShowToast(true)
          setConfirmPassword('')
          setEmail('')
          setName('')
          setPhone('')
          setPassword('')
        }else {
          setToastInfo({title: "Error!", msg: `${error.message}`, bg: "#df4759"})
          setShowToast(true)
          setConfirmPassword('')
          setEmail('')
          setPhone('')
          setName('')
          setPassword('')  
        }
      });
    }
  
    const formSubmit = (e) => {
      e.preventDefault()
      if(!name || !email || !password || !confirmPassword){
        setShowToast(true)
        setToastInfo({title: "Error!", msg: "Ensure all fields are filled", bg: "#df4759"})
      
      } else if(password !== confirmPassword){
          setToastInfo({title: "Error!", msg: "Password & confirm password must match", bg: "#df4759"})
          setShowToast(true)
          setConfirmPassword('')
          setPhone('')
          setPassword('')
      
      } else if(password.length < 8 ){
        setToastInfo({title: "Error!", msg: "Password must be at least 8 characters", bg: "#df4759"})
        setShowToast(true)
        setConfirmPassword('')
        setPhone('')
        setPassword('')
      
      }  else {
          setLoading(true)
          register()
        }
    }
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowToast(false)
      }, 5000);
      return () => {
        clearTimeout(timer)
      }
    }, [toastInfo])
  
  
    return (
      <>
      <Head>
        <title>CarPotal | Sign Up</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <section className={styles.login}>
          <div className={styles.imgBx}>
            <img
              src='https://res.cloudinary.com/rafael-uwadone/image/upload/v1626603482/car-portal/anvesh-reddy-BuTs5lRqsbk-unsplash_g5qbgv.jpg'
              alt=""
            />
          </div>
          <div className={styles.contentBx}>
            <div className={styles.formBx}>
              <h2>Sign Up</h2>
              <form action="">
                <div className={styles.inputBx}>
                  {/* <h5>Email</h5> */}
                  <div className="i">
                    <i className="fas fa-at"></i>
                  </div>
                  <input
                    type="email"
                    name="email"
                    placeholder="email"
                    className={styles.input}
                    autoComplete="off"
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                  />
                </div>
                <div className={styles.inputBx}>
                  {/* <h5>Username</h5> */}
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className={styles.input}
                    autoComplete="off"
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                  />
                </div>
                <div className={styles.inputBx}>
                  {/* <h5>Phone</h5> */}
                  <div className="i">
                    <i className="fas fa-user"></i>
                  </div>
                  <input
                    type="phone"
                    placeholder="Phone Number"
                    name="phone"
                    className={styles.input}
                    autoComplete="off"
                    value={phone}
                    onChange={(e)=> setPhone(e.target.value)}
                  />
                </div>
                <div className={styles.inputBx}>
                  {/* <h5>Password</h5> */}
                  <div className="i">
                    <i className="fas fa-lock"></i>
                  </div>
                  <input
                    type="password"
                    name="password"
                    className={styles.input}
                    autoComplete="off"
                    placeholder="Password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                  />
                </div>
                <div className={styles.inputBx}>
                  {/* <h5>Retry Password</h5> */}
                  <div className="i">
                    <i className="fas fa-lock"></i>
                  </div>
                  <input
                    type="password"
                    name="confirmPassword"
                    className={styles.input}
                    placeholder="Confirm Password"
                    autoComplete="off"
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className={styles.inputBtn} onClick={formSubmit}>
                {!loading ?
                   <input type="submit" value="Sign up" />
                   :
                   <div style={{margin:'50px'}}>
                     <RotateSpinner size={30} color={'#2fd03a'} loading={loading}/>
                   </div>
                  }
                </div>
                
                <div className={styles.link}>
                  <p>
                    Already have an account? <Link href="/login"><a>Login</a></Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          {showToast && <Toast info={toastInfo}/>}
        </section>
      </>
    );
  }
  

export default Signup
