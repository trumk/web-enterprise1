import React, { useState, useEffect } from 'react';

export const CheckIQ = () => {
  const [yesCount, setYesCount] = useState(0); 
  const [noCount, setNoCount] = useState(0); 
  const [selectedImage, setSelectedImage] = useState(0);
  const [hideNo, setHideNo] = useState(false);
  const [title, setTitle] = useState("Bạn có bị ngu không?");
  const [yes, setYes] = useState("Yes");

  const images = [
    'https://i.pinimg.com/564x/0d/af/39/0daf39f68ab715cbcbe3a5a933d03375.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSi1puizAQHG2Z2TgwVCdi6bco_UqtvwuRXg&s', 
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgD3Z-dGbXz7AeIsK-71sCOOE4OnSkpzTMsjTTZFDksg&s', 
    'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRae6ZIwG3cuZEaAjwJbWw5UtMRRiS0wlIwAfimwnRv563o6CMP', 
    'https://images.fpt.shop/unsafe/filters:quality(5)/fptshop.com.vn/uploads/images/tin-tuc/175066/Originals/memebetter_com-20240123012602.jpg', 
    'https://i.pinimg.com/originals/3c/15/a4/3c15a4ee124bd5c3536739c1f4fce1cf.jpg',
    'https://thuvienmeme.com/wp-content/uploads/2023/09/phieu-be-ngu-ech-xanh.jpg', 
  ];


  const handleYesClick = () => {
    setYesCount(yesCount + 1); 
    setSelectedImage(6); 
    setHideNo(true);
    setTitle("🎉 Chúc mừng bạn đã nhận được 🎉"); 
    setYes("Thank you");
  };


  const handleNoClick = () => {
    setNoCount(noCount + 1); 
    if (noCount >= 5) {
      setSelectedImage(0); 
    } else {
      setSelectedImage(selectedImage + 1); 
    }
  };

  useEffect(() => {
    if (yesCount === 2) { 
      window.location.href = 'https://group4tch2406.onrender.com/';
    }
  }, [yesCount]); 

  const yesButtonWidth = 80 * Math.pow(2, noCount); 
  const yesButtonHeight = 40 * Math.pow(2, noCount); 

  return (
    <div className="text-center p-5"> 
      <b><h1>{title}</h1></b>
      <img
        src={images[selectedImage]} 
        alt="Image"
        className="w-60 h-60 mx-auto" 
      />
      <div className="mt-5 space-x-4"> 
        <button
          onClick={handleYesClick} 
          className={`bg-green-500 text-white rounded`}
          style={{ width: `${yesButtonWidth}px`, height: `${yesButtonHeight}px` }} 
        >
              {yes}
        </button>
        { 
          !hideNo && (
            <button
              onClick={handleNoClick}
              className={`bg-red-500 text-white rounded ${
                noCount >= 5 ? 'hidden' : ''
              }`} 
              style={{ width: `80px`, height: `40px` }} 
            >
              No
            </button>
          )
        }
      </div>
    </div>
  );
};
