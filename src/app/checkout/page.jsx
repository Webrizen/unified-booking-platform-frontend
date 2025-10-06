'use client';

import { useState, useEffect } from 'react';

export default function page() {
  const [bookingDetails, setBookingDetails] = useState({
    checkIn: '2024-01-15',
    checkOut: '2024-01-18',
    guests: 2,
    roomType: 'deluxe',
    roomPrice: 299,
    taxes: 45,
    serviceFee: 30,
    discount: 0
  });

  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    saveCard: false
  });

  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const totalAmount = bookingDetails.roomPrice + bookingDetails.taxes + bookingDetails.serviceFee - bookingDetails.discount;

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'WELCOME10') {
      setBookingDetails(prev => ({
        ...prev,
        discount: Math.round((prev.roomPrice + prev.taxes + prev.serviceFee) * 0.1)
      }));
      alert('Promo code applied! 10% discount added.');
    } else {
      alert('Invalid promo code. Please try again.');
    }
    setPromoCode('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    alert('Booking confirmed! Check your email for confirmation details.');
  };

  const roomTypes = {
    standard: { name: 'Standard Room', amenities: ['WiFi', 'TV', 'AC'] },
    deluxe: { name: 'Deluxe Room', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Ocean View'] },
    suite: { name: 'Executive Suite', amenities: ['WiFi', 'TV', 'AC', 'Mini Bar', 'Ocean View', 'Jacuzzi'] }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 py-8 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white transition-colors duration-200">
            Complete Your Booking
          </h1>
          <p className="text-zinc-600 dark:text-zinc-300 mt-2 transition-colors duration-200">
            Luxury Awaits - Finalize Your Stay
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Booking Summary */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6 mb-6 transition-colors duration-200">
              <div className="flex items-center justify-between">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div className={`flex items-center justify-center w-8 h-8 rounded-full transition-colors duration-200 ${
                      step >= stepNumber 
                        ? 'bg-indigo-600 text-white' 
                        : 'bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-300'
                    }`}>
                      {stepNumber}
                    </div>
                    <span className={`ml-2 text-sm font-medium transition-colors duration-200 ${
                      step >= stepNumber 
                        ? 'text-indigo-600 dark:text-indigo-400' 
                        : 'text-zinc-500 dark:text-zinc-400'
                    }`}>
                      {stepNumber === 1 && 'Details'}
                      {stepNumber === 2 && 'Payment'}
                      {stepNumber === 3 && 'Confirm'}
                    </span>
                    {stepNumber < 3 && (
                      <div className={`w-16 h-0.5 mx-4 transition-colors duration-200 ${
                        step > stepNumber 
                          ? 'bg-indigo-600 dark:bg-indigo-500' 
                          : 'bg-zinc-200 dark:bg-zinc-600'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Information */}
            {step === 1 && (
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6 mb-6 transition-colors duration-200">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6 transition-colors duration-200">
                  Guest Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 transition-colors duration-200">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white transition-colors duration-200"
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 transition-colors duration-200">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white transition-colors duration-200"
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 transition-colors duration-200">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white transition-colors duration-200"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 transition-colors duration-200">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white transition-colors duration-200"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 transition-colors duration-200">
                      Special Requests
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white transition-colors duration-200"
                      value={customerInfo.specialRequests}
                      onChange={(e) => setCustomerInfo({...customerInfo, specialRequests: e.target.value})}
                      placeholder="Any special requirements or preferences..."
                    />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setStep(2)}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800 transition-all duration-200 font-medium"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}

            {/* Payment Information */}
            {step === 2 && (
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6 transition-colors duration-200">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6 transition-colors duration-200">
                  Payment Details
                </h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 transition-colors duration-200">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white transition-colors duration-200"
                      value={paymentInfo.cardNumber}
                      onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 transition-colors duration-200">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white transition-colors duration-200"
                        value={paymentInfo.expiryDate}
                        onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 transition-colors duration-200">
                        CVV *
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white transition-colors duration-200"
                        value={paymentInfo.cvv}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2 transition-colors duration-200">
                      Name on Card *
                    </label>
                    <input
                      type="text"
                      placeholder="John Doe"
                      className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white transition-colors duration-200"
                      value={paymentInfo.nameOnCard}
                      onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
                    />
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="saveCard"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-zinc-300 dark:border-zinc-600 rounded bg-white dark:bg-zinc-700 transition-colors duration-200"
                      checked={paymentInfo.saveCard}
                      onChange={(e) => setPaymentInfo({...paymentInfo, saveCard: e.target.checked})}
                    />
                    <label htmlFor="saveCard" className="ml-2 text-sm text-zinc-700 dark:text-zinc-300 transition-colors duration-200">
                      Save card for future payments
                    </label>
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(1)}
                    className="text-zinc-600 dark:text-zinc-400 px-6 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800 transition-all duration-200 font-medium"
                  >
                    Review Booking
                  </button>
                </div>
              </div>
            )}

            {/* Confirmation Step */}
            {step === 3 && (
              <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6 transition-colors duration-200">
                <h2 className="text-xl font-semibold text-zinc-900 dark:text-white mb-6 transition-colors duration-200">
                  Review Your Booking
                </h2>
                <div className="space-y-6">
                  <div className="border-b border-zinc-200 dark:border-zinc-600 pb-4 transition-colors duration-200">
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 transition-colors duration-200">Guest Information</h3>
                    <p className="text-zinc-600 dark:text-zinc-300 transition-colors duration-200">{customerInfo.firstName} {customerInfo.lastName}</p>
                    <p className="text-zinc-600 dark:text-zinc-300 transition-colors duration-200">{customerInfo.email}</p>
                    <p className="text-zinc-600 dark:text-zinc-300 transition-colors duration-200">{customerInfo.phone}</p>
                  </div>
                  <div className="border-b border-zinc-200 dark:border-zinc-600 pb-4 transition-colors duration-200">
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 transition-colors duration-200">Payment Method</h3>
                    <p className="text-zinc-600 dark:text-zinc-300 transition-colors duration-200">Card ending in {paymentInfo.cardNumber.slice(-4)}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 transition-colors duration-200">Special Requests</h3>
                    <p className="text-zinc-600 dark:text-zinc-300 transition-colors duration-200">
                      {customerInfo.specialRequests || 'No special requests'}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mt-8">
                  <button
                    onClick={() => setStep(2)}
                    className="text-zinc-600 dark:text-zinc-400 px-6 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors duration-200"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isLoading}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-800 transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Confirm Booking'
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm sticky top-8 transition-colors duration-200">
              {/* Room Details */}
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-600 transition-colors duration-200">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 transition-colors duration-200">Room Details</h3>
                <div className="flex items-start space-x-4">
                  <div className="w-20 h-20 bg-zinc-200 dark:bg-zinc-700 rounded-lg flex-shrink-0 transition-colors duration-200">
                    <img 
                      src="https://placehold.co/400" 
                      alt="Room" 
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-zinc-900 dark:text-white transition-colors duration-200">
                      {roomTypes[bookingDetails.roomType].name}
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 mt-1 transition-colors duration-200">
                      {bookingDetails.checkIn} to {bookingDetails.checkOut}
                    </p>
                    <p className="text-sm text-zinc-600 dark:text-zinc-300 transition-colors duration-200">
                      {bookingDetails.guests} Guests
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-600 transition-colors duration-200">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 transition-colors duration-200">Price Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-300 transition-colors duration-200">Room Price</span>
                    <span className="text-zinc-900 dark:text-white transition-colors duration-200">₹{bookingDetails.roomPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-300 transition-colors duration-200">Taxes & Fees</span>
                    <span className="text-zinc-900 dark:text-white transition-colors duration-200">₹{bookingDetails.taxes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-600 dark:text-zinc-300 transition-colors duration-200">Service Fee</span>
                    <span className="text-zinc-900 dark:text-white transition-colors duration-200">₹{bookingDetails.serviceFee}</span>
                  </div>
                  {bookingDetails.discount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400 transition-colors duration-200">
                      <span>Discount</span>
                      <span>-₹{bookingDetails.discount}</span>
                    </div>
                  )}
                  <div className="border-t border-zinc-200 dark:border-zinc-600 pt-3 mt-3 transition-colors duration-200">
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-zinc-900 dark:text-white transition-colors duration-200">Total</span>
                      <span className="text-zinc-900 dark:text-white transition-colors duration-200">₹{totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="p-6 border-b border-zinc-200 dark:border-zinc-600 transition-colors duration-200">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 transition-colors duration-200">Promo Code</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="flex-1 px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:focus:ring-indigo-400 dark:focus:border-indigo-400 bg-white dark:bg-zinc-700 text-zinc-900 dark:text-white transition-colors duration-200"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button
                    onClick={applyPromoCode}
                    className="bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300 px-4 py-2 rounded-lg hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors duration-200"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2 transition-colors duration-200">
                  Try: WELCOME10 for 10% off
                </p>
              </div>

              {/* Amenities */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white mb-4 transition-colors duration-200">Included Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {roomTypes[bookingDetails.roomType].amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center text-sm text-zinc-600 dark:text-zinc-300 transition-colors duration-200">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></div>
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg shadow-sm p-6 mt-6 transition-colors duration-200">
              <div className="text-center">
                <div className="flex justify-center items-center space-x-2 text-indigo-600 dark:text-indigo-400 mb-2 transition-colors duration-200">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-semibold">Secure Payment</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 transition-colors duration-200">
                  Your payment information is encrypted and secure. We never share your details with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}