const SellerPayment = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f4f2]">
      <div className="p-8 bg-white rounded-xl shadow-lg text-center">
        <h2 className="text-2xl mb-4">Seller Registration Fee</h2>

        <p className="text-gray-600 mb-6">
          Pay ₹299 to activate your seller account
        </p>

        <button className="px-6 py-3 bg-[#c8a97e] text-white rounded">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default SellerPayment;
