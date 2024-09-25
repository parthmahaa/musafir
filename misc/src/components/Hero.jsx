import React from 'react';

const Hero = () => {
  return (
    <div className="bg-cover bg-center h-96" style={{ backgroundImage: "url('https://example.com/hero-image.jpg')" }}>
      <div className="bg-black bg-opacity-50 h-full flex items-center justify-center">
        <h1 className="text-white text-4xl">Explore the City</h1>
      </div>
    </div>
  );
};

export default Hero;
