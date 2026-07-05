import React from 'react'

const FormGroup = ({label, placeholder, value, onChange, type = 'text'}) => {
  return (
    <div>
      <div className='form-group'>
        <label htmlFor={label}> {label} </label>
        <input type={type} id = {label} name={label} placeholder={placeholder} required
        value = {value} onChange={onChange}
        />
      </div>
    </div>
  )
}

export default FormGroup
