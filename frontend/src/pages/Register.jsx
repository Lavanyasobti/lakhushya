import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("");

  return (
    <div className="min-h-screen bg-[#FBF7F2] flex items-center justify-center">

      {/* Card */}
      <div className="bg-white p-8 rounded-2xl shadow-md w-[420px] animate-fade-in">

        {/* Heading */}
        <h2 className="text-2xl font-bold text-green-700 text-center">
          Create Account 🌱
        </h2>

        <p className="text-gray-500 text-center mt-1">
          Join Lakhushiya and start making a difference
        </p>

        {/* Full Name */}
        <input
          className="w-full border p-3 rounded-lg mt-6"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />


        {/* Email */}
        <input
          className="w-full border p-3 rounded-lg mt-4"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />


        {/* Role */}
        <select
          className="w-full border p-3 rounded-lg mt-4 focus:outline-green-500"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="">Select Role</option>
          <option>Admin</option>
          <option>Donor</option>
          <option>Volunteer</option>
          <option>NGO</option>
        </select>

        {/* Password */}
        <input
          type="password"
          className="w-full border p-3 rounded-lg mt-4"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />


        {/* Confirm Password */}
        <input
          type="password"
          className="w-full border p-3 rounded-lg mt-4 focus:outline-green-500"
          placeholder="Confirm Password"
        />

        {/* Register Button */}
        <button
  className="w-full bg-green-500 text-white py-3 rounded-lg mt-6 font-semibold"
  onClick={() => {
    fetch("http://localhost:5000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        password,
        role
      })
    })
      .then(res => res.text())
      .then(data => {
        alert(data);
        navigate("/login");
      });
  }}
>
  Register
</button>


        {/* Login Redirect */}
        <p
          onClick={() => navigate("/login")}
          className="text-sm text-green-600 mt-4 cursor-pointer text-center"
        >
          Already have an account? Login
        </p>

      </div>
    </div>
  );
}
