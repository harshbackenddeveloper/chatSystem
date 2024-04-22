import React, { useState } from 'react'
import '../../assets/Css/Login.css'
import { Link } from 'react-router-dom'
import { makeApi } from '../helper/MakeApi'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((oldVal) => ({
      ...oldVal,
      [name]: value
    }))
  }
  const onSubmit = async(e) => {
    e.preventDefault();
    try {
      const userlogin = await makeApi('post', '/UserLogin', userData)
      console.log(userlogin);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="login">
        <div className="loginunder">
          <form onSubmit={onSubmit}>
            <div className="login-container shadow-lg">
              <h4 className='text-center text-white mt-3'>Login</h4>
              <div className="login-under">
                <i className="fa-solid fa-user"></i>
              </div>
              <div className='inputdata mb-4'>
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="text"
                  className='text-white'
                  placeholder='Email ID'
                  id='email'
                  name='email'
                  onChange={handleChange}
                  value={userData.email}
                />
              </div>
              <div className='inputdata mb-4'>
                <i className="fa-solid fa-eye"></i>
                <input
                  type="text"
                  className='text-white'
                  placeholder='Password'
                  id='password'
                  name='password'
                  onChange={handleChange}
                  value={userData.password}
                />
              </div>
              <div className='d-flex justify-content-between flex-wrap inputtext'>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    defaultValue=""
                    id="defaultCheck1"
                  />
                  <label className="form-check-label text-white" htmlFor="defaultCheck1">
                    Remember me
                  </label>
                </div>
                <a href='' className='text-white text-decoration-none'>Forgot password</a>
              </div>
              <div className='d-flex justify-content-center mt-4'>
                <button className='Sumbitbtn' type='submit'>Login</button>
              </div>
              <div className="inputtext mt-3">
                <p className='text-white text-center'>Don't have an account yet?<Link to="/register">Registered</Link></p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default Login