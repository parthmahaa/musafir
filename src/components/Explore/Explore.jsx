import React ,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import { FaRegHeart } from "react-icons/fa";

function Blogs() {
  const [explore,setExplore] = useState("")
  const getData = async() =>{
    try{
        const response = await fetch("http://localhost:5000/explore" , {
          method: "GET"
        }) 
        if(response.ok) {
          const data = await response.json()
          console.log(data.msg);
          setExplore(data.msg)
        }
        else{
          console.log("object");
        }
    }
    catch(err){
      console.log(`error: ${err}`);
    }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div class="mx-auto max-w-7xl px-2">
      <div class="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
      <p class="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
        Trending
      </p>
      <p class="max-w-4xl font-semibold text-gray-600 md:text-left">
      Looking to explore and get ideas about a new place? Use our platform to search for key insights on top attractions, and hidden gems. Whether you're interested in historical landmarks, outdoor adventures, or dining hotspots, our detailed info and user reviews will help you discover the best experiences. Plan your trips, and make your visit unforgettable.
      </p>
      <div class="mt-6 flex w-full items-center space-x-2 md:w-1/3">
        <input
          class="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          placeholder="Search Places"
        />
        <button
          type="button"
          class="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Search
        </button>
      </div>
    </div>

    <div class="mt-10 hidden w-full flex-col justify-between space-y-4 md:flex md:flex-row">
      <div class="flex w-full items-end border-b border-gray-300">
        <Link to='/explore'>
        <div class="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 first:border-black">
          Trending
        </div>
        </Link>

        <Link to='/cafe'>
          <div class="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-">
          Cafe
          </div>
        </Link>

        <Link to='/street_food'>
        <div class="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 ">
          Street Food
        </div>
        </Link>
        <Link to='/historical'>
        <div class="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 ">
          Historical Places
        </div>
        </Link>
      </div>
    </div>

    <div class="grid gap-6  gap-y-10 py-10 md:grid-cols-4 lg:grid-cols-3">
    {explore.length > 0 ? ( 
              explore.map((place, index) => ( 
                <div key={index} className="w-[405px] h-500px bg-white p-4 rounded-xl border-2 border-gray-300 overflow-hidden text-black">
                  <img
                    src={place.img} 
                    className="object-cover w-full h-48"
                    alt="image " 
                  />
                  <div className="flex flex-col gap-2 mt-4">
                    <p className="flex flex-row justify-between pt-2 text-black  text-lg font-medium">{place.tag} 
                    <Link className='pr-3 pt-1 text-xl  text-center hover:text-red-500'>
                    <FaRegHeart />
                    </Link></p>
                    <div className="flex text-black text-2xl font-bold">
                      <div id="priceDiscountCent">{place.name}</div> 
                    </div>
                    <div className="opacity-80 text-base font-semibold">
                      {place.description} 
                    </div>
                    {/* <p>Rating: {place.rating}⭐</p>  */}
                    <a
                      className="text-blue-600 underline mt-2"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={place.location} 
                    >
                      Directions
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">Loading Explore...</p> 
            )}
    </div>

  </div>
  <div class="mx-auto mt-12 max-w-7xl bg-gray-50">

  </div>
</div>
  )
}

export default Blogs