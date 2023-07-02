import { HomeIcon, MagnifyingGlassIcon, UserCircleIcon, Bars3Icon } from '@heroicons/react/24/solid';

import {  Link } from 'react-router-dom';


export default function Header() {
  return (
    <div>
      <div className='bg-[#C1292E] shadow-sm py-4 px-10 flex justify-between items-center'>


        <Link to="/">
          <h1 className='text-3xl text-white font-bold flex-1 font-serif cursor-pointer'> NewsTub</h1></Link>

        <div className=' space-x-5 hidden sm:flex'>
          <HomeIcon className='w-7 text-white' />
          <MagnifyingGlassIcon className='w-7 text-white' />
          <UserCircleIcon className='w-9 text-white' />
        </div>
        <Bars3Icon className='w-7 text-white sm:hidden' />



      </div>


    </div>


  );
}
