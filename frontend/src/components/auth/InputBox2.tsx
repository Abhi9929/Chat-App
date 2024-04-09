import { InputProps } from '../../types/auth.types'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

function InputBox2({ type, label, placeholder, onchange, value, message }: InputProps) {
  let error: boolean = false
  if (message !== '') {
    error = true;
  }

  const [visible, setVisibility] = useState(false);

  const Icon = <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} />;


  type = visible ? "text" : "password";



  return (
    <div className="my-6 relative">
      <div className="text-sm font-medium text-left">{label}</div>
      <input
        placeholder={placeholder}
        value={value}
        type={type}
        className={`px-2 py-1 w-full border rounded  ${error ? 'border-red-500' : 'border-slate-200'}`}
        onChange={onchange}
        required={true}
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
}

export default InputBox2