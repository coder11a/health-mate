import React from 'react';
import { Check } from 'lucide-react';

const PaymentSuccessPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-xl overflow-hidden text-center py-12 px-6">
        {/* Large success check mark */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-6 animate-bounce">
            <Check className="h-24 w-24 text-green-500" strokeWidth={3} />
          </div>
        </div>
        
        {/* Simple success message */}
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p className="text-xl text-gray-600">Thank you for your purchase</p>
        <p className="text-xl text-gray-600">You are now on a premium plan!</p>
     
        
        {/* Button to go back to home */}
        <a
          href="/dashboard"
          className="mt-6 inline-block bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition duration-200"
        >
          Go to Dasboard
        </a>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;