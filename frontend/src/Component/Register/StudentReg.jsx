import React, { useState }from 'react';
import {Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {toast} from 'react-tostify';
import './Register.css'

const initialState = {
  name:"",
  age:"",
  roomNum:"",
  email:"",
  gender:"",
  g_name:"",
  g_email:"",
  nationality:""

}


const StudentReg = () => {
  const [formData, setFormData] = useState(initialState);
  const [formValidMessage, setValidMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {name, age,roomNum, gender, email, g_name, g_email, nationality} = formData;
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setFormData({...formData, [name]: value});
     
  }
const registerStudent = async (e) => {
  e.preventDefault();

  if(!name || !age ||!roomNum || !email || !gender || !g_email || !g_name || !nationality)
    toast.error("all field required");
  return
}



  return (
    <div className="container form__ ">
    <div className="form-container">
      <p className="title"> Student Registration.</p>

      <form className="form">
        <div className="--dir-column">
          <label htmlFor="name">Student&apos;s Name:</label>
          <input
            type="text"
            className="input"
            name="name"
            placeholder="Enter student's name"
            required
            onChange={handleInputChange}
            value={formData.name}
          />
        </div>

        <div className="--dir-column">
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            className="input"
            name="age"
            placeholder="18"
            required
            min={0}
            onChange={handleInputChange}
            value={formData.age}
          />
        </div>

        <div className="--dir-column">
          <label htmlFor="roomNum">Room Number:</label>
          <input
            type="text"
            className="input"
            name="roomNum"
            placeholder="306"
            required
            onChange={formData.roomNum}
          />
        </div>

        <div className="--dir-column">
          <label htmlFor="email">Contact Email:</label>
          <input
            type="email"
            className="input"
            name="email"
            placeholder="example@yahoo.com"
            required
            onChange={handleInputChange}
            value={formData.email}
          />
        </div>

        <div className="--dir-column">
          <label htmlFor="g_name">Guardian&apos;s Name:</label>
          <input
            type="text"
            className="input"
            name="g_name"
            placeholder="Enter guardian's name"
            required
            onChange={handleInputChange}
            value={formData.g_name}
          />
        </div>

        <div className="--dir-column">
          <label htmlFor="g_email">Guardian&apos;s Email:</label>
          <input
            type="email"
            className="input"
            name="g_email"
            placeholder="example@yahoo.com"
            required
            onChange={handleInputChange}
            value={formData.g_email}/>
        </div>

        
        <div className="--dir-column">
          <label htmlFor="gender">Gender:</label>
          <input
            type="text"
            className="input"
            name="gender"
            required
            onChange={handleInputChange}
            value={formData.gender}/>
        </div>

        <div className="--dir-column">
          <label htmlFor="nationality">Nationality:</label>
          <input
            type="text"
            className="input"
            name="natioality"
            required
            onChange={handleInputChange}
            value={formData.nationality}/>
        </div>

        <button className="--btn">Add Student</button>
      </form>
    </div>
  </div>
  )
}

export default StudentReg
