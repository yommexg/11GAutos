import React, { useState } from 'react';



const ImageSwitcher: React.FC<{ images: string[], name: string }> = ({ images, name }) => {
  const [largeImageIndex, setLargeImageIndex] = useState(0);

  const handleHover = (index: number) => {
    if (index !== largeImageIndex) {
      setLargeImageIndex(index);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <img
        src={images[largeImageIndex]}
        alt={images[largeImageIndex]}
        className="object-cover rounded-lg shadow-md"
      />
      <div className="flex gap-5">
        {images.map((image, index) => (
      <div key={image} className={`p-[2px] rounded-md ${
              index === largeImageIndex ? 'bg-[#1B1B1B]' : 'bg-white'
            }`}>
            <img
            key={image}
            src={image}
            alt={name}
            className="w-10 h-10 rounded-md"
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => setLargeImageIndex(largeImageIndex)} 
          />
      </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSwitcher;
