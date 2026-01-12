import React from "react";
import Banner from "./Banner/Banner";
import Featured from "./Feature/Featured";
import DonationPreview from "./DonationPreview/DonationPreview";
import ContactUs from "./Contact/ContactUs";
import { motion } from "framer-motion";
import Blogs from "./Blog/Blogs";
import Newsletter from "./news/Newsletter";
import FAQ from "./faq/FAQ";
import Testimonial from "./text/Testmonial";
import CallToAction from "./CallToAction/CallToAction";
import Services from "./service/Services";

const fadeInUp = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6 },
};

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}>
      <Banner />



      <motion.div {...fadeInUp}>
        <Services />
      </motion.div>



      <motion.div {...fadeInUp}>
        <Featured />
      </motion.div>

      <motion.div {...fadeInUp}>
        <DonationPreview />
      </motion.div>

      <motion.div {...fadeInUp}>
        <Blogs />
      </motion.div>

      <motion.div {...fadeInUp}>
        <Testimonial />
      </motion.div>

      <motion.div {...fadeInUp}>
        <FAQ />
      </motion.div>

      <motion.div {...fadeInUp}>
        <Newsletter />
      </motion.div>

      <motion.div {...fadeInUp}>
        <CallToAction />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}>
        <ContactUs />
      </motion.div>
    </motion.div>
  );
};

export default Home;
