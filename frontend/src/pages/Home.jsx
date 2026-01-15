/*lakshita*/
import heroImage from "../assets/hero.png";
import { useNavigate } from "react-router-dom";
/*hi*/
export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#FBF7F2] min-h-screen">

      {/* ===== NAVBAR ===== */}
      <div className="flex justify-between items-center px-10 py-6">
        <h1 className="text-green-600 font-bold text-xl">💚 Lakhushiya</h1>

        <button
          onClick={() => navigate("/login")}
          className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold transition hover:bg-green-600"
        >
          Login / Register
        </button>
      </div>

      {/* ===== HERO SECTION ===== */}
      <div className="flex flex-col lg:flex-row items-center px-6 lg:px-10 mt-10 gap-10">


        {/* LEFT TEXT */}
        <div className="max-w-xl animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl">
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
            <button className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold transition hover:bg-green-600">
              Get Started
            </button>

       <button
  onClick={() => {
    const section = document.getElementById("learn-more");
    const y = section.getBoundingClientRect().top + window.pageYOffset - 100;
    window.scrollTo({ top: y, behavior: "smooth" });
  }}
  className="border border-green-500 text-green-600 px-6 py-3 rounded-lg font-semibold transition hover:bg-green-500 hover:text-white"
>
  Learn More
</button>

          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center lg:justify-end">
       <img
          src={heroImage}
           alt="Helping illustration"
          className="
           w-full 
           max-w-full 
          lg:max-w-[600px] 
          xl:max-w-[700px]
            h-auto 
          rounded-2xl 
          object-cover
          animate-slide-in"
        />
      </div>



      </div>

      {/* ===== LEARN MORE SECTION ===== */}
<div
  id="learn-more"
  className="pt-24 scroll-mt-24"
  style={{ scrollMarginTop: "120px" }}
>
{/* ===== STATS BOXES ===== */}
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

  {/* ===== ABOUT SECTION ===== */}
  <div className="mt-16 px-10 py-16 bg-white">
    <h2 className="text-4xl font-bold text-green-900 text-center">
      About Lakhushiya
    </h2>

    <p className="text-gray-600 max-w-3xl mx-auto mt-6 text-center leading-relaxed">
      Lakhushiya is a platform that connects donors, NGOs, and volunteers
      to reduce food waste and spread happiness. Our mission is to turn
      surplus resources into smiles by ensuring that excess food reaches
      those who need it the most.
    </p>
  </div>

</div>
</div>
  );
}
