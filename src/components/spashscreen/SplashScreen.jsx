import { useEffect, useState } from 'react';
import styles from './styles/SplashScreen.module.css';

const SplashScreen = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`${styles.splashScreen} ${loading ? '' : styles.fadeOut}`}>
            <h1 className={styles.logo}>CELEBRARE</h1><br />
        </div>
    );
};

export default SplashScreen;
