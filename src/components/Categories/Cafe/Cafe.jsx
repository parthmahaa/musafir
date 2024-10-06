import React from 'react'
import { Link } from 'react-router-dom'
import vr from '../../../assets/VR.jpg'
import chauta from '../../../assets/Chauta.jpg'

function Cafe() {
  return (
    <>  
    <div>
      <div class="mx-auto max-w-7xl px-2">
      <div class="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
      <p class="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
        Cafe

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
        <div class="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 ">
          Trending
        </div>
        </Link>
        <Link to='/cafe'>
          <div class="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 first:border-black">
          Cafe
          </div>
        </Link>
        <div class="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 first:border-black">
          Malls
        </div>
        <div class="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 first:border-black">
          Historical Places
        </div>
      </div>
    </div>
    <div class="grid gap-6  gap-y-10 py-10 md:grid-cols-4 lg:grid-cols-3">
      <div class="border">
        <img
          src={vr}
          class="aspect-video w-auto rounded-md"
          alt=""
        />
        <div class="min-h-min p-3">
          <p class="mt-4 w-full text-xs font-semibold leading-tight text-gray-700">
            #Malls
          </p>
          <p class="mt-4 flex-1 text-base font-semibold text-gray-900">
            VR Mall
          </p>
          <p class="mt-4 w-full text-sm leading-normal text-gray-600">
          VR Surat offers a curated mix of local and global experiences across retail, food and entertainment.
            Connecting Communities.
            Shop. Dine. Explore.    
          </p>
        </div>
        <a className='text-blue-600 align-baseline px-3 py-10' target='_blank' href='https://maps.app.goo.gl/SujidTPNinxsZaXx5'>Directions</a>
      </div>
      <div class="border">
        <img
          src="https://surattourism.in/images/places-to-visit/header/dumas-beach-surat-tourism-entry-fee-timings-holidays-reviews-header.jpg"
          class="aspect-video w-45 rounded-md"
          alt=""
        />
        <div class="min-h-min p-3">
          <p class="mt-4 w-full text-xs font-semibold leading-tight text-gray-700">
            #Beach
          </p>
          <p class="mt-4 flex-1 text-base font-semibold text-gray-900">
            Dumas
          </p>
          <p class="mt-4 w-full text-sm leading-normal text-gray-600">
          Surat's most famous beach is a great place to relax with family.The beach offers many adventure sports and activities at affordable costs. You can even bring your own toys to enjoy. Don't forget to visit the Dariya Ganesh temple
          </p>
        </div>
          <a className='text-blue-600 align-top px-3 py-10' target='_blank' href='https://maps.app.goo.gl/8PPWKbKLrX757CbD6'>Directions</a>
        </div>
        <div class="border">
        <img
          src={chauta}
          class="aspect-video w-full rounded-md"
          alt=""
        />
        <div class="min-h-min p-3">
          <p class="mt-4 w-full text-xs font-semibold leading-tight text-gray-700">
            #Shopping
          </p>
          <p class="mt-4 flex-1 text-base font-semibold text-gray-900">
            Chauta
          </p>
          <p class="mt-4 w-full text-sm leading-normal text-gray-600">
          Chauta Bazaar is one of the oldest market of Surat. There were shops surrounding the Haveli where the women visiting the temple would go shopping for utensils, clothes, cosmetics, groceries and other day-to-day household goods.
          </p>
        </div>
      </div> 
    </div>
    </div>
    </div>
    </>
  )
}

export default Cafe