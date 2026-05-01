export default function OrderTracking({ status }) {
  const steps = ["placed", "shipped", "out_for_delivery", "delivered"];

  const currentStep = steps.indexOf(status);

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center">
        {steps.map((step, i) => (
          <div key={i} className="flex-1 text-center">
            {/* DOT */}
            <div
              className={`w-6 h-6 mx-auto rounded-full border-2 
              ${
                i <= currentStep
                  ? "bg-[#c8a97e] border-[#c8a97e]"
                  : "bg-white border-gray-300"
              }`}
            />

            {/* LABEL */}
            <p
              className={`text-xs mt-2 capitalize ${
                i <= currentStep
                  ? "text-[#c8a97e] font-medium"
                  : "text-gray-400"
              }`}
            >
              {step.replaceAll("_", " ")}
            </p>
          </div>
        ))}
      </div>

      {/* LINE */}
      <div className="relative mt-3 h-1 bg-gray-200 rounded-full">
        <div
          className="absolute top-0 left-0 h-1 bg-[#c8a97e] rounded-full transition-all duration-500"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
}
