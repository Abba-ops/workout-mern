import { useState } from "react";
import useSignUp from "../hooks/useSignUp";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, loading, error } = useSignUp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    signup(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="signup">
      <h3>Sign Up</h3>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={loading}>Sign Up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}
