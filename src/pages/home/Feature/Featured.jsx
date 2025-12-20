import { FaTint, FaUsers, FaClock, FaHeart } from "react-icons/fa";

const features = [
  {
    icon: <FaTint className="text-red-600 text-3xl" />,
    title: "Emergency Blood Requests",
    desc: "Post and respond to urgent blood donation needs instantly.",
  },
  {
    icon: <FaUsers className="text-red-600 text-3xl" />,
    title: "Verified Donors",
    desc: "All donors are verified for safety and reliability.",
  },
  {
    icon: <FaClock className="text-red-600 text-3xl" />,
    title: "Quick Response",
    desc: "Fast connection between donor and recipient.",
  },
  {
    icon: <FaHeart className="text-red-600 text-3xl" />,
    title: "Save Lives",
    desc: "Your contribution can save someone’s life today.",
  },
];

const Featured = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-12">
          Why Choose LifeDrop?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-red-50 p-6 rounded-xl shadow hover:shadow-lg transition text-center">
              <div className="mb-4 flex justify-center">{item.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Featured;
