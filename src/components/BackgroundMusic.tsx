import React, { useRef, useEffect } from 'react';

const BackgroundMusic: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handleUserInteraction = () => {
      const audio = audioRef.current;
      if (audio) {
        audio.loop = true;
        audio.volume = 0.01;
        audio.play().catch(error => console.error("Ошибка воспроизведения аудио:", error));
        window.removeEventListener('click', handleUserInteraction);
      }
    };

    window.addEventListener('click', handleUserInteraction);

    return () => {
      window.removeEventListener('click', handleUserInteraction);
      const audio = audioRef.current;
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  return (
    <audio ref={audioRef}>
      <source src="/audio/main_theme.mp3" type="audio/mpeg" />
      Ваш браузер не поддерживает элемент audio.
    </audio>
  );
};

export default BackgroundMusic;
