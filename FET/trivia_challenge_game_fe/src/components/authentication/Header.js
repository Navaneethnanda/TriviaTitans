import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  Bars3Icon,BuildingLibraryIcon,TrophyIcon
} from "@heroicons/react/24/solid";




import { Link } from "react-router-dom";

export default function Header() {

const type=localStorage.getItem("type");

  return (
    <div>
      <div className="bg-[#C1292E] shadow-sm py-4 px-10 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-3xl text-white font-bold flex-1 font-serif cursor-pointer">
            {" "}
            Trivia
          </h1>
        </Link>

        <div className=" space-x-12 hidden sm:flex mr-16">

        {type=="admin"?<Link to="/admin">
        <BuildingLibraryIcon className="w-7 text-white" />
      </Link>:""}
        

          <Link to="/lobby">
            <HomeIcon className="w-7 text-white" />
          </Link>

          <Link to="/leaders" className="w-9 text-white">
            <TrophyIcon className="w-7 text-white"/>
          </Link>

          <Link to="/profile">
            <UserCircleIcon className="w-9 text-white" />
          </Link>
          
        </div>
        <Bars3Icon className="w-7 text-white sm:hidden" />
      </div>
    </div>
  );
}
