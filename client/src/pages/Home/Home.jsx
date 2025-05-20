import "../../scss/Home.scss";

import Navbar from "../../components/Navbar/Navbar";
import Hero from "../../components/Hero/Hero";
import AboutUs from "../../components/AboutUs/AboutUs";
import HowToBegin from "../../components/HowToBegin/HowToBegin";
import WhatPeopleAreSaying from "../../components/WhatPeopleAreSaying/WhatPeopleAreSaying";
import Footer from "../../components/Footer/Footer";
import ScrollReveal from "../../components/ScrollMotion/ScrollMotion";

export default function Home() {
  return (
    <>
      <div className="home">
        <Navbar />
        <Hero />
      </div>
      <ScrollReveal>
        <AboutUs />
      </ScrollReveal>
      <ScrollReveal>
        <HowToBegin/>
      </ScrollReveal>
      <ScrollReveal>
        <WhatPeopleAreSaying/>
      </ScrollReveal>
      <Footer/>
    </>
  );
}
