import React from "react";
import Image from "next/image";
import { FaAngleLeft } from "react-icons/fa6";

const MobileHeader = ({ activeSpotlight, setActiveSpotlight }) => {
  const handleSpotlight = () => {
    setActiveSpotlight(false);
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-between h-24 border-b shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]">
        {/* Left Arrow */}
        {activeSpotlight ? (
          <div
            className="flex items-center justify-start pl-4 text-gray-700 cursor-pointer"
            onClick={handleSpotlight}
            role="button"
            aria-label="Go back"
          >
            <FaAngleLeft size={24} />
          </div>
        ) : (
          <div className="w-8"></div>
        )}

        {/* Centered Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Image src="/tyn-logo.png" width={135} height={135} alt="Tyn Logo" />
        </div>

        {/* Right Placeholder for balance */}
        <div className="w-8"></div>
      </div>
    </div>
  );
};

export default MobileHeader;
