import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import React from 'react';

function InputBox({ type, label, placeholder, onchange, value, message }) {

  const [visible, setVisibility] = useState(false);

  const Icon = <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} />;


  const InputType = visible ? "text" : "password";


  let mailError
  let passError
  let nameError

  if (message == 'name is required') {
    nameError = true;
  }
  if (message == 'email already exists') {
    mailError = true;
  }
  if (message == 'password must be 8 characters') {
    passError = true;
  }

  const inputComponent = () => {
    if (type === "email")
      return (
        <div className="my-6 relative">
          <div className="text-sm font-medium text-left">{label}</div>
          <input
            placeholder={placeholder}
            value={value}
            type={type}
            className={`px-2 py-1 w-full border rounded  ${mailError ? 'border-red-500' : 'border-slate-200'}`}
            onChange={onchange}
            required
          />
          <p className='text-left text-red-500'>{message}</p>
        </div>

      )
    if (type === "password")
      return (
        <div className="my-6 relative">
          <div className="text-sm font-medium text-left">{label}</div>
          <input
            placeholder={placeholder}
            value={value}
            type={InputType}
            className={`px-2 py-1 w-full border rounded  ${passError ? 'border-red-500' : 'border-slate-200'}`}
            onChange={onchange}
            required
          />
          <button className=" bg-transparent absolute top-[26px] right-2 text-slate-500 text-[14px]"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setVisibility(!visible);
            }}
          >
            {Icon}
          </button>
          <p className='text-left text-red-500'>{message}</p>
        </div>
      )
      else {
        return (
          <>
          <div className="text-md  font-bold text-left ">{label}</div>
          <input
            type="text"
            min={1}
            placeholder={placeholder}
            className={`px-2 py-1 w-full border rounded  ${nameError ? 'border-red-500' : 'border-slate-200'}`}
            value={value}
            onChange={onchange}
            required
          />
          <p className='text-left text-red-500'>{message}</p>
        </>
      );
    }
  }

  return <>{inputComponent()}</>;
}

export default InputBox