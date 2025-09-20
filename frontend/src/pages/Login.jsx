import React, { useState } from 'react'

const Login = () => {

  // State to keep track if user is on "Login" or "Sign Up"
  const [currentState, setCurrentState] = useState('Sign Up');

   // Function to handle form submit (stops page from refreshing)
  const onSubmitHandler = async (event) => {
    event.preventDefault();
  }

// What will show on the screen
  return (
       // Form container with Tailwind styles
      <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>

           {/* Title and underline (changes between Login/Sign Up) */}
        <div className='inline-flex items-center gap-2 mb-2 mt-10'>
          <p className='font-libre-baskerville text-3xl'>{currentState}</p>
          <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
        </div>

         {/* Show name input only when on Sign Up */}
        {currentState === 'Login' ? '' : <input type="text" className='w-full px-3 py-2 border border-gray-800' placeholder='name' required />  }
         {/* Always show email input */}
        <input type="email" className='w-full px-3 py-2 border border-gray-800' placeholder='Email' required />
         {/* Always show password input */}
        <input type="password" className='w-full px-3 py-2 border border-gray-800' placeholder='Password' required />

         {/* Small links: forgot password + toggle between Login/Sign Up */}
        <div className='w-full flex justify-between text-sm mt-[-8px]'>
          <p className='cursor-pointer'>Forgot Your Password?</p>
          {
            currentState === 'Login'
            ? <p onClick={()=>setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
            : <p onClick={()=>setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
          }
        </div>
        
        {/* Button text changes depending on state */}
        <button className='bg-black text-white font-light px-8 py-2 mt-4'>{currentState === 'Login' ? 'Sign In' : 'Sign Up'}</button>
        
      </form>
  )
}

export default Login
