import React, { useEffect ,useState } from 'react';
import { Link } from 'react-router-dom';
function Cafe() {
  const [cafes,setCafes] = useState("")
  const getData = async() =>{
    try{
        const response = await fetch("http://localhost:5000/cafe" , {
          method: "GET"
        }) 
        if(response.ok) {
          const data = await response.json()
          console.log(data.msg);
          setCafes(data.msg)
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
    <>
      <div>Name
        <div className="mx-auto max-w-7xl px-2">
          <div className="flex flex-col space-y-8 pb-1 pt-1 md:pt-24">
            <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
              Cafe
            </p>
            <p className="max-w-4xl font-semibold text-gray-600 md:text-left">
              Cafés across the city offer diverse experiences, from cozy
              neighborhood spots with artisanal brews to bustling downtown cafés
              perfect for people-watching. Each place has its own vibe, whether
              it's rustic charm or sleek modern design, catering to both quiet
              work sessions and social gatherings. With unique menus and
              specialty drinks, every visit feels like a new discovery.
            </p>
            <div className="mt-6 flex w-full items-center space-x-2 md:w-1/3">
              <input
                className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                type="text"
                placeholder="Search Places"
              />
              <button
                type="button"
                className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Search
              </button>
            </div>
          </div>

          <div className="mt-10 hidden w-full flex-col justify-between space-y-4 md:flex md:flex-row">
            <div className="flex w-full items-end border-b border-gray-300">
              <Link to="/explore">
                <div className="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 ">
                  Trending
                </div>
              </Link>

              <Link to="/cafe">
                <div className="cursor-pointer  px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 first:border-black">
                  Cafe
                </div>
              </Link>

              <Link to="/street_food">
                <div className="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 ">
                  Street Food
                </div>
              </Link>
              <Link to="/historical">
                <div className="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 ">
                  Historical Places
                </div>
              </Link>
            </div>
          </div>
          <div className="grid gap-6  gap-y-20  py-10 pb-56 md:grid-cols-4 lg:grid-cols-3">
          {cafes.length > 0 ? ( 
              cafes.map((cafe, index) => ( 
                <div key={index} className="w-[405px] h-500px bg-white p-4 rounded-xl border-2 border-gray-300 overflow-hidden text-black">
                  <img
                    src={cafe.img} 
                    className="object-cover w-full h-48"
                    alt={cafe.name} 
                  />
                  <div className="flex flex-col gap-2 mt-4">
                    <p className="pt-2 text-black text-lg font-medium">{cafe.tag}</p> 
                    <div className="flex text-black text-2xl font-bold">
                      <div id="priceDiscountCent">{cafe.name}</div> 
                    </div>
                    <div className="opacity-80 text-base font-semibold">
                      {cafe.description} 
                    </div>
                    <p>Rating: {cafe.rating}⭐</p> 
                    <a
                      className="text-blue-600 underline mt-2"
                      target="_blank"
                      rel="noopener noreferrer"
                      href={cafe.location} 
                    >
                      Directions
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">Loading cafes...</p> // Display loading text if no cafes
            )}
          </div>
          </div>
        </div>
    </>
  );
}

export default Cafe;
