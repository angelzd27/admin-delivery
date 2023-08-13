import React, { useState } from 'react'

const FormInput = (props) => {

  const { label, errormessage, onChange, id, ...inputProps} = props;

  return (
<>
<label className=" text-lg font-medium">{ props.label }</label>
     <input
          {...inputProps}
          className='bg-slate-50 w-full border-2 border-gray-300 rounded-xl p-4 mt-1 mb-2 bg-transparent'
          onChange={onChange}
            /> 
     
</>
    
  )
}

export default FormInput