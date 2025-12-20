const ContactUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-red-600 mb-8">
          Contact Us
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
            />
            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full"
            />
            <button className="btn bg-red-600 text-white w-full">
              Send Message
            </button>
          </form>

          {/* Info */}
          <div className="flex flex-col justify-center text-gray-700">
            <p className="mb-2">📞 Phone: +880-1XXXXXXXXX</p>
            <p className="mb-2">📧 Email: support@lifedrop.com</p>
            <p>
              We are always ready to help you in emergency blood donation needs.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
