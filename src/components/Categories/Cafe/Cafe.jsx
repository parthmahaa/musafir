import React from 'react'
import { Link } from 'react-router-dom'
import img3 from '../../../assets/bokketo1.jpg'
import img1 from '../../../assets/nomads.jpg'
import img2 from '../../../assets/zero.jpg'
import img4 from '../../../assets/moonstruck.jpg'
import img5 from '../../../assets/meraki.jpg'
import img6 from '../../../assets/uncleGoon.jpg'



function Cafe() {
  return (
    <>  
    <div>
      <div class="mx-auto max-w-7xl px-2">
      <div class="flex flex-col space-y-8 pb-1 pt-1 md:pt-24">
      <p class="text-3xl font-bold text-gray-900 md:text-5xl md:leading-10">
        Cafe

      </p>
      <p class="max-w-4xl font-semibold text-gray-600 md:text-left">
      Cafés across the city offer diverse experiences, from cozy neighborhood spots with artisanal brews to bustling downtown cafés perfect for people-watching. Each place has its own vibe, whether it's rustic charm or sleek modern design, catering to both quiet work sessions and social gatherings. With unique menus and specialty drinks, every visit feels like a new discovery.
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
          <div class="cursor-pointer  px-4 py-2 text-base font-semibold leading-normal text-gray-700 first:border-b-2 first:border-black">
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
            #Cafe
          </p>
          <p class="mt-4 flex-1 text-base font-semibold text-gray-900">
            Nomads
          </p>
          <p class="mt-4 w-full text-sm leading-normal text-gray-600">
          Nomads Café in Surat is a popular, cozy spot known for its vibrant, laid-back ambiance. It offers a wide range of delicious food, including continental, Italian, and Indian dishes. With its artistic decor and outdoor seating, it's a favorite hangout for youngsters and food lovers.
          </p>
        </div>
        <a className='text-blue-600 align-baseline px-3 py-10' target='_blank' href='https://maps.app.goo.gl/3kyKvz8ihfSphtLYA'>Directions</a>
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
            #Cafe
          </p>
          <p class="mt-4 flex-1 text-base font-semibold text-gray-900">
            ZERO The restaurant
          </p>
          <p class="mt-4 w-full text-sm leading-normal text-gray-600">
          Zero the Restaurant offers a contemporary and stylish ambiance ideal for casual dining.Its diverse menu features Indian, Chinese, and continental dishes.The bar menu includes creatively crafted mocktails and cocktails that enhance the dining experience. Known for its attentive and friendly service, Zero ensures a pleasant visit for all diners.
          </p>
          <div className='pt-3 items-start'>
          <a className='text-blue-600 align-top px-3 py-10' target='_blank' href='https://maps.app.goo.gl/Rmw98Ces1JQWQS6M6'>Directions</a>
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
            #Cafe
          </p>
          <p class="mt-4 flex-1 text-base font-semibold text-gray-900">
            Bokketo
          </p>
          <p class="mt-4 w-full text-sm leading-normal text-gray-600">
          Bokketo offers a selection of beverages, including refreshing mocktails and cocktails, perfect for complementing the dining experience. The drink menu is designed to enhance the flavors of the food.Diners can expect a variety of dishes, including tantalizing starters, rich main courses, and delightful desserts. The menu often includes both vegetarian and non-vegetarian options, catering to a wide range of tastes.  
          </p>
        </div>
        <a className='text-blue-600 align-baseline px-3 py-10' target='_blank' href='https://maps.app.goo.gl/TW8eTd9eY2ndHqVK7'>Directions</a>
      </div>
      <div class="border h-[calc(100%+1rem)]">
        <img
          className='object-contain'
          src={img4}
          alt=""
        />
        <div class="min-h-min p-3">
          <p class="mt-4 w-full text-xs font-semibold leading-tight text-gray-700">
            #Cafe
          </p>
          <p class="mt-4 flex-1 text-base font-semibold text-gray-900">
            Moonstruck
          </p>
          <p class="mt-4 w-full text-sm leading-normal text-gray-600">
          Moonstruck features a chic and contemporary interior with stylish décor, creating a lively and inviting atmosphere. The lighting and layout contribute to a relaxed yet energetic vibe, making it ideal for casual dining, celebrations, and gatherings with friends and family.Diners can enjoy a variety of appetizers, main courses, and desserts. Some standout dishes are known for their creative presentations and unique flavor combinations, making them a hit among guests.
          </p>
        </div>
          <a className='text-blue-600 align-top px-3 py-10' target='_blank' href='https://maps.app.goo.gl/opquLWaEEfjMByXE7'>Directions</a>
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
            #Cafe
          </p>
          <p class="mt-4 flex-1 text-base font-semibold text-gray-900">
            Meraki
          </p>
          <p class="mt-4 w-full text-sm leading-normal text-gray-600">
          Meraki features a chic and contemporary interior, blending modern design with cozy elements. The decor often includes artistic touches, creating an inviting and vibrant atmosphere perfect for casual dining, family gatherings, or special occasions.Guests can enjoy a variety of dishes, from innovative appetizers to rich main courses and delightful desserts. Signature dishes often showcase a blend of traditional flavors with modern cooking techniques, appealing to a wide range of palates.
          </p>
          <div className='pt-5'>
          <a className='text-blue-600 align-bottom h-10 pb-0 pt-36 pl-0 py-10' target='_blank' href='https://maps.app.goo.gl/8crKuXPf2x5Sdfqy7'>Directions</a>
          </div>
        </div>
      </div> 
      <div class="border pb-2 h-[calc(100%+1rem)]">
        <img
          className='object-contain'
          src={img6}
          class="aspect-video w-auto rounded-md"
          alt=""
        />
        <div class="min-h-min p-3">
          <p class="mt-4 w-full text-xs font-semibold leading-tight text-gray-700">
            #Cafe
          </p>
          <p class="mt-4 flex-1 text-base font-semibold text-gray-900">
            Uncle Goons 
          </p>
          <p class="mt-4 w-full text-sm leading-normal text-gray-600">
          Uncle Goon's features a lively and contemporary interior, with colorful decor and an energetic vibe that creates a fun dining experience. The casual setting makes it a great place for family outings, friends’ get-togethers, or a relaxed meal.The menu features a variety of innovative starters, hearty main courses, and delightful desserts. Signature dishes are known for their creative presentations and bold flavors, often leaving guests wanting more.
          </p>
        </div>
        <a className='text-blue-600 align-baseline px-3 py-10' target='_blank' href='https://maps.app.goo.gl/u1ngKYsWWpRy8fFA7'>Directions</a>
      </div>
    </div>
    </div>
    </div>
    </>
  )
}

export default Cafe