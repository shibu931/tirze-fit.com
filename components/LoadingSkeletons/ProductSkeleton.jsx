import { FaRegClock } from "react-icons/fa";
import { FaThermometerHalf } from "react-icons/fa";
import { ImLab } from "react-icons/im";
import { IoCart, IoShieldCheckmarkSharp} from "react-icons/io5";
import { TbTruckReturn } from "react-icons/tb";

const ProductSkeleton = () => {
  return (
    <>
    <section className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-12 animate-pulse">
      {/* Image Skeleton */}
      <div className="flex justify-center border border-gray-400">
        <div className="w-full h-[320px] bg-gray-300 rounded"></div>
      </div>

      {/* Content Skeleton */}
      <div>
        {/* Product Name */}
        <div className="h-8 sm:h-9 lg:h-10 w-3/4 bg-gray-300 rounded mb-2"></div>
        {/* Subtitle */}
        <div className="h-6 sm:h-7 lg:h-8 w-1/2 bg-gray-300 rounded mb-8"></div>

        {/* Info Boxes */}
        <div className="flex items-start justify-between max-w-80 sm:max-w-[460px] mt-8">
          <div className="flex flex-col items-center justify-center">
            <FaRegClock className="text-3xl text-gray-300" />
            <div className="h-4 w-16 bg-gray-300 rounded mt-2"></div>
            <div className="h-3 w-20 bg-gray-300 rounded mt-1"></div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <FaThermometerHalf className="text-3xl text-gray-300" />
            <div className="h-4 w-20 bg-gray-300 rounded mt-2"></div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <ImLab className="text-3xl text-gray-300" />
            <div className="h-4 w-24 bg-gray-300 rounded mt-2"></div>
          </div>
        </div>

        {/* Rating and Reviews */}
        <div className="flex mt-4 items-center">
          <div className="h-5 w-32 bg-gray-300 rounded mr-2"></div>
          <div className="h-5 w-20 bg-gray-300 rounded"></div>
        </div>

        {/* Price */}
        <div className="h-7 w-40 bg-gray-300 rounded mt-6 mb-2"></div>

        {/* Add to Cart Button */}
        <div className="flex items-center border border-gray-300 px-3 py-2 bg-gray-300 rounded w-32 h-10">
          <IoCart className="me-2 text-[20px] text-gray-400" />
          <div className="h-4 w-16 bg-gray-400 rounded"></div>
        </div>
      </div>
    </section>
    <section className="my-12 animate-pulse">
      {/* Heading */}
      <div className="h-6 md:h-7 w-1/2 bg-gray-300 rounded mb-2"></div>
      {/* Subtitle */}
      <div className="h-5 w-1/4 bg-gray-300 rounded mt-2 mb-4"></div>

      {/* List */}
      <ul className="text-gray-600 text-sm space-y-2 ps-4 list-disc mt-4">
        <li><div className="h-4 w-11/12 bg-gray-300 rounded"></div></li>
        <li><div className="h-4 w-1/3 bg-gray-300 rounded"></div></li>
        <li><div className="h-4 w-2/3 bg-gray-300 rounded"></div></li>
        <li><div className="h-4 w-3/4 bg-gray-300 rounded"></div></li>
        <li><div className="h-4 w-2/3 bg-gray-300 rounded"></div></li>
        <li><div className="h-4 w-1/2 bg-gray-300 rounded"></div></li>
        <li><div className="h-4 w-11/12 bg-gray-300 rounded"></div></li>
      </ul>

      {/* Additional Info Paragraph */}
      <div className="mt-5">
        <div className="h-4 w-full bg-gray-300 rounded mb-1"></div>
        <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
      </div>

      {/* Icon Grid */}
      <div className="grid grid-cols-3 mt-5 sm:mt-10 gap-4 lg:gap-8">
        <div className="flex flex-col items-center justify-center">
          <TbTruckReturn className="text-xl sm:text-7xl text-gray-300" />
          <div className="h-3 w-20 bg-gray-300 rounded mt-2"></div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <ImLab className="text-xl sm:text-6xl text-gray-300" />
          <div className="h-3 w-24 bg-gray-300 rounded mt-2"></div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <IoShieldCheckmarkSharp className="text-xl sm:text-6xl text-gray-300" />
          <div className="h-3 w-20 bg-gray-300 rounded mt-2"></div>
        </div>
      </div>
    </section>
    </>
  );
};

export default ProductSkeleton;