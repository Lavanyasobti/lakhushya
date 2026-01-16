
import { useNavigate } from "react-router-dom";
import heroImage from "../assets/hero.png";

export default function Home() {
  const navigate = useNavigate();

  const scrollToLearn = () => {
    const section = document.getElementById("learn-more");
    const y = section.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="bg-[#FBF7F2] min-h-screen relative">

      {/* ===== NAVBAR ===== */}
      <div className="flex justify-between items-center px-10 py-6">
        <h1 className="text-green-600 font-bold text-xl">💚 Lakhushya</h1>
        <button
          onClick={() => navigate("/login")}
          className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold transition hover:bg-green-600 hover:scale-105"
        >
          Login / Register
        </button>
      </div>

      {/* ===== SCROLLING MARQUEE / ALERT BANNER ===== */}
      <div className="bg-green-500 text-white py-2 overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap">
          <span className="mx-10 font-semibold">🎉 1200+ Donations made this month!</span>
          <span className="mx-10 font-semibold">📢 Upcoming Event: Food Drive on 20th Jan!</span>
          <span className="mx-10 font-semibold">💚 Join our volunteers and spread smiles!</span>
          <span className="mx-10 font-semibold">🏆 5000+ Smiles created so far!</span>
        </div>
      </div>

      {/* ===== FLASHING ALERT ===== */}
      <div className="bg-red-500 text-white px-4 py-2 rounded-lg w-max animate-pulse font-bold mx-auto mt-4">
        ⚡ New Event: Donate & Participate this Sunday!
      </div>

      {/* ===== HERO SECTION ===== */}
      <div className="flex flex-col lg:flex-row items-center px-6 lg:px-10 mt-10 gap-10">

        {/* LEFT TEXT */}
        <div className="max-w-xl animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
            Turning Surplus <br />
            <span className="text-green-500">into Smiles</span>
          </h1>
          <p className="text-gray-600 mt-6">
            Connect donors with NGOs to create meaningful impact.
            Share your surplus, spread happiness, and build stronger
            communities together.
          </p>

          {/* BUTTONS */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={() => navigate("/register")}
              className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition hover:bg-green-600 hover:scale-105"
            >
              Get Started
            </button>

            <button
              onClick={scrollToLearn}
              className="flex items-center gap-2 border border-green-500 text-green-600 px-6 py-3 rounded-lg font-semibold transition hover:bg-green-500 hover:text-white hover:scale-105"
            >
              Learn More <span className="animate-bounce">⬇️</span>
            </button>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <img
            src={heroImage}
            alt="Helping illustration"
            className="w-full max-w-full lg:max-w-[600px] xl:max-w-[700px] h-auto rounded-2xl object-cover shadow-lg transition transform hover:scale-105"
          />
        </div>
      </div>

      {/* LEARN MORE */}
      <div id="learn-more" className="pt-24 scroll-mt-24">

        {/* STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 lg:px-10 mt-24">
          <div className="bg-white p-6 sm:p-8 rounded-xl text-center shadow-sm transition transform hover:-translate-y-2 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-green-600">5,000+</h2>
            <p className="text-gray-600 mt-2">Smiles Created</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-xl text-center shadow-sm transition transform hover:-translate-y-2 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-green-600">1,200+</h2>
            <p className="text-gray-600 mt-2">Donations Made</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-xl text-center shadow-sm transition transform hover:-translate-y-2 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-green-600">150+</h2>
            <p className="text-gray-600 mt-2">NGO Partners</p>
          </div>
          <div className="bg-white p-6 sm:p-8 rounded-xl text-center shadow-sm transition transform hover:-translate-y-2 hover:shadow-lg">
            <h2 className="text-2xl font-bold text-green-600">50+</h2>
            <p className="text-gray-600 mt-2">Cities Reached</p>
          </div>
        </div>

        {/* ABOUT */}
        <div className="mt-16 px-10 py-16 bg-white rounded-xl shadow-md">
          <h2 className="text-4xl font-bold text-green-900 text-center">About Lakhushya</h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-6 text-center leading-relaxed">
            Lakhushya is a platform that connects donors, NGOs, and volunteers
            to reduce food waste and spread happiness. Our mission is to turn
            surplus resources into smiles by ensuring that excess food reaches
            those who need it the most.
          </p>
        </div>

        {/* TESTIMONIALS */}
        <div className="mt-24 px-6 lg:px-10">
          <h2 className="text-3xl font-bold text-center text-green-600">What People Say</h2>
          <div className="flex overflow-x-scroll gap-6 mt-6 p-4 scrollbar-hide">
            <div className="bg-white p-6 rounded-xl shadow-md min-w-[250px] flex-shrink-0">
              <p>"Thanks to Lakhushya, I could donate surplus food easily!"</p>
              <h4 className="mt-4 font-bold text-green-600">- Aman</h4>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md min-w-[250px] flex-shrink-0">
              <p>"Our NGO reached more people than ever."</p>
              <h4 className="mt-4 font-bold text-green-600">- Reena</h4>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md min-w-[250px] flex-shrink-0">
              <p>"Connecting volunteers and donors has never been easier."</p>
              <h4 className="mt-4 font-bold text-green-600">- Sahil</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}