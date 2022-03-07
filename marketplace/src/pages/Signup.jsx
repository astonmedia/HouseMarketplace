import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg"
import visibilityIcon from "../assets/svg/visibilityIcon.svg"
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth"
import { setDoc, doc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"
import OAuth from "../components/OAuth"

function Signup() {
  // Show password State
  const [showPassword, setShowPassword] = useState(false)
  // Form data state
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  })
  // Acces to state variables
  const { email, password, name } = formData
  // Initialise Navigate
  const navigate = useNavigate()
  // Adds data to the input boxes based on which input is selected
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }
  // Handles form submissions
  const onSubmit = async (e) => {
    e.preventDefault()
    // Creates user using firebase auth
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      // Gets user details back from newly created user
      const user = userCredential.user
      // Updates user profile
      updateProfile(auth.currentUser, { displayName: name })
      // Copy data from the state
      const formDataCopy = { ...formData }
      // remove password so its not in the database
      delete formDataCopy.password
      // Add a timestamp when it was added to the server
      formDataCopy.timestamp = serverTimestamp()
      // Set user in database
      await setDoc(doc(db, "users", user.uid), formDataCopy)
      // Redirects to home page
      navigate("/")
    } catch (error) {
      toast.error("Something went wrong with registration")
    }
  }
  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input
              type='text'
              className='nameInput'
              placeholder='Name'
              id='name'
              value={name}
              onChange={onChange}
            />
            <input
              type='email'
              className='emailInput'
              placeholder='Email'
              id='email'
              value={email}
              onChange={onChange}
            />
            <div className='passwordInputDiv'>
              <input
                type={showPassword ? "text" : "password"}
                className='passwordInput'
                placeholder='Password'
                id='password'
                value={password}
                onChange={onChange}
              />
              <img
                src={visibilityIcon}
                alt='show password'
                className='showPassword'
                onClick={() => setShowPassword((prevState) => !prevState)}
              />
            </div>
            <Link to='/forgot-password' className='forgotPasswordLink'>
              Forgot Password
            </Link>
            <div className='signUpBar'>
              <p className='signUpText'>Sign Up</p>
              <button className='signUpButton'>
                <ArrowRightIcon fill='#fffff' width='34px' height='34px' />
              </button>
            </div>
          </form>
          <OAuth />
          <Link to='/sign-in' className='registerLink'>
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  )
}

export default Signup
