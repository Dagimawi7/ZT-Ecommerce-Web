// Import React so we can use JSX and components
import React from 'react'

// Define NewsletterBox component
const NewsletterBox = () => {

  // Function to handle form submission
  // It prevents the page from refreshing when user submits
  const OnSubmitHandler = (event) =>{
    event.preventDefault();
  }

  // Return the JSX (UI) for the newsletter box
  return (
    // Outer div that centers the text
    <div className='text-center'>

      {/* Heading text for the newsletter offer */}
      <p className='text-2xl font-medium text-gray-800'>Subscribe now & get 20% off</p>

      {/* Small description under the heading */}
      <p className='text-gray-400 mt-3'>
        akjdhkad ahgaldfja alkdhfald falhdfg ald
      </p>

      {/* Newsletter form with input and button */}
      <form 
        onSubmit={OnSubmitHandler} // runs when form is submitted
        className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'
      >

        {/* Input box where user enters their email */}
        <input 
          className='w-full sm:flex-1 outline-none' 
          type="email" 
          placeholder='Enter your email' 
          required // makes sure email is required before submitting
        />

        {/* Submit button */}
        <button 
          type='submit' 
          className='bg-black text-white text-xs px-10 py-4'
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  )
}

// Export NewsletterBox so it can be used in other files
export default NewsletterBox
