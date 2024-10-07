import React from 'react'
import { Link } from 'react-router-dom'
import img3 from '../../../assets/sardar.jpg'
import img1 from '../../../assets/suratCastle.jpg'
import img2 from '../../../assets/iscon.jpg'



function Historical() {
  return (
    <>  
    <div>
      <div class="mx-auto max-w-7xl px-2">
      <div class="flex flex-col space-y-8 pb-10 pt-12 md:pt-24">
      <p class="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
        Historical Places

      </p>
      <p class="max-w-4xl font-semibold text-gray-600 md:text-left">
      Surat is steeped in history, with several sites that offer a glimpse into its rich past, including colonial influences, trade history, and ancient architecture.
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
        <div class="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 ">
          Street Food
        </div>
        </Link>
        <Link to='/historical'>
        <div class="cursor-pointer px-4 py-2 text-base font-semibold leading-normal text-gray-700 2 first:border-black first:border-b-2 ">
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
            #Historical Places
          </p>
          <p class="mt-4 flex-1 text-base font-semibold text-gray-900">
            Surat Castle
          </p>
          <p class="mt-4 w-full text-sm leading-normal text-gray-600">
          Surat Castle, built by Sultan Mahmood-III in the 16th century, was designed to defend the city from Portuguese invasions. Its architecture showcases military engineering of the era. The fort symbolizes Surat's historical importance as a strategic port city.
          </p>
        </div>
        <a className='text-blue-600 align-baseline px-3 py-10' target='_blank' href='https://maps.app.goo.gl/SK463ALEanDEvu8M9'>Directions</a>
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
            #Historical Places
          </p>
          <p class="mt-4 flex-1 text-base font-semibold text-gray-900">
            ISCON Temple
          </p>
          <p class="mt-4 w-full text-sm leading-normal text-gray-600">
          About 15 kilometres from the railway station and the bus station, on the banks of River Tapi is the marvellous residential abode of Lord Sri Sri Radha Damodar. With an area of about 13600 square feet, it is one of the largest temples in Surat.
          </p>
          <a className='text-blue-600 align-top px-3 py-10' target='_blank' href='https://maps.app.goo.gl/rYpEziS3kgPQDTZj7'>Directions</a>
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
            #Historical Places
          </p>
          <p class="mt-4 flex-1 text-base font-semibold text-gray-900">
            Sardar Patel Museum
          </p>
          <p class="mt-4 w-full text-sm leading-normal text-gray-600">
          The Sardar Patel Museum, established in 1890, showcases a rich collection of historical artifacts, paintings, and sculptures. It offers insights into Surat's cultural and historical evolution from ancient to modern times, making it a key place for history enthusiasts to visit.   
          </p>
        </div>
        <a className='text-blue-600 align-baseline px-3 py-10' target='_blank' href='https://maps.app.goo.gl/AnNgH27pkYdbm7kB8'>Directions</a>
      </div> 
      </div>
    </div>
    </div>
    </>
  )
}

export default Historical