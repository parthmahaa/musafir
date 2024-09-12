
import React from 'react'

export default function About() {
  return (
      <div className="py-16 bg-white">
          <div className="container m-auto px-6 text-gray-600 md:px-12 xl:px-6">
              <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
                  <div className="md:5/12 lg:w-5/12">
                      <img
                          src="https://www.torontosom.ca/wp-content/uploads/2022/04/the-difference-between-international-and-domestic-tourism.jpg"
                          alt="image"
                      />
                  </div>
                  <div className="md:7/12 lg:w-6/12">
                      <h2 className="text-2xl text-gray-900 font-bold md:text-4xl">
                          Musafir is a platform designed for passionate travellers.
                      </h2>
                      <p className="mt-6 text-gray-600">
                      Discover the best tourist spots in the city with our comprehensive guide. Our website offers detailed information on must-see attractions, hidden gems, historical landmarks, local dining,street food, entertainment, and outdoor activities.
                      </p>
                      <p className="mt-4 text-gray-600">
                      Easily plan your trip with maps, itineraries, and insider tips to make the most of your visit. Whether you're looking for family-friendly spots or cultural experiences, our site has everything you need for a memorable stay.
                      </p>
                  </div>
              </div>
          </div>
      </div>
  );
}
