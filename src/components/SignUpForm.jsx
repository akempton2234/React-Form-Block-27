import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
  
    try {
      const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        // Clear any existing success message
        setSuccessMessage(null); 
        return;
      }
  
      const result = await response.json();
      // Log the result object
      console.log("API Result:", result); 
  
      // Update the token using the setToken function
      setToken(result.token);
  
      // Display success message
      // Set the success message
      setSuccessMessage("Sign up successful!"); 
      // Clear any existing error
      setError(null); 
    } catch (error) {
      setError(error.message);
      // Clear any existing success message
      setSuccessMessage(null); 
    }
  }

  return (
    <>
      <h2>Sign Up</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}
