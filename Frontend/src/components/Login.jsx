import React, { useState } from "react";
import { BookOpen, ShieldCheck, Bookmark } from "lucide-react";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/features/authThunk";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Login Logic 
    const handleLogin = async(e)=>{
      e.preventDefault();

      try{
        dispatch(loginUser({email,password}))
        toast.success("Successfully logged In");
        navigate('/');
      }catch(error){
        toast.error(error.response.data.message);
      }
    }
    const redirectRegister = ()=>{
        navigate('/register');
    }
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/AuthBG.avif')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-6xl h-[60vh] lg:h-[90vh] rounded-3xl overflow-hidden bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl flex">
        
        {/* Left Section */}
        <div className="hidden lg:flex w-1/2 flex-col justify-center px-14 text-white">
          <h1 className="text-5xl font-bold mb-5">
            Welcome to <span className="text-amber-400">BookVault</span>
          </h1>

          <p className="text-gray-300 text-lg leading-8 mb-10">
            Discover thousands of books, organize your reading,
            bookmark your favorites and build your own digital library.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <BookOpen className="text-amber-400" size={28} />
              <span>Explore a massive collection of books.</span>
            </div>

            <div className="flex items-center gap-4">
              <Bookmark className="text-amber-400" size={28} />
              <span>Save books to your personal library.</span>
            </div>

            <div className="flex items-center gap-4">
              <ShieldCheck className="text-amber-400" size={28} />
              <span>Secure authentication with JWT.</span>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 bg-white p-8 md:p-12 flex justify-center items-center">
          <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold text-gray-800 mb-2">
              Login Account
            </h2>

            <p className="text-gray-500 mb-8">
              Start your reading journey today.
            </p>

            <form className="space-y-5">

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=>{
                  setEmail(e.target.value)
                }}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>{
                  setPassword(e.target.value)
                }}
                className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                onClick={(e)=>handleLogin(e)}
                className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white rounded-xl py-3 font-semibold"
              >
                Login Account
              </button>
            </form>

            <p className="text-center mt-6 text-gray-500">
              Already have an account?
              <span onClick={redirectRegister} className="text-indigo-600 font-semibold cursor-pointer ml-1">
                Register
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;