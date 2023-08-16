import { useState } from "react";

export default function Authenticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleClick() {
    try {
      // Check if the token is being passed correctly
      console.log("Token:", token); 
      
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Check the response object
      console.log("Response:", response); 
      
      const result = await response.json();
      // Check the parsed result
      console.log("Result:", result); 
  
      setSuccessMessage(result.message);
    } catch (error) {
      setError(error.message);
    }
  }
  

  return (
    <div>
      <h2>Authenticate</h2>
      {successMessage && <p>{successMessage}</p>}
      {error && <p>{error}</p>}
      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}