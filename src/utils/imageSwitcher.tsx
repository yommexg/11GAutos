import React, { useState } from 'react';



const ImageSwitcher: React.FC<{ images: string[], name: string }> = ({ images, name }) => {
  const [largeImageIndex, setLargeImageIndex] = useState(0);

  const handleHover = (index: number) => {
    if (index !== largeImageIndex) {
      setLargeImageIndex(index);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 py-4">
      <img
        src={images && images[largeImageIndex]}
        alt={name}
        className="object-center rounded-lg shadow-md w-[350px] h-[200px] md:w-[700px] md:h-[500px] lg:w-[900px] lg:h-[600px]"
      />
      <div className="flex gap-5">
        {images && images.map((image, index) => (
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
