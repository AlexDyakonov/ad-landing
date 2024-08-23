import React, { useState } from 'react';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState(null);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Александр Дьяконов</h1>
        <p>Backend разработчик из России, университет ИТМО🌱</p>
      </header>

      <section className="App-content">
        <div className="App-item" onClick={() => toggleSection('about')}>
          <h2>Обо мне</h2>
          {activeSection === 'about' && (
            <p>
              Я Александр Дьяконов, студент 3 курса Университета ИТМО, НОЦ инфохимии. Закончил ГФМЛ №30 и активно участвую в хакатонах. Пишу на Django и Golang, и я стремлюсь разрабатывать новые сервисы.
            </p>
          )}
        </div>

        <div className="App-item" onClick={() => toggleSection('resume')}>
          <h2>Резюме</h2>
          {activeSection === 'resume' && (
            <div>
              <p>
                <a href="https://drive.google.com/file/d/1SHac1zo_jvKjTywFLPhYOMnH0R0ipJlw/view?usp=sharing" target="_blank" rel="noopener noreferrer">Resume (English)</a>
              </p>
              <p>
                <a href="https://drive.google.com/file/d/1_WEcM5749pkUEXfP84J5osd-DNO8D0es/view?usp=sharing" target="_blank" rel="noopener noreferrer">Резюме (Русский)</a>
              </p>
            </div>
          )}
        </div>

        <div className="App-item">
          <h2>
            <a href="https://github.com/AlexDyakonov" target="_blank" rel="noopener noreferrer">GitHub</a>
          </h2>
        </div>

        <div className="App-item" onClick={() => toggleSection('contacts')}>
          <h2>Контакты</h2>
          {activeSection === 'contacts' && (
            <div>
              <p>
                Email: <a href="mailto:shram.monolit@mail.ru">shram.monolit@mail.ru</a>
              </p>
              <p>
                Phone: <a href="tel:+79045195565">+7(904) 519 55 65</a>
              </p>
              <p>
                Telegram: <a href="https://t.me/schlafzucker" target="_blank" rel="noopener noreferrer">t.me/schlafzucker</a>
              </p>
              <p>
                ВКонтакте: <a href="https://vk.com/mrussy" target="_blank" rel="noopener noreferrer">vk.com/mrussy</a>
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default App;
