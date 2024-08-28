import React, { useState, useEffect } from 'react';
import ThreeScene from './components/ThreeScene';
import LoadingScreen from './components/LoadingScreen';
import './App.css';

const App: React.FC = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="App">
            {loading ? <LoadingScreen /> : <ThreeScene />}
        </div>
    );
}

export default App;
