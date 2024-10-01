import { useState, useCallback } from "react";
import { Button, TextField, Dialog, IconButton } from "@mui/material";
import { getCroppedImg } from "../../utils/CropImage";
import CropModal from "./CropModal";
import MaskModal from "./MaskModal";
import { useNavigate, useLocation } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import styles from "./styles/ActionModal.module.css";

const Actions = () => {
  const location = useLocation();
  const { imgSrc, maskedImage } = location.state || {};

  const [imageSrc, setImageSrc] = useState(imgSrc || null);
  const [croppedImage, setCroppedImage] = useState(maskedImage || null);
  const navigate = useNavigate();
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showMaskModal, setShowMaskModal] = useState(false);

  const [publishDialogOpen, setPublishDialogOpen] = useState(false);
  const [description, setDescription] = useState("");

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result);
        setShowModal(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropImage = async () => {
    try {
      const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImage);
      setShowModal(false);
      setShowMaskModal(true);
    } catch (e) {
      console.error(e);
    }
  };

  const handleMaskImage = (maskedImage) => {
    setMaskedImage(maskedImage);
    setShowMaskModal(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = maskedImage;
    link.download = "masked-image.jpg";
    link.click();
  };

  const handleReset = () => {
    navigate("/");
  };

  const handlePublish = () => {
    const card = { image: maskedImage, description };
    const existingCards = JSON.parse(sessionStorage.getItem("cards")) || [];
    existingCards.push(card);
    sessionStorage.setItem("cards", JSON.stringify(existingCards));
    console.log("card", card);
    setDescription("");
    setPublishDialogOpen(false);
  };

  const handleNavigateToCards = () => {
    navigate("/cards");
  };

  return (
    <div className="container">
      {!imageSrc ? (
        <input
          style={{
            backgroundColor: "white",
            color: "#11867e",
            border: "2px solid #11867e",
            padding: "20px",
            borderRadius: "20px",
            width: "60%",
            zIndex: "2",
            cursor: "pointer",
          }}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
      ) : (
        <>
          {showModal && (
            <CropModal
              imageSrc={imageSrc}
              crop={crop}
              zoom={zoom}
              setCrop={setCrop}
              setZoom={setZoom}
              onCropComplete={onCropComplete}
              handleCropImage={handleCropImage}
            />
          )}
          {showMaskModal && (
            <MaskModal
              croppedImage={croppedImage}
              handleMaskImage={handleMaskImage}
            />
          )}
        </>
      )}
      {maskedImage && (
        <div className={styles.container}>
          <h3>Masked Image:</h3>
          <img src={maskedImage} alt="Masked" className={styles.maskedImage} />
          <div className={styles.buttonContainer}>
            <Button
              onClick={handleDownload}
              variant="contained"
              style={{
                backgroundColor: "#11867e",
                width: "80%",
                height: "50px",
              }}
            >
              Download
            </Button>
            <Button
              onClick={handleReset}
              variant="contained"
              style={{ backgroundColor: "red", width: "80%", height: "50px" }}
            >
              Reset Image
            </Button>
            <Button
              onClick={() => setPublishDialogOpen(true)}
              variant="contained"
              style={{
                backgroundColor: "#11867e",
                width: "80%",
                height: "50px",
              }}
            >
              Save as Card
            </Button>
            <Button
              onClick={handleNavigateToCards}
              variant="contained"
              style={{
                backgroundColor: "#11867e",
                width: "80%",
                height: "50px",
              }}
            >
              Your Cards
            </Button>
          </div>
        </div>
      )}

      <Dialog
        open={publishDialogOpen}
        onClose={() => setPublishDialogOpen(false)}
      >
        <div
          style={{
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "relative",
          }}
        >
          <IconButton
            onClick={() => setPublishDialogOpen(false)}
            style={{ position: "absolute", top: "10px", right: "10px" }}
          >
            <FaTimes />
          </IconButton>

          <h2>Save Your Image as Card</h2>
          <img
            src={maskedImage}
            alt="Masked"
            style={{ width: "350px", height: "250px" }}
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            onClick={handlePublish}
            variant="contained"
            style={{ backgroundColor: "#11867e", width: "40%" }}
          >
            Save
          </Button>
        </div>
      </Dialog>
    </div>
  );
};

export default Actions;
