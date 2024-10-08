import React from 'react'
import { Link } from 'react-router-dom'
import img3 from '../../../assets/shreeji.png'
import img1 from '../../../assets/mexicanSpi.png'
import img2 from '../../../assets/sandwich.png'
import img4 from '../../../assets/anand.png'
import img5 from '../../../assets/golden.png'

function Malls() {
  return (
    <>  
    <div>
      <div class="mx-auto max-w-7xl px-2">
      <div class="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
      <p class="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
        Street Food

      </p>
      <p class="max-w-4xl font-semibold text-gray-600 md:text-left">
      Explore the vibrant world of street food, where each bite is a taste of culture and creativity. Enjoy authentic flavors crafted by passionate vendors, celebrating tradition in every dish. Indulge in gourmet experiences at affordable prices, making delicious meals accessible to everyone!
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
        <div class="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-">
          Trending
        </div>
        </Link>

        <Link to='/cafe'>
          <div class="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-">
          Cafe
          </div>
        </Link>

        <Link to='/street_food'>
        <div class="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-black first:border-b-2 ">
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
    <div class="grid gap-6  gap-y-20  py-10 pb-56 md:grid-cols-4 lg:grid-cols-3">
      <div class="border pb-2 h-[calc(100%+3rem)]">
        <img
          className='object-contain'
          src={img1}
          class="aspect-video w-auto rounded-md"
          alt=""
        />
        <div class="min-h-min p-3">
          <p class="mt-4 w-full text-xs font-semibold leading-tight text-gray-700">
            #StreetFood
          </p>
          <p class="mt-4 flex-1 text-base font-semibold text-gray-900">
            Mexican Spicy Salsa
          </p>
          <div className='text-orange-500 mt-2'>
            Recommendation:
          </div>
          <p class="mt-4 w-full text-sm leading-normal text-gray-600">
            Alfredo Red Pasta, Burrito Bowl ,Nachos
          </p>
        </div>
        <div className='pt-4'>
        <a className='text-blue-600 align-baseline px-3 py-10' target='_blank' href='https://maps.app.goo.gl/zHthiQH6pREtD8pt9'>Directions</a>
        </div>
        
      </div>
        <div class="border h-[calc(100%+3rem)]">
        <img
          className='object-contain'
          src={img2}
          class="aspect-video w-full rounded-md"
          alt=""
        />
        <div class="min-h-min p-3">
          <p class="mt-4 w-full text-xs font-semibold leading-tight text-gray-700">
            #StreetFood
          </p>
          <p class="mt-4 flex-1 text-base font-semibold text-gray-900">
            Shree Mahalaxmi Sandwich
          </p>
          <div className='text-orange-500 mt-2'>
            Recommendation:
          </div>
          <p class="mt-4 w-full text-sm leading-normal text-gray-600">
            Rimzim and paneer grill sandwich.
          </p>
          <div className='pt-4'> 
          <a className='text-blue-600 align-top px-3 py-10' target='_blank' href='https://maps.app.goo.gl/PAnEQEeCNXezuUHf7'>Directions</a>
          </div>
          
        </div>
      </div> 
      <div class="border h-[calc(100%+3rem)]">
        <img
          src={img3}
          className='object-contain'
          class="aspect-video w-auto rounded-md"
          alt=""
        />
        <div class="min-h-min p-3">
          <p class="mt-4 w-full text-xs font-semibold leading-tight text-gray-700">
            #StreetFood
          </p>
          <p class="mt-4 flex-1 text-base font-semibold text-gray-900">
            Shreeji Locho
          </p>
          <div className='text-orange-500 mt-2'>
            Recommendation:
          </div>
          <p class="mt-4 w-full text-sm leading-normal text-gray-600">
            ATG : Butter locho!
          </p>
        </div>
        <div className='pt-2'>
        <a className='text-blue-600 align-baseline px-3 py-10' target='_blank' href='https://maps.app.goo.gl/k7mXs6hJdCte5wH16'>Directions</a>
        </div>
        
      </div>
      <div class="border h-[calc(100%+2rem)]">
        <img
          className='object-contain'
          src={img4}
          alt=""
        />
        <div class="min-h-min p-3">
          <p class="mt-4 w-full text-xs font-semibold leading-tight text-gray-700">
            #StreetFood
          </p>
          <p class="mt-4 flex-1 text-base font-semibold text-gray-900">
            Anand Aloopuri
          </p>
          <div className='text-orange-500 mt-2'>
            Recommendation:
          </div>
          <p class="mt-4 w-full text-sm leading-normal text-gray-600">
            Any Aloopuri is good aloopuri
          </p>
        </div>
        <div className='pt-2'>
        <a className='text-blue-600 align-top px-3 py-10' target='_blank' href='https://maps.app.goo.gl/f9fCpC5K1pSjeezh6'>Directions</a>
        </div>
        </div>
        <div class="border h-[calc(100%+1rem)]">
        <img
          className='object-contain'
          src={img5}
          class="aspect-video w-full rounded-md"
          alt=""
        />
        <div class="min-h-min p-3">
          <p class="mt-4 w-full text-xs font-semibold leading-tight text-gray-700">
            #StreetFood
          </p>
          <p class="mt-4 flex-1 text-base font-semibold text-gray-900">
            Golden Tea Point
          </p>
          <div className='text-orange-500 mt-2'>
            Recommendation:
          </div>
          <p class="mt-4 w-full text-sm leading-normal text-gray-600">
            Cheese Grill vadapav and timepass          
          </p>
          <div className='pt-6'>
          <a className='text-blue-600 align-bottom h-10 pb-0 pt-36 pl-0 py-10' target='_blank' href='https://maps.app.goo.gl/whUn95Lap3YxpeRP6'>Directions</a>
          </div>
        </div>
      </div> 
      </div>
    </div>
    </div>
    </>
  )
}

export default Malls