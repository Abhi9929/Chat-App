import { BtnProps } from "../../types/auth.types";

function Button({label, onclick}: BtnProps) {
  return (
    <div>
      <button type="button" className=" text-white border bg-gray-900  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full hover:bg-black"
      onClick={onclick}
      >{label}</button>
    </div>
  );
}

export default Button