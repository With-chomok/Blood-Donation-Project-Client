import React from "react";
import Banner from "./Banner/Banner";
import Featured from "./Feature/Featured";
import DonationPreview from "./DonationPreview/DonationPreview";
import ContactUs from "./Contact/ContactUs";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <Featured></Featured>
      <DonationPreview></DonationPreview>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
