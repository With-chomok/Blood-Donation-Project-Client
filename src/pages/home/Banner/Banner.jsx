import { useNavigate } from "react-router";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-red-50 py-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-red-600 mb-4">
          Donate Blood, Save Lives
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto mb-8">
          Your one drop of blood can be the reason for someone’s tomorrow.
          Become a donor or find help instantly.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/register")}
            className="btn bg-red-600 hover:bg-red-700 text-white px-8 rounded-full">
            Join as a Donor
          </button>

          <button
            onClick={() => navigate("/search")}
            className="btn btn-outline border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-8 rounded-full">
            Search Donors
          </button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
