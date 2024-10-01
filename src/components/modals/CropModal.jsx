import Cropper from "react-easy-crop";
import { Button, Slider, Box } from "@mui/material";
import styles from "./styles/CropModal.module.css";

const CropModal = ({
  imageSrc,
  crop,
  zoom,
  setCrop,
  setZoom,
  onCropComplete,
  handleCropImage,
}) => {
  return (
    <div className={styles.modal}>
      <Box
        position="relative"
        width="100%"
        height="400px"
        className={styles.cropperContainer}
      >
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={4 / 3} 
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </Box>
      <Slider
        value={zoom}
        min={1}
        max={3}
        step={0.1}
        onChange={(e, zoomValue) => setZoom(zoomValue)}
        aria-labelledby="Zoom"
        style={{ color: "#11867e" }}
      />
      <Button
        variant="contained"
        style={{ backgroundColor: "#11867e", width: "40%" }}
        onClick={handleCropImage}
      >
        Crop Image
      </Button>
    </div>
  );
};

export default CropModal;
