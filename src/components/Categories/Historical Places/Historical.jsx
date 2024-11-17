import React ,{useState,useEffect,useContext} from 'react'
import { Link } from 'react-router-dom'
import { FaRegHeart ,FaHeart} from "react-icons/fa";
import { WishlistContext } from '../../../Context/WishlistContext';
import Spinner from '../../Spinner'
import { toast } from 'react-toastify';

function Historical() {
  const { wishlistItems, setWishlistItems } = useContext(WishlistContext);
  const email = localStorage.getItem('email');
  const [historical,setHistorical] = useState("")
  const [searchText, setSearchText] =useState("")

  const getData = async() =>{
    try{
        const response = await fetch("http://localhost:5000/historical" , {
          method: "GET"
        }) 
        if(response.ok) {
          const data = await response.json()
          console.log(data.msg);
          const placesWithLikedStatus = data.msg.map((cafe) => ({
            ...cafe,
            liked: wishlistItems.some((item) => item.Name === cafe.name),
          }));
          setHistorical(placesWithLikedStatus)
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

  const handleWishlistUpdate = async (h, isLiking) => {
    if (!email) {
      alert('Please login to add items to wishlist');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/wishlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          
            Name: h.name,
            Location: h.location,
            Rating: h.rating,
            Image: h.img,
            userEmail: email,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(
          isLiking ? 'Added to wishlist' : 'Removed from wishlist',
          data
        );

        // Update wishlist context
        if (isLiking) {
          setWishlistItems((prev) => [...prev, h]);
        } else {
          setWishlistItems((prev) =>
            prev.filter((item) => h._id !== h._id)
          );
        }
      } else {
        console.log('Failed to update wishlist');
      }
    } catch (error) {
      console.log('Error updating wishlist:', error);
    }
  };

  const handleLikeToggle = async (index) => {
    const h = historical[index];
    const isLiking = !h.liked;

    // Optimistically update UI
    setHistorical((prev) =>
      prev.map((place, i) =>
        i === index ? { ...place, liked: isLiking } : place
      )
    );

    // Make API call
    await handleWishlistUpdate(h, isLiking);
  };
  const searchWeb = async (text)=>{
    toast.info("This feature is still under development")
  }

  return (
    <>  
    <div>
      <div className="mx-auto max-w-7xl px-2">
      <div className="flex flex-col space-y-8 pb-10 pt-12 md:pt-10">
      <p className="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
        Historical Places

      </p>
      <p className="max-w-4xl font-semibold text-gray-600 md:text-left">
      Surat is steeped in history, with several sites that offer a glimpse into its rich past, including colonial influences, trade history, and ancient architecture.
      </p>
      <div className="mt-6 flex w-full items-center space-x-2 md:w-1/3">
        <input
          className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search Places"
        />
        <button
          type="button"
          onClick={() => searchWeb(searchText)}
          className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Search
        </button>
      </div>
    </div>
    
    <div className="mt-10 hidden w-full flex-col justify-between space-y-4 md:flex md:flex-row">
      <div className="flex w-full items-end border-b border-gray-300">
      <Link to='/explore'>
        <div className="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2">
          Trending
        </div>
        </Link>

        <Link to='/cafe'>
          <div className="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2">
          Cafe
          </div>
        </Link>

        <Link to='/street_food'>
        <div className="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 ">
          Street Food
        </div>
        </Link>
        <Link to='/historical'>
        <div className="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700  first:border-black first:border-b-2 ">
          Historical Places
        </div>
        </Link>
      </div>
    </div>
    <div className="grid gap-6  gap-y-20  py-10 pb-56 md:grid-cols-4 lg:grid-cols-3">
    {historical.length > 0 ? ( 
              historical.map((place, index) => ( 
                <div key={index} className="w-[405px] h-500px bg-white p-4 rounded-xl border-2 border-gray-300 overflow-hidden text-black">
                  <img
                    src={place.img} 
                    className="object-cover w-full h-48"
                    alt={place.name} 
                  />
                  <div className="flex flex-col gap-2 mt-4">
                  <p className="flex flex-row justify-between pt-2 text-black  text-lg font-medium">{place.tag} 
                  <Link
                      className='pr-3 pt-1 text-xl text-center flex items-center justify-center rounded-full p-2 transition-colors duration-300'
                      onClick={() => handleLikeToggle(index)} // Pass index to the like toggle function
                    >
                      {place.liked ? (
                        <FaHeart className='text-red-500' /> // Solid heart filled with red
                      ) : (
                        <FaRegHeart className='text-gray-500' /> // Regular heart not filled
                      )}
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
              <Spinner/>
            )}
    </div>  
    </div>
    </div>
    </>
  )
}

export default Historical