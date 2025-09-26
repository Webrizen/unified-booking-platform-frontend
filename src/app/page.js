"use client";

import React, { useState, useEffect } from 'react';
import { AppRouter } from 'next/dist/client/components/app-router';

// Helper function to dynamically add Tailwind CSS classes
const addClass = (element, className) => {
  if (element) {
    element.classList.add(...className.split(' '));
  }
};

// Main App Component
export default function UnifiedBookingPlatform() {
  const [page, setPage] = useState('home');

  useEffect(() => {
    // Apply dark mode styles to the body
    document.body.classList.add('bg-gray-900', 'text-white', 'antialiased');
  }, []);

  const navigateTo = (page) => {
    setPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-6 bg-gray-900 bg-opacity-80 backdrop-blur-md transition-all duration-300">
        <h1 className="text-2xl font-bold tracking-tight cursor-pointer" onClick={() => navigateTo('home')}>
          Unified Booking
        </h1>
        <nav className="flex items-center space-x-6">
          <a href="#" className="text-lg hover:text-gray-300 transition-colors" onClick={() => navigateTo('home')}>Home</a>
          <a href="#" className="text-lg hover:text-gray-300 transition-colors" onClick={() => navigateTo('search')}>Search</a>
        </nav>
      </header>

      {/* Main Content */}
      <main className="pt-24">
        {page === 'home' && <LandingPage navigateTo={navigateTo} />}
        {page === 'search' && <SearchResultsPage navigateTo={navigateTo} />}
        {page.startsWith('details') && <ServiceDetailPage page={page} navigateTo={navigateTo} />}
        {page === 'book' && <BookingPage navigateTo={navigateTo} />}
      </main>

      {/* Footer */}
      <footer className="py-12 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Unified Booking. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Landing Page Component
const LandingPage = ({ navigateTo }) => {
  const [activeTab, setActiveTab] = useState('hotels');

  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center text-center -mt-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-cover bg-center animate-zoom" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}></div>
        <div className="relative z-20 flex flex-col items-center animate-fade-in-up">
          <h2 className="text-6xl font-extrabold leading-tight mb-4">Find Your Perfect Stay</h2>
          <p className="text-2xl text-gray-300 mb-8">Book hotels, marriage gardens, and water parks, all in one place.</p>

          {/* Search Tabs */}
          <div className="w-full max-w-4xl bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-4 transform transition-all duration-500 hover:scale-105">
            <div className="flex justify-center border-b border-gray-500">
              <button onClick={() => setActiveTab('hotels')} className={`px-6 py-3 text-xl font-semibold transition-colors ${activeTab === 'hotels' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}>Hotels</button>
              <button onClick={() => setActiveTab('gardens')} className={`px-6 py-3 text-xl font-semibold transition-colors ${activeTab === 'gardens' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}>Gardens</button>
              <button onClick={() => setActiveTab('water-parks')} className={`px-6 py-3 text-xl font-semibold transition-colors ${activeTab === 'water-parks' ? 'text-white border-b-2 border-blue-500' : 'text-gray-400'}`}>Water Parks</button>
            </div>
            <div className="p-6">
              {activeTab === 'hotels' && <HotelSearchForm navigateTo={navigateTo} />}
              {activeTab === 'gardens' && <GardenSearchForm navigateTo={navigateTo} />}
              {activeTab === 'water-parks' && <WaterParkSearchForm navigateTo={navigateTo} />}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Services Section */}
      <div className="py-20 px-8">
        <h3 className="text-4xl font-bold text-center mb-12 animate-fade-in-up">Featured Services</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Featured Hotel */}
          <div className="bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 animate-fade-in-up">
            <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Hotel" className="w-full h-56 object-cover"/>
            <div className="p-6">
              <h4 className="text-2xl font-bold mb-2">Luxury Hotel</h4>
              <p className="text-gray-400 mb-4">A 5-star hotel with all amenities.</p>
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => navigateTo('details/hotel-1')}>View Details</button>
            </div>
          </div>
          {/* Featured Garden */}
          <div className="bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{animationDelay: '200ms'}}>
            <img src="https://images.unsplash.com/photo-1542095030-221557343745?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Garden" className="w-full h-56 object-cover"/>
            <div className="p-6">
              <h4 className="text-2xl font-bold mb-2">Green Valley Gardens</h4>
              <p className="text-gray-400 mb-4">Perfect for weddings and events.</p>
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => navigateTo('details/garden-1')}>View Details</button>
            </div>
          </div>
          {/* Featured Water Park */}
          <div className="bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{animationDelay: '400ms'}}>
            <img src="https://images.unsplash.com/photo-1586884796251-3c54b025b387?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Water Park" className="w-full h-56 object-cover"/>
            <div className="p-6">
              <h4 className="text-2xl font-bold mb-2">Aqua World</h4>
              <p className="text-gray-400 mb-4">Fun for the whole family.</p>
              <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => navigateTo('details/water-park-1')}>View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Search Form Components
const HotelSearchForm = ({ navigateTo }) => (
  <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end" onSubmit={(e) => { e.preventDefault(); navigateTo('search'); }}>
    <div className="md:col-span-1">
      <label className="block text-lg font-semibold mb-2">Destination</label>
      <input type="text" placeholder="e.g., New York" className="w-full p-3 rounded-lg bg-gray-700 text-white"/>
    </div>
    <div className="md:col-span-1">
      <label className="block text-lg font-semibold mb-2">Check-in</label>
      <input type="date" className="w-full p-3 rounded-lg bg-gray-700 text-white"/>
    </div>
    <div className="md:col-span-1">
      <label className="block text-lg font-semibold mb-2">Check-out</label>
      <input type="date" className="w-full p-3 rounded-lg bg-gray-700 text-white"/>
    </div>
    <button type="submit" className="md:col-span-1 w-full py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors">Search</button>
  </form>
);

const GardenSearchForm = ({ navigateTo }) => (
  <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end" onSubmit={(e) => { e.preventDefault(); navigateTo('search'); }}>
    <div className="md:col-span-2">
      <label className="block text-lg font-semibold mb-2">Location</label>
      <input type="text" placeholder="e.g., Central Park" className="w-full p-3 rounded-lg bg-gray-700 text-white"/>
    </div>
    <div className="md:col-span-1">
      <label className="block text-lg font-semibold mb-2">Guests</label>
      <input type="number" placeholder="e.g., 100" className="w-full p-3 rounded-lg bg-gray-700 text-white"/>
    </div>
    <button type="submit" className="md:col-span-1 w-full py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors">Search</button>
  </form>
);

const WaterParkSearchForm = ({ navigateTo }) => (
  <form className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end" onSubmit={(e) => { e.preventDefault(); navigateTo('search'); }}>
    <div className="md:col-span-1">
      <label className="block text-lg font-semibold mb-2">Location</label>
      <input type="text" placeholder="e.g., Orlando" className="w-full p-3 rounded-lg bg-gray-700 text-white"/>
    </div>
    <div className="md:col-span-1">
      <label className="block text-lg font-semibold mb-2">Date</label>
      <input type="date" className="w-full p-3 rounded-lg bg-gray-700 text-white"/>
    </div>
    <button type="submit" className="md:col-span-1 w-full py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors">Search</button>
  </form>
);

// Search Results Page Component
const SearchResultsPage = ({ navigateTo }) => {
  const [sortOrder, setSortOrder] = useState('price');

  const searchResults = [
    { id: 'hotel-1', name: 'Luxury Hotel', price: 300, rating: 5, location: 'New York', image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'hotel-2', name: 'Budget Hotel', price: 100, rating: 3, location: 'San Francisco', image: 'https://images.unsplash.com/photo-1542314831-068cd1dbb5eb?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'garden-1', name: 'Green Valley Gardens', price: 500, rating: 5, location: 'Napa Valley', image: 'https://images.unsplash.com/photo-1542095030-221557343745?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { id: 'water-park-1', name: 'Aqua World', price: 50, rating: 4, location: 'Orlando', image: 'https://images.unsplash.com/photo-1586884796251-3c54b025b387?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  return (
    <div className="flex animate-fade-in">
      {/* Sidebar */}
      <aside className="w-1/4 p-8 bg-gray-800">
        <h3 className="text-2xl font-bold mb-6">Filters</h3>
        {/* Price Range */}
        <div className="mb-6">
          <label className="block text-lg font-semibold mb-2">Price Range</label>
          <input type="range" min="0" max="1000" className="w-full"/>
        </div>
        {/* Amenities */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Amenities</h4>
          <label className="flex items-center"><input type="checkbox" className="mr-2"/> WiFi</label>
          <label className="flex items-center"><input type="checkbox" className="mr-2"/> Pool</label>
          <label className="flex items-center"><input type="checkbox" className="mr-2"/> Parking</label>
        </div>
        {/* Star Rating */}
        <div>
          <h4 className="text-lg font-semibold mb-2">Star Rating</h4>
          <div className="flex">
            {[1, 2, 3, 4, 5].map(star => <span key={star} className="text-2xl cursor-pointer hover:text-yellow-400 transition-colors">★</span>)}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-3/4 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">Search Results</h2>
          <select className="p-2 rounded-lg bg-gray-700 text-white" value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="price">Sort by Price</option>
            <option value="rating">Sort by Rating</option>
          </select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {searchResults.map((result, index) => (
            <div key={result.id} className="bg-gray-800 rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
              <img src={result.image} alt={result.name} className="w-full h-56 object-cover"/>
              <div className="p-6">
                <h4 className="text-2xl font-bold mb-2">{result.name}</h4>
                <p className="text-gray-400 mb-2">{result.location}</p>
                <p className="text-lg font-semibold">${result.price}</p>
                <button className="w-full mt-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" onClick={() => navigateTo(`details/${result.id}`)}>View Details</button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// Service Detail Page Component
const ServiceDetailPage = ({ page, navigateTo }) => {
  const serviceId = page.split('/')[1];
  const service = {
    'hotel-1': { name: 'Luxury Hotel', location: 'New York', rating: 5, description: 'A 5-star hotel with breathtaking views and world-class amenities.', images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?q=80&w=1925&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'], amenities: ['WiFi', 'Pool', 'Gym', 'Spa'] },
    'garden-1': { name: 'Green Valley Gardens', location: 'Napa Valley', rating: 5, description: 'A beautiful garden perfect for weddings, parties, and corporate events.', images: ['https://images.unsplash.com/photo-1542095030-221557343745?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'], amenities: ['Catering', 'Music System', 'Parking'] },
    'water-park-1': { name: 'Aqua World', location: 'Orlando', rating: 4, description: 'A family-friendly water park with thrilling rides and attractions.', images: ['https://images.unsplash.com/photo-1586884796251-3c54b025b387?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'], amenities: ['Wave Pool', 'Slides', 'Lazy River', 'Food Court'] },
  }[serviceId];

  if (!service) return <div className="text-center text-2xl py-20">Service not found</div>;

  return (
    <div className="animate-fade-in">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-96">
        {service.images.map((img, index) => <div key={index} className="bg-cover bg-center rounded-lg animate-fade-in" style={{ backgroundImage: `url(${img})`, animationDelay: `${index * 150}ms` }}></div>)}
      </div>

      <div className="p-8 max-w-7xl mx-auto">
        {/* Summary */}
        <div className="flex justify-between items-start animate-fade-in-up">
          <div>
            <h2 className="text-5xl font-bold mb-2">{service.name}</h2>
            <p className="text-xl text-gray-400 mb-4">{service.location}</p>
            <div className="flex items-center">
              <div className="text-2xl mr-2 text-yellow-400">{'★'.repeat(service.rating)}<span className="text-gray-600">{'★'.repeat(5 - service.rating)}</span></div>
              <span className="text-lg">{service.rating}/5</span>
            </div>
          </div>
          <button className="px-8 py-4 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-transform transform hover:scale-105" onClick={() => navigateTo('book')}>Book Now</button>
        </div>

        {/* Description & Amenities */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2 animate-fade-in-up" style={{animationDelay: '200ms'}}>
            <h3 className="text-3xl font-bold mb-4">About</h3>
            <p className="text-lg text-gray-300">{service.description}</p>
          </div>
          <div className="animate-fade-in-up" style={{animationDelay: '400ms'}}>
            <h3 className="text-3xl font-bold mb-4">Amenities</h3>
            <ul className="list-disc list-inside text-lg text-gray-300 space-y-2">
              {service.amenities.map(amenity => <li key={amenity}>{amenity}</li>)}
            </ul>
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="mt-12 animate-fade-in-up" style={{animationDelay: '600ms'}}>
          <h3 className="text-3xl font-bold mb-4">Location</h3>
          <div className="h-64 bg-gray-800 rounded-lg flex items-center justify-center">
            <p>Map Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Booking Page Component
const BookingPage = ({ navigateTo }) => {
  const [step, setStep] = useState(1);

  return (
    <div className="max-w-4xl mx-auto p-8 animate-fade-in">
      <h2 className="text-4xl font-bold text-center mb-8">Booking</h2>

      {/* Stepper */}
      <div className="flex justify-center items-center mb-8">
        <div className={`flex items-center transition-colors ${step >= 1 ? 'text-blue-500' : 'text-gray-500'}`}>
          <div className="rounded-full h-8 w-8 flex items-center justify-center border-2 border-current">1</div>
          <span className="ml-2">Personal Details</span>
        </div>
        <div className={`flex-1 h-px transition-colors ${step >= 2 ? 'bg-blue-500' : 'bg-gray-600'} mx-4`}></div>
        <div className={`flex items-center transition-colors ${step >= 2 ? 'text-blue-500' : 'text-gray-500'}`}>
          <div className="rounded-full h-8 w-8 flex items-center justify-center border-2 border-current">2</div>
          <span className="ml-2">Payment</span>
        </div>
        <div className={`flex-1 h-px transition-colors ${step === 3 ? 'bg-blue-500' : 'bg-gray-600'} mx-4`}></div>
        <div className={`flex items-center transition-colors ${step === 3 ? 'text-blue-500' : 'text-gray-500'}`}>
          <div className="rounded-full h-8 w-8 flex items-center justify-center border-2 border-current">3</div>
          <span className="ml-2">Confirmation</span>
        </div>
      </div>

      {/* Form Steps */}
      <div className="bg-gray-800 p-8 rounded-lg">
        {step === 1 && <PersonalDetailsForm onNext={() => setStep(2)} />}
        {step === 2 && <PaymentForm onBack={() => setStep(1)} onNext={() => setStep(3)} />}
        {step === 3 && <ConfirmationPage onFinish={() => navigateTo('home')} />}
      </div>
    </div>
  );
};

const PersonalDetailsForm = ({ onNext }) => (
  <form className="space-y-6 animate-fade-in" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
    <div>
      <label className="block text-lg font-semibold mb-2">Full Name</label>
      <input type="text" className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"/>
    </div>
    <div>
      <label className="block text-lg font-semibold mb-2">Email</label>
      <input type="email" className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"/>
    </div>
    <div>
      <label className="block text-lg font-semibold mb-2">Phone Number</label>
      <input type="tel" className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"/>
    </div>
    <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg text-lg hover:bg-blue-700 transition-colors">Next</button>
  </form>
);

const PaymentForm = ({ onBack, onNext }) => (
  <form className="space-y-6 animate-fade-in" onSubmit={(e) => { e.preventDefault(); onNext(); }}>
    <div>
      <label className="block text-lg font-semibold mb-2">Card Number</label>
      <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"/>
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-lg font-semibold mb-2">Expiry Date</label>
        <input type="text" placeholder="MM/YY" className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"/>
      </div>
      <div>
        <label className="block text-lg font-semibold mb-2">CVC</label>
        <input type="text" placeholder="XXX" className="w-full p-3 rounded-lg bg-gray-700 text-white focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"/>
      </div>
    </div>
    <div className="flex justify-between">
      <button type="button" onClick={onBack} className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors">Back</button>
      <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Confirm Payment</button>
    </div>
  </form>
);

const ConfirmationPage = ({ onFinish }) => (
  <div className="text-center animate-fade-in">
    <h3 className="text-3xl font-bold mb-4">Booking Confirmed!</h3>
    <p className="text-lg text-gray-400 mb-8">Thank you for your booking. A confirmation email has been sent to you.</p>
    <button onClick={onFinish} className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Back to Home</button>
  </div>
);