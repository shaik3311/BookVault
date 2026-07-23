import React from "react";
import Navbar from "../components/Navbar";
import { BookOpen } from "lucide-react";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 bg-indigo-200">
      <Navbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 ">
        <div className="bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 rounded-3xl overflow-hidden shadow-xl">

          <div className="flex flex-col-reverse md:flex-row items-center justify-between p-10 md:p-16">

            <div className="max-w-2xl text-white">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Discover, Read &
                <span className="text-yellow-300 block">
                  Download Books
                </span>
              </h1>

              <p className="mt-6 text-lg text-indigo-100 leading-8">
                Explore a growing collection of books from different
                categories. Save your favourites and build your own
                digital library with BookVault.
              </p>

              <button className="mt-8 bg-white text-indigo-700 px-8 py-3 rounded-xl font-semibold hover:scale-105 transition duration-300">
                Explore Library
              </button>
            </div>

            <BookOpen
              size={220}
              className="text-white opacity-20 mb-10 md:mb-0"
            />

          </div>
        </div>
      </section>

      {/* Latest Books */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">
            Latest Books
          </h2>

          <button className="text-indigo-600 font-semibold hover:underline">
            View All
          </button>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {[1, 2, 3, 4].map((book) => (
            <div
              key={book}
              className="bg-white rounded-2xl shadow hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className="overflow-hidden">
                <img
                  src={`https://picsum.photos/300/400?random=${book}`}
                  alt="Book Cover"
                  className="w-full h-72 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-5">
                <span className="text-xs bg-indigo-100 text-indigo-600 px-3 py-1 rounded-full">
                  Programming
                </span>

                <h3 className="mt-4 text-xl font-bold text-gray-800">
                  Book Title
                </h3>

                <button className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}

        </div>
      </section>

      <Footer/>
    </div>
  );
};

export default Home;