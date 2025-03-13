import { MdOutlineStarPurple500 } from "react-icons/md";

const RatingStar = ({ rating, className}) => {
    return (
        <div className="flex">
            {[...Array(5)].map((_, i) => (
                <MdOutlineStarPurple500
                    key={i}
                    className={`${className} ${i < rating ? 'text-yellow-500' : 'text-gray-400'}`}
                />
            ))}
        </div>
    )
}

export default RatingStar