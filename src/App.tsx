import React, { useState, useEffect } from 'react';
import ThreeScene from './components/ThreeScene';
import LoadingScreen from './components/LoadingScreen';
import './App.css';
import BackgroundMusic from './components/BackgroundMusic';

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [slideUp, setSlideUp] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSlideUp(true);
            setTimeout(() => setLoading(false), 1000); 
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="App">
              <BackgroundMusic />
            {loading && <LoadingScreen className={slideUp ? 'slide-up' : ''} />}
            <ThreeScene />
        </div>
    );
}

export default App;
