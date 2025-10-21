'use client'
import React from "react";
import { useFormStatus } from "react-dom";

const SubmitButton = ({type,text}) => {
    const {pending} = useFormStatus()
  return (
    <div>
      <button
        type="submit"
        disabled={pending}
        className="px-6 py-3 bg-amber-500 text-white font-semibold rounded hover:bg-amber-600 transition-colors w-full"
      >
        {pending ? `${text}` : `${type}`}
      </button>
    </div>
  );
};

export default SubmitButton;
