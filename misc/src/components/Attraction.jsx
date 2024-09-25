import React from 'react';

const attractions = [
  { name: 'Attraction 1', description: 'Description of attraction 1' },
  { name: 'Attraction 2', description: 'Description of attraction 2' },
  // Add more attractions here
];

const Attractions = () => {
  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl mb-4">Famous Tourist Attractions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {attractions.map((attraction, index) => (
          <div key={index} className="bg-white p-4 shadow-md">
            <h3 className="text-xl">{attraction.name}</h3>
            <p>{attraction.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attractions;
