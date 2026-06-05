import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Add API logic later
  };

  return (
    <div className="min-h-screen bg-bglight py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-poppins font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-gray-500">Get in touch with the Khazina Sports Hub management team</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex items-start gap-4 hover:shadow-md transition">
              <div className="w-12 h-12 bg-cricketGreen-light/10 text-cricketGreen rounded-full flex items-center justify-center shrink-0">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-gray-900 mb-1">Our Ground</h3>
                <p className="text-gray-500 text-sm">Khazina Sports Ground, Main Village Area, District Example</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex items-start gap-4 hover:shadow-md transition">
              <div className="w-12 h-12 bg-cricketGreen-light/10 text-cricketGreen rounded-full flex items-center justify-center shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-gray-900 mb-1">Phone & WhatsApp</h3>
                <p className="text-gray-500 text-sm mb-2">+92 300 1234567</p>
                <a href="tel:+923001234567" className="text-cricketGreen text-sm font-semibold hover:underline">Click to call</a>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100 flex items-start gap-4 hover:shadow-md transition">
              <div className="w-12 h-12 bg-cricketGreen-light/10 text-cricketGreen rounded-full flex items-center justify-center shrink-0">
                <Mail className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-gray-900 mb-1">Email Us</h3>
                <p className="text-gray-500 text-sm mb-2">info@khazinasportshub.com</p>
                <a href="mailto:info@khazinasportshub.com" className="text-cricketGreen text-sm font-semibold hover:underline">Send an email</a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-2xl shadow-soft border border-gray-100">
              <h2 className="text-2xl font-poppins font-semibold text-gray-900 mb-6">Send a Message</h2>
              
              {submitted ? (
                <div className="bg-green-50 text-green-700 p-6 rounded-xl border border-green-200 text-center">
                  <h3 className="font-bold text-xl mb-2">Message Sent!</h3>
                  <p>Thank you for reaching out. We will get back to you shortly.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-semibold">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <input required type="text" className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricketGreen focus:bg-white outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input required type="email" className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricketGreen focus:bg-white outline-none transition" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricketGreen focus:bg-white outline-none transition">
                      <option>General Inquiry</option>
                      <option>Tournament Registration</option>
                      <option>Report an Issue</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea required rows="5" className="w-full px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cricketGreen focus:bg-white outline-none transition"></textarea>
                  </div>
                  <button type="submit" className="w-full py-3 bg-cricketGreen text-white rounded-lg hover:bg-cricketGreen-dark transition font-semibold shadow-soft flex items-center justify-center gap-2">
                    <Send className="h-5 w-5" /> Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
