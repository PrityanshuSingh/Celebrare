import React, { useRef, useEffect, useState } from "react";
import styles from "./styles/MaskModal.module.css";
import Heart from "../../assets/Heart.png";
import Circle from "../../assets/Circle.png";
import Rectangle from "../../assets/Rectangle.png";
import Square from "../../assets/Sqaure.png";
import { useNavigate } from "react-router-dom"; 

const MaskModal = ({ croppedImage, handleMaskImage }) => {
  const canvasRef = useRef(null);
  const [maskedImage, setMaskedImage] = useState(croppedImage);
  const navigate = useNavigate();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const image = new Image();
    image.src = croppedImage;

    image.onload = () => {
      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, [croppedImage]);

  const applyMask = (maskUrl) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
  
    const mask = new Image();
    mask.src = maskUrl;
  
    mask.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const image = new Image();
      image.src = croppedImage;
  
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  
        ctx.globalCompositeOperation = "destination-in";
        ctx.drawImage(mask, 0, 0, canvas.width, canvas.height);
  
        ctx.globalCompositeOperation = "source-over";
  
        setMaskedImage(canvas.toDataURL("image/png"));
      };
    };
  };

  const handleNavigateToActions = () => {
    navigate("/actions", {
      state: {
        imgSrc: maskedImage, 
        maskedImage: maskedImage,
      },
    });
  };
  
  return (
    <div className={styles.modal}>
      <h2>Select a Mask Shape</h2>
      <div className={styles.croppedImageContainer}>
        <h3>Preview:</h3>
        <img src={maskedImage} alt="Masked Preview" className={styles.maskedImage} />
        <canvas ref={canvasRef} style={{ display: "none" }} />
      </div>
      <div className={styles.maskOptions}>
        <button onClick={() => setMaskedImage(croppedImage)}>Original</button>
        <button onClick={() => applyMask(Heart)}>
          <img src={Heart} alt="Heart Mask" style={{ width: "45px" }} />
        </button>
        <button onClick={() => applyMask(Circle)}>
          <img src={Circle} alt="Circle Mask" style={{ width: "45px" }} />
        </button>
        <button onClick={() => applyMask(Square)}>
          <img src={Square} alt="Square Mask" style={{ width: "45px" }} />
        </button>
        <button onClick={() => applyMask(Rectangle)}>
          <img src={Rectangle} alt="Rectangle Mask" style={{ width: "45px" }} />
        </button>
      </div>
      <button onClick={handleNavigateToActions} disabled={!maskedImage}>
        Mask Image
      </button>
    </div>
  );
};

export default MaskModal;
