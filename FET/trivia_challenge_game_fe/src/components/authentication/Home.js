
import { Link } from 'react-router-dom';


export default function Home() {
    return (
        <div className="flex items-center justify-center ">

            <div className="bg-white w-full sm:w-[640px] margin top mt-6 p-8 rounded-md shadow-sm border-[1px]">
                <div className="font-bold text-3xl mb-4  mx-auto text-center" >go to  <Link to="/Login" className="text-blue-800 underline">Login</Link> page to Login </div>
                <div className="font-bold text-3xl mb-4  mx-auto text-center" >go to  <Link to="/Regestration" className="text-blue-800 underline">Register</Link> page to tegister </div>


            </div>
        </div>


    );


}