

import React, {useState, useCallback, useContext} from 'react'
import './Register.css'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import PasswordInput from '../PasswordInput/PasswordInput';
import { UserContext } from '../../../context/userContext';
import axios from 'axios';

const Login = () => {

  const [formData, setFormData]  = useState({
    email: "",
    password: "",
  })

  const [formValidMessage, setFormValidMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate()
  const {setUser} = useContext(UserContext)

  const handleInputChange = useCallback((e) =>{
    setFormValidMessage("")
    const {name, value} = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }))
  }, [])

  const logInUser = useCallback((e) => {
    e.preventDefault()

    const {email, password} = formData;

    if(!email || !password) {
      setFormValidMessage("All field are required");
      return
    }
    setIsSubmitting(true); // submission proces occuring

    // axios is used for request(http or Api)
    axios
        .post(`http://localhost:3500/admin/login`, formData)
        .then((response) => {
          setUser(response.data);
          setIsSubmitting(false);
          toast.success("Login successful");
          navigate("/homedash", { state: { user: response.data } });  // the user data will be readily available in the route we navigate to{name, mail, details etc}
        }).catch((error) => {
          setIsSubmitting(false)
          const message = error.response?.status === 400 ? "Invalid Login Credential" : "Server error"
          setFormValidMessage(message)
        })
  }, [formData, navigate, setUser]
);

    return (
    <div className="container form__ --100vh">
      <div className="form-container">
        <p className="title"> Login as an Admin</p>

        <form className="form" onSubmit={logInUser}>

          <div className="--dir-column">
            <label htmlFor="email">Email:</label>
            <input 
            type="email"
            className="input"
            name="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleInputChange}
            />
          </div>

          <div className="--dir-column">
            <label htmlFor="password">Password:</label>
            <PasswordInput
                  placeholder="Enter your password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                />
          </div>


          <button className="--btn" disabled={isSubmitting}>
            {isSubmitting ? "Signing In...." : "Sign In"}
          </button>
        </form>
        {formValidMessage && (
          <p className='error-message'>{formValidMessage}</p>
        )}
        <p>
          Don&apos;t have an account yet? <Link to='/'>Register</Link> {" "}
        </p>
      </div>
    </div>
  );
}

export default Login