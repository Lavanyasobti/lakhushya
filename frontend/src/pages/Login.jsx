import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

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
          placeholder="Email"
          className="w-full mt-6 p-3 border rounded-lg focus:outline-green-500"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mt-4 p-3 border rounded-lg focus:outline-green-500"
        />

        <button className="w-full mt-6 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition">
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
