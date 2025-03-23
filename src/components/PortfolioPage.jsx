import React from "react";
import profileImage from "../assets/images/profile.png";
import useDocumentTitle from '../hooks/useDocumentTitle';


const AboutMe = () => {
  useDocumentTitle('Portfolio');

  return (
    <section
      className="about-section bg-gradient-to-b from-[#020617] via-[#0a0f1f] to-[#000D1A]/90 text-white py-16 flex items-center justify-center"
    >
      <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-8 justify-center">
        <div className="content max-w-2xl">
          <h2 className="text-[#4ECCA3] text-2xl font-bold mb-6">WHO AM I?</h2>
          <p className="text-lg leading-relaxed">
            I'm a Full-Stack Web Developer specializing in WordPress and custom solutions, from small business websites to enterprise-level solutions. With over 5 years of experience in custom theme and plugin development, I specialize in creating efficient, scalable web solutions that bring ideas to life.
          </p>
        </div>
        <div className="image-container">
          <img
            src={profileImage}
            alt="Raymond Turk, Full-Stack Web Developer from Cleveland, Ohio"
            className="w-72 h-72 rounded-lg object-cover"
            loading="lazy" // Add lazy loading
          />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
