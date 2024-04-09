/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MouseEvent } from 'react'
import { useState } from 'react'
import { SigninType } from '@abhi.makedevs/common-01'
import axios from 'axios'
import { BACKEND_URL } from '../../config'
import Header from './Header'
import SubHeading from './SubHeading'
import InputBox from './InputBox'
import Button from './Button'
import Bottom from './Bottom'
import { useNavigate } from 'react-router-dom'

function SigninModal() {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SigninType>({
    email: '',
    password: ''
  })
  const [error, setError] = useState('');
  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    async function signInUser() {
      try {
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/user/signin`
          ,
          postInputs
        )
        const data = await response.data;
        // console.log(data);
        localStorage.setItem("token", JSON.stringify(data.accessToken))
        
        navigate('/blogs');
      } catch (err) {      
        //@ts-ignore
        const error = err?.response.data.error;
        setError(error)
        console.log("error occurs: ", error);
      }
    }
    signInUser();
  }

  return (
    <div className=" flex flex-col justify-center items-center h-full">
          <div className=" rounded-lg bg-white  w-80 text-center p-2 h-max px-4">
            <Header label={"Signin"} />
            <SubHeading label={"Enter your Information to login"} />
            <InputBox
              type='email'
              label={"Email"}
              placeholder={"john@mail.com"}
              value={postInputs.email}
              onchange={
                (event) => {
                  setPostInputs(prev => ({
                  ...prev,
                  email: event?.target.value
                }))
                setError('')
              }}
              message={error}
            />
            <InputBox
              type='password'
              label={"Password"}
              placeholder={"123456"}
              value={postInputs.password}
              onchange={
                (event) => {
                  setPostInputs(prev => ({
                  ...prev,
                  password: event?.target.value
                }))
                setError('')
              }}
              message={error}
            />
            <Button label={"Sign In"} onclick={handleClick} />
            <Bottom warning={"Create an account?"} to={"/signup"} label={"Sign up"} />
          </div>
        </div>
  )
}

export default SigninModal