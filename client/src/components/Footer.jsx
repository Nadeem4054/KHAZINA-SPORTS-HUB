import React from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaFacebook, FaInstagram, FaWhatsapp, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-900 to-green-800 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div>
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">KHAZINA SPORTS HUB</h2>
            <p className="text-gray-300">Apne Gaon Ka Cricket Hub</p>
            <p className="text-sm text-gray-400 mt-2">Manage tournaments, track scores, celebrate cricket!</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/" className="text-gray-300 hover:text-yellow-400 transition">Home</a></li>
              <li><a href="/register-team" className="text-gray-300 hover:text-yellow-400 transition">Teams</a></li>
              <li><a href="/tournaments" className="text-gray-300 hover:text-yellow-400 transition">Tournaments</a></li>
              <li><a href="/schedule" className="text-gray-300 hover:text-yellow-400 transition">Schedule</a></li>
              <li><a href="/live-scores" className="text-gray-300 hover:text-yellow-400 transition">Live Scores</a></li>
              <li><a href="/leaderboard" className="text-gray-300 hover:text-yellow-400 transition">Leaderboard</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={18} className="text-yellow-400 shrink-0" />
                <a href="tel:+923001234567" className="text-gray-300 hover:text-yellow-400">+92 300 1234567</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={18} className="text-yellow-400 shrink-0" />
                <a href="mailto:info@khazinasports.com" className="text-gray-300 hover:text-yellow-400">info@khazinasports.com</a>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={18} className="text-yellow-400 shrink-0" />
                <span className="text-gray-300">Khazina Sports Ground, Main Village Area</span>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">Follow Us</h3>
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition transform hover:-translate-y-1">
                <FaFacebook size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition transform hover:-translate-y-1">
                <FaInstagram size={24} />
              </a>
              <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition transform hover:-translate-y-1">
                <FaWhatsapp size={24} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition transform hover:-translate-y-1">
                <FaYoutube size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-yellow-400 transition transform hover:-translate-y-1">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
          
        </div>

        {/* Copyright Section */}
        <div className="border-t border-green-800 mt-12 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Khazina Sports Hub. All rights reserved. Built with ♥ for Cricket Lovers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
