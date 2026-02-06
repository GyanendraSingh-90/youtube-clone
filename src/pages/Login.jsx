import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const res = await api.post("/auth/login", {
        email,
        password
      });

      // Save token
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);

      alert("Login successful");
      navigate("/"); // redirect to home
    } 
    catch (err) {
      console.error(err);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <h2>Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {/* Button MUST be type submit */}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
