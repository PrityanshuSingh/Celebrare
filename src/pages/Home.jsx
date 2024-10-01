import React, { useEffect, useState } from 'react';
import SplashScreen from '../components/spashscreen/SplashScreen';
import ImageActions from '../components/modals/ActionModal';
import styles from "./styles/Home.module.css";

const Home = () => {
    const [showSplash, setShowSplash] = useState(false);
    const [isSplashShown, setIsSplashShown] = useState(false);

    useEffect(() => {
        const splashCount = sessionStorage.getItem('splashCount');
        if (!splashCount) {
            setShowSplash(true);
        } else {
            setShowSplash(false);
        }
    }, []);

    useEffect(() => {
        if (showSplash) {
            const timer = setTimeout(() => {
                setIsSplashShown(true);
                sessionStorage.setItem('splashCount', '1');
                setShowSplash(false);
            }, 3300);

            return () => clearTimeout(timer);
        }
    }, [showSplash]);

    return (
        <div className={styles.container}>
            {showSplash && <SplashScreen />}
            {!showSplash && (
                <div className={styles.Hero}>
                    <div className={styles.backgroundShapes}>
                        <div className={`${styles.shape} ${styles.circle}`}></div>
                        <div className={`${styles.shape} ${styles.square}`}></div>
                        <div className={`${styles.shape} ${styles.rectangle}`}></div>
                        <div className={`${styles.shape} ${styles.circle}`}></div>
                        <div className={`${styles.shape} ${styles.square}`}></div>
                        <div className={`${styles.shape} ${styles.rectangle}`}></div>
                    </div>
                    <h1 className={styles.heading}>Welcome to <span className={styles.name}>Celebrare</span></h1>
                    <p className={styles.description}>
                        At Celebrare, we believe in creating unforgettable moments through unique ideas and innovative designs. 
                        Our mission is to transform your visions into reality, using creative masks and shaped images that bring your events to life. 
                        Whatever we are working on, we strive to make it extraordinary!
                    </p>
                    <div className={styles.divider}>
                       <ImageActions />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
