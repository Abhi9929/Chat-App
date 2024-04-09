import Header from '../../components/auth/Header';
import SubHeading from '../../components/auth/SubHeading';
import InputBox from '../../components/auth/InputBox';
import Button from '../../components/auth/Button';
import Bottom from '../../components/auth/Bottom';
import { useState } from 'react';
import axios from 'axios';
import URI from '../../config';
import { useNavigate } from 'react-router-dom';

function Signin() {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState({
    email: '',
    password: '',
  });
  const [mailError, setMailError] = useState('');
  const [passError, setPassError] = useState('');

  function handleClick(event) {
    event.preventDefault();
    async function signInUser() {
      try {
        const response = await axios.post(`${URI}/users/signin`, postInputs);
        const resData = await response.data;
        // const userData = resData.data.user
        const token = resData.data.token
        localStorage.setItem('token', JSON.stringify(token));
        navigate('/account');
      } catch (err) {
        const error = err?.response.data.message;
        setMailError(error);
        console.log('error occurs: ', err);
      }
    }
    signInUser();
  }

  return (
    <div className=' h-screen w-full flex justify-center items-center'>
      <div className=' flex flex-col justify-center items-center h-full w-full bg-slate-400'>
        <div className=' rounded-lg bg-white  w-80 text-center p-2 h-max px-4 border shadow-lg'>
          <Header label={'Signin'} />
          <SubHeading label={'Enter your Information to login'} />
          <InputBox
            type='email'
            label={'Email'}
            placeholder={'john@mail.com'}
            value={postInputs.email}
            onchange={(event) => {
              setPostInputs((prev) => ({
                ...prev,
                email: event?.target.value,
              }));
              setMailError('');
            }}
            message={mailError}
          />
          <InputBox
            type='password'
            label={'Password'}
            placeholder={'123456'}
            value={postInputs.password}
            onchange={(event) => {
              setPostInputs((prev) => ({
                ...prev,
                password: event?.target.value,
              }));
              setPassError('');
            }}
            message={passError}
          />
          <Button label={'Sign In'} onclick={handleClick} />
          <Bottom
            warning={'Create an account?'}
            to={'/signup'}
            label={'Sign up'}
          />
        </div>
      </div>
    </div>
  );
}

export default Signin;
