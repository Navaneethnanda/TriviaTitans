import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebase";
import {
  onAuthStateChanged,
  signInWithRedirect,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { SocialIcon } from "react-social-icons";

export default function Login() {
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const fprovider = new FacebookAuthProvider();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/lobby");
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = { username, password };
    navigate("/SQ", { state: data });
  };

  const glogin = () => {
    console.log("g llogin");
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/profile");
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const flogin = () => {
    console.log("f login");

    signInWithPopup(auth, fprovider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        navigate("/profile");

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="bg-white w-full sm:w-[480px] margin top mt-6 p-8 rounded-md shadow-sm border-[1px]">
        <div className="font-bold text-2xl mb-4  ">Login</div>

        <form action="#">
          <div className="w-full inline-grid grid-cols-1">
            <span className="mb-2">
              Email <span className="text-red-600">*</span>
            </span>
            <input
              className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="johnsmith@hotmail.com"
              required
            />
          </div>
          <div className="my-4 grid grid-cols-1  sm:space-x-4">
            <div className="w-full  inline-grid grid-cols-1">
              <span className="mb-2">
                Password <span className="text-red-600">*</span>
              </span>
              <input
                className="w-full border-gray-200 border-[1px] rounded-sm shadow-sm p-1"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                required
              />
            </div>
          </div>

          <div className="flex   items-center mt-3">
            <div className="bg-[#C1292E] p-3 text-white font-bold text-xl max-w-fit rounded-md cursor-pointer">
              <input
                type="submit"
                value="Login"
                className="cursor-pointer"
                onClick={handleSubmit}
              />
            </div>
            <div className="ml-auto text-right">
              <Link to="/Login" className="text-blue-800 underline  block">
                Forgot Password?
              </Link>

              <Link
                to="/Regestration"
                className="text-blue-800 underline  block"
              >
                not a user?Sign up
              </Link>
            </div>
          </div>

          <div className="flex justify-between  mt-8  ">
            <button
              className="flex space-x-3 items-center justify-center text-red-600 max-w-[50%] hover:scale-110 transition-all ease-out "
              onClick={glogin}
            >
              <SocialIcon network="google" style={{ height: 40, width: 40 }} />
              <span className="text-sm">Login with Google</span>
            </button>

            <button
              className="flex items-center  space-x-3 text-blue-600  max-w-[50%] hover:scale-110 transition-all ease-out"
              onClick={flogin}
            >
              <SocialIcon
                network="facebook"
                style={{ height: 40, width: 40 }}
              />
              <span className="text-sm">Login with Facebook</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
