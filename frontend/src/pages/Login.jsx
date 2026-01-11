import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF7F2]">

      <div className="bg-white p-8 rounded-2xl shadow-md w-[360px] animate-fade-in">

        <h2 className="text-2xl font-bold text-green-700 text-center">
          Welcome Back 💚
        </h2>

        <p className="text-gray-500 text-center mt-2">
          Login to continue
        </p>

        <input
  type="email"
  className="w-full mt-6 p-3 border rounded-lg"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>


        <input
  type="password"
  className="w-full mt-4 p-3 border rounded-lg"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>


        <button
  className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg"
  onClick={() => {
    fetch("http://localhost:5000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);

        localStorage.setItem("userId", data.userId);
        localStorage.setItem("role", data.role);

        if (data.role === "Donor") {
          navigate("/donor-dashboard");
        } else if (data.role === "Volunteer") {
          navigate("/volunteer-dashboard");
        }
      });
  }}
>
  Login
</button>


        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <span
            className="text-green-600 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>

    </div>
  );
}
