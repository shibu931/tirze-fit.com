'use client'
import Image from 'next/image'
import { useState } from 'react'

const ProductImage = ({ productImages, productName }) => {
    console.log('productImages', productImages);
    
    const [mainImage, setMainImage] = useState(productImages[0].large)
    const [isHovering, setIsHovering] = useState(false)
    const [cursorPosition, setCursorPosition] = useState({
        x: 0, 
        y: 0,
        bgX: 0,
        bgY: 0
    })
    const [containerRect, setContainerRect] = useState({
        width: 0,
        height: 0
    })
    
    const ZOOM_LEVEL = 2
    const LENS_SIZE = 180 

    const handleImageClick = (image) => {
        setMainImage(image.large)
    }

    const handleMouseMove = (e) => {
        const container = e.currentTarget.getBoundingClientRect()
        const x = e.clientX - container.left
        const y = e.clientY - container.top
        
        // Calculate background position for zoom
        const bgX = x * ZOOM_LEVEL - LENS_SIZE / 2
        const bgY = y * ZOOM_LEVEL - LENS_SIZE / 2
        
        // Clamp values to stay within image bounds
        const maxBgX = container.width * ZOOM_LEVEL - LENS_SIZE
        const maxBgY = container.height * ZOOM_LEVEL - LENS_SIZE
        
        setCursorPosition({ 
            x: x, // Store relative X position
            y: y, // Store relative Y position
            bgX: Math.max(0, Math.min(bgX, maxBgX)),
            bgY: Math.max(0, Math.min(bgY, maxBgY))
        })
        
        setContainerRect({
            width: container.width,
            height: container.height,
        })
    }

    return (
        <div>
            <div 
                className='flex justify-center border border-gray-400 relative'
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onMouseMove={handleMouseMove}
            >
                <Image
                    src={mainImage}
                    width={400}
                    height={400}
                    alt={productName}
                    priority
                    className="object-contain"
                />
                {isHovering && (
                    <div
                        className="absolute pointer-events-none overflow-hidden border-2 border-gray-400"
                        style={{
                            width: `${LENS_SIZE}px`,
                            height: `${LENS_SIZE}px`,
                            left: `${cursorPosition.x - LENS_SIZE/2}px`,
                            top: `${cursorPosition.y - LENS_SIZE/2}px`,
                            boxShadow: '0 0 10px rgba(0,0,0,0.25)',
                            transform: 'translateZ(0)' // Force hardware acceleration
                        }}
                    >
                        <div
                            className="w-full h-full"
                            style={{
                                backgroundImage: `url(${mainImage})`,
                                backgroundSize: `${containerRect.width * ZOOM_LEVEL}px ${containerRect.height * ZOOM_LEVEL}px`,
                                backgroundPosition: `-${cursorPosition.bgX}px -${cursorPosition.bgY}px`
                            }}
                        />
                    </div>
                )}
            </div>
            
            {/* Thumbnails */}
            <div className='flex justify-center mt-3'>
                {productImages?.map((image, index) => (
                    <Image
                        key={index}
                        src={image.large}
                        width={100}
                        height={100}
                        onClick={() => handleImageClick(image)}
                        alt={image.large.split('/').pop()}
                        className='mx-1 cursor-pointer w-[80px] md:w-[120px] h-[80px] md:h-[120px] border border-gray-400 p-2 object-cover hover:scale-110 transition-transform duration-300'
                    />
                ))}
            </div>
        </div>
    )
}

export default ProductImage