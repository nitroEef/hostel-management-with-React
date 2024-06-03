import React, { useState } from 'react'
import './PasswordInput.css'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'

const PasswordInput = ({placeholder, valye, onChange, name, Onpaste}) => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {
        setShowPassword(!showPassword);
    }

  return (
    <div className='password'>
        <input/>
      
    </div>
  )
}

export default PasswordInput
