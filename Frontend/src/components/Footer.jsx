import React from "react";
import {
  BookOpen,
  Mail,
  Phone,
  MapPin,
  Heart,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Logo */}
          <div>
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 p-2 rounded-xl">
                <BookOpen className="text-white" size={22} />
              </div>

              <h2 className="text-2xl font-bold text-white">
                Book<span className="text-indigo-400">Vault</span>
              </h2>
            </div>

            <p className="mt-5 text-gray-400 leading-7">
              BookVault is your personal digital library where you can
              discover, download and organize your favourite books.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              <li className="hover:text-indigo-400 cursor-pointer transition">
                Home
              </li>

              <li className="hover:text-indigo-400 cursor-pointer transition">
                Books
              </li>

              <li className="hover:text-indigo-400 cursor-pointer transition">
                Bookmarks
              </li>

              <li className="hover:text-indigo-400 cursor-pointer transition">
                Profile
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-5">
              Contact
            </h3>

            <div className="space-y-4">

              <div className="flex items-center gap-3">
                <Mail size={18} />
                <span>support@bookvault.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin size={18} />
                <span>Hyderabad, India</span>
              </div>

            </div>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">

          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} BookVault. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-sm text-gray-500 mt-3 md:mt-0">
            Made with
            <Heart size={16} className="fill-red-500 text-red-500" />
            for book lovers.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;