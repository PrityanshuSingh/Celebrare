import React from 'react';
import styles from './styles/Card.module.css';
import { Button } from '@mui/material';
import { FaDownload } from 'react-icons/fa';

const CustomCard = ({ image, description }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = image.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.card}>
      <img src={image} alt="Masked" className={styles.image} />
      <div className={styles.content}>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
          <Button onClick={handleDownload} className={styles.downloadButton}>
            <FaDownload size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomCard;
