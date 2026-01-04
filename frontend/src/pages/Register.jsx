import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

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
          className="w-full border p-3 rounded-lg mt-6 focus:outline-green-500"
          placeholder="Full Name"
        />

        {/* Email */}
        <input
          className="w-full border p-3 rounded-lg mt-4 focus:outline-green-500"
          placeholder="Email"
        />

        {/* Role */}
        <select
          className="w-full border p-3 rounded-lg mt-4 focus:outline-green-500"
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
          className="w-full border p-3 rounded-lg mt-4 focus:outline-green-500"
          placeholder="Password"
        />

        {/* Confirm Password */}
        <input
          type="password"
          className="w-full border p-3 rounded-lg mt-4 focus:outline-green-500"
          placeholder="Confirm Password"
        />

        {/* Register Button */}
        <button className="w-full bg-green-500 text-white py-3 rounded-lg mt-6 font-semibold hover:bg-green-600 transition">
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
