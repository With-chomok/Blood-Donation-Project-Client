import { Link } from "react-router";

const DonationPreview = () => {
  return (
    <section className="bg-red-50 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-red-600">
            Recent Donation Requests
          </h2>
          <Link
            to="/donation-requests"
            className="text-red-600 font-semibold">
            View All →
          </Link>
        </div>

        {/* Dummy preview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="font-semibold text-lg mb-2">
                Blood Group: A+
              </h3>
              <p className="text-gray-600">Location: Dhaka</p>
              <p className="text-gray-600">Date: 25 Dec 2025</p>
              <Link
                to="/login"
                className="inline-block mt-4 text-red-600 font-semibold">
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationPreview;
