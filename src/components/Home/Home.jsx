import React from 'react'
import { Link } from 'react-router-dom';
import home from '../../assets/home.jpg'

export default function Home() {
        return(
            <>
            <section class="relative py-10 overflow-hidden bg-black sm:py-16 lg:py-24 xl:py-32">
    <div class="absolute inset-0">
        <img class="object-cover w-full h-full md:object-left md:scale-150 md:origin-top-left" src={home} alt="" />
    </div>

    <div class="absolute inset-0 hidden bg-gradient-to-r md:block from-black to-transparent"></div>

    <div class="absolute inset-0 block bg-black/60 md:hidden"></div>

    <div class="relative px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
        <div class="text-center md:w-2/3 lg:w-1/2 xl:w-1/3 md:text-left">
            <h2 class="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">Welcome to Musafir</h2>
            <p class="mt-4 text-base text-gray-200">Discover top destinations,dive into culture experiences.We have something interesting for every traveler</p>

            <div className='flex justify-start pt-5 pb-4 pl-0 '>
              <Link to='/explore'>
              <button className='text-white w-20 h-10 rounded-2xl bg-red-600'> Explore</button>
              </Link>
            </div>
        </div>
    </div>
</section>
<section class="py-10 bg-white sm:py-16 lg:py-24">
    <div class="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div class="max-w-2xl mx-auto text-center">
            <h2 class="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">How does it work?</h2>
            <p class="max-w-lg font mx-auto mt-4 text-base leading-relaxed text-gray-600">Explore places based on your preferences and add them to your wishlist.</p>
        </div>

        <div class="relative mt-12 lg:mt-20">
            <div class="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
                <img class="w-full" src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg" alt="" />
            </div>

            <div class="relative grid grid-cols-1 text-center gap-y-12 md:grid-cols-3 gap-x-12">
                <div>
                    <div class="flex items-center justify-center w-16 h-16 mx-auto bg-orange-500 border-2 border-gray-200 rounded-full shadow">
                        <span class="text-xl font-semibold text-gray-700"> 1 </span>
                    </div>
                    <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Create a account</h3>
                    <p class="mt-4 text-base text-gray-600">Discover top destinations and hot picks based on latest reviews and add them to your wishlist.</p>
                </div>

                <div>
                    <div class="flex items-center justify-center w-16 h-16 mx-auto bg-orange-500 border-2 border-gray-200 rounded-full shadow">
                        <span class="text-xl font-semibold text-gray-700"> 2 </span>
                    </div>
                    <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Plan your trip</h3>
                    <p class="mt-4 text-base text-gray-600">Schedule your trip with our trip management tool based on your choice and type of travel</p>
                </div>
                <div>
                    <div class="flex items-center justify-center w-16 h-16 mx-auto bg-orange-500 border-2 border-gray-200 rounded-full shadow">
                        <span class="text-xl font-semibold text-gray-700"> 3 </span>
                    </div>
                    <h3 class="mt-6 text-xl font-semibold leading-tight text-black md:mt-10">Travel & Enjoy</h3>
                    <p class="mt-4 text-base text-gray-600">Experience your favorite places with our plan designed exclusively for you.</p>
                </div>
            </div>
        </div>
    </div>
</section>
            </>
        )
}