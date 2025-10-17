import { useEffect, useRef, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';

export default function App() {
  // State do animacji tech stack
  const [loaded, setLoaded] = useState(false);

  // Refs do kontenerów projektów
  const projectRefs = [useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null)];

const handleBonusClick = () => {
  alert('Brawo! Wygrałeś 7% zniżki na kolejną stronę!');
};

// na górze komponentu App (stany)
const [showCoinGame, setShowCoinGame] = useState(false);
const [playerChoice, setPlayerChoice] = useState<'Orzeł' | 'Reszka' | null>(null);
const [coinResult, setCoinResult] = useState<'Orzeł' | 'Reszka' | null>(null);
const [isFlipping, setIsFlipping] = useState(false);

const flipCoin = (choice: 'Orzeł' | 'Reszka') => {
  if (isFlipping) return; // zabezpieczenie przed spamem
  setPlayerChoice(choice);
  setIsFlipping(true);
  setCoinResult(null);

  setTimeout(() => {
    const result: 'Orzeł' | 'Reszka' = Math.random() < 0.5 ? 'Orzeł' : 'Reszka';
    setCoinResult(result);
    setIsFlipping(false);

    // ✅ reset dopiero po chwili od pokazania wyniku
    setTimeout(() => {
      setPlayerChoice(null);
      setCoinResult(null);
    }, 2500);
  }, 1500);
};





  // IntersectionObserver dla animacji sekcji
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    sections.forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  // Animacja ładowania tech stack
  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const stackRef = useRef<HTMLDivElement | null>(null);
const [stackVisible, setStackVisible] = useState(false);

useEffect(() => {
  if (!stackRef.current) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setStackVisible(true); // tutaj uruchamiamy animację
          observer.disconnect(); // tylko raz
        }
      });
    },
    { threshold: 0.3 } // 30% sekcji widoczne
  );

  observer.observe(stackRef.current);

  return () => observer.disconnect();
}, []);



  // Funkcja drag & scroll
  const enableDragScroll = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const mouseDown = (e: MouseEvent) => {
      e.preventDefault();
      isDown = true;
      startX = e.pageX - ref.current!.offsetLeft;
      scrollLeft = ref.current!.scrollLeft;
    };

    const mouseUp = () => { isDown = false; };
    const mouseLeave = () => { isDown = false; };
    const mouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - ref.current!.offsetLeft;
      const walk = (x - startX) * 2; // prędkość przesuwania
      ref.current!.scrollLeft = scrollLeft - walk;
    };

    ref.current.addEventListener('mousedown', mouseDown);
    ref.current.addEventListener('mouseup', mouseUp);
    ref.current.addEventListener('mouseleave', mouseLeave);
    ref.current.addEventListener('mousemove', mouseMove);

    return () => {
      ref.current?.removeEventListener('mousedown', mouseDown);
      ref.current?.removeEventListener('mouseup', mouseUp);
      ref.current?.removeEventListener('mouseleave', mouseLeave);
      ref.current?.removeEventListener('mousemove', mouseMove);
    };
  };
const [showAbout, setShowAbout] = useState(false);

const toggleAbout = () => setShowAbout(prev => !prev);


  

  // Włącz drag scroll dla wszystkich projektów
  useEffect(() => {
    const cleanups = projectRefs.map(ref => enableDragScroll(ref));
    if (projectRefs[2].current) {
    const firstImgWidth = projectRefs[2].current.querySelector('.image-container')!.clientWidth;
    const gap = 20; // taki sam jak w CSS `gap` między zdjęciami
    projectRefs[2].current.scrollLeft = firstImgWidth + gap;}
    return () => cleanups.forEach(clean => clean && clean());
  }, []);


  
  return (
    <div className="app">
      <Navbar />

      {/* HERO */}
      <section id="hero" className="hero small-padding">
        <h1>Witam serdecznie! 👋</h1>
        <p>Chcesz szybko, tanio i dobrze?</p>
         <div className="cta">
  <button className="btn" onClick={() => { setShowCoinGame(true); setCoinResult(null); }}>
    Zagrajmy w grę 🎲
  </button>
</div>
      </section>

{showCoinGame && (
  <div className="coin-modal">
    <div className="coin-content">
      <h3>Obstaw Orła lub Reszkę!</h3>

      <div className="coin-choices">
        <button
          className={`btn ${playerChoice === 'Orzeł' ? 'active' : ''}`}
          onClick={() => flipCoin('Orzeł')}
          disabled={isFlipping || playerChoice !== null}
        >
          Orzeł
        </button>

        <button
          className={`btn ${playerChoice === 'Reszka' ? 'active' : ''}`}
          onClick={() => flipCoin('Reszka')}
          disabled={isFlipping || playerChoice !== null}
        >
          Reszka
        </button>
      </div>

      {isFlipping && <p>Moneta w powietrzu... 🪙</p>}

      {coinResult && (
        <p>
          {coinResult === playerChoice ? (
            <><strong>Wygrałeś! 🎉</strong> — dobrze obstawiłeś.<br/></>
          ) : (
            <><strong>Niestety, przegrałeś.</strong> — spróbuj ponownie.<br/></>
          )}
          Wynik: <strong>{coinResult}</strong>
        </p>
      )}

      <button className="btn secondary" onClick={() => setShowCoinGame(false)}>
        Zamknij
      </button>
    </div>
  </div>
)}





      {/* PROJECTS */}
      <section id="projects" className="projects">
        
        {/* Projekt 1 */}
        <div className="project">
          <div className="project-info">
            <h2 className="project-title">Motocom</h2>
            <p className="project-description">
              Tworząc stronę dla fanów szybkich fur, skupiłem się na wrażeniu luksusu, efektownych animacjach i klarownym przekazie marki.
            </p>
            <p className="project-review">
      "Profesjonalna realizacja! Strona wygląda świetnie i działa bez zarzutu." – Jan Kowalski
    </p>
            <div className="project-tags">
              <span className="tag">Branding</span>
              <span className="tag">Key Visual</span>
            </div>
          </div>
          <div className="project-images" ref={projectRefs[0]}>
            <div className="image-container">
              <img src="/img/auto1.png" alt="Smaochodowo" />
            </div>
            <div className="image-container">
              <img src="/img/auto3.png" alt="Smaochodowo" />
            </div>
            <div className="image-container">
              <img src="/img/auto2.png" alt="Smaochodowo" />
            </div>
          </div>
        </div>

        {/* Projekt 2 */}
        <div className="project">
          <div className="project-info">
            <h2 className="project-title">Kotki😸</h2>
            <p className="project-description">
              Wykonałem interaktywną stronę o kotkach, łącząc estetyczny design, animacje przy hover i drag & scroll, prezentując moje zdolności front-endowe w React + TypeScript.
            </p>
<p className="project-review">
      "Strona jest przejrzysta i bardzo przyjazna dla użytkownika! Animacje robią wrażenie." - Studio Kreatywne PurrDesign
    </p>
            <div className="project-tags">
              <span className="tag">UI/UX</span>
              <span className="tag">React</span>
            </div>
          </div>
          <div className="project-images" ref={projectRefs[1]}>
            <div className="image-container">
              <img src="/img/kotek1.png" alt="Kotki" />
            </div>
            <div className="image-container">
              <img src="/img/kotek2.png" alt="Kotki" />
            </div>
            <div className="image-container">
              <img src="/img/kotek3.png" alt="Kotki" />
            </div>
            <div className="image-container">
              <img src="/img/kotek4.png" alt="Kotki" />
            </div>
          </div>
        </div>


 {/* Projekt twoj! */}
        <div className="project">
          <div className="project-info">
            <h2 className="project-title">Twoja strona</h2>
            <p className="project-description">
Tutaj może znaleźć się Twój projekt. Skontaktuj się, a razem stworzymy coś wyjątkowego!        </p>
<p className="project-review">
      "Zostaw parę słów"
    </p>
            <div className="project-tags">
              <span className="tag">Współpraca</span>

            </div>
          </div>
          <div className="project-images" ref={projectRefs[2]}>

             <div className="image-container" onClick={handleBonusClick}>
              <img src="/img/jackpot.jpg" alt="Smaochodowo" />
            </div>
            <div className="image-container">
              <img src="/img/twoja1.jpg" alt="Smaochodowo" />
            </div>
            <div className="image-container">
              <img src="/img/twoja2.jpg" alt="Smaochodowo" />
            </div>
            <div className="image-container">
              <img src="/img/xd.avif" alt="Smaochodowo" />
            </div>
            
          </div>
        </div>

      </section>
      

{/* TECH STACK */}
<section id="stack" className="stack small-padding" ref={stackRef}>
  <h2 className='tech-title'>Tech Stack</h2>

  <div className="tech-item">
    <div className="tech-left">
      <img src="/img/js.png" alt="JavaScript" className="tech-icon" />
      <span className='tech-name'>JavaScript</span>
    </div>
    <div className="tech-bar">
      <div
        className={`tech-level ${stackVisible ? 'filled' : ''}`}
        style={{ '--level-width': '72%' } as React.CSSProperties}
      ></div>
    </div>
  </div>

  <div className="tech-item">
    <div className="tech-left">
      <img src="/img/ts.png" alt="TypeScript" className="tech-icon" />
      <span className='tech-name'>TypeScript</span>
    </div>
    <div className="tech-bar">
      <div
        className={`tech-level ${stackVisible ? 'filled' : ''}`}
        style={{ '--level-width': '82%' } as React.CSSProperties}
      ></div>
    </div>
  </div>

  <div className="tech-item">
    <div className="tech-left">
      <img src="/img/react.png" alt="React" className="tech-icon" />
      <span className='tech-name'>React</span>
    </div>
    <div className="tech-bar">
      <div
        className={`tech-level ${stackVisible ? 'filled' : ''}`}
        style={{ '--level-width': '73%' } as React.CSSProperties}
      ></div>
    </div>
  </div>

  <div className="tech-item">
    <div className="tech-left">
      <img src="/img/angular.png" alt="Angular" className="tech-icon" />
      <span className='tech-name'>Angular</span>
    </div>
    <div className="tech-bar">
      <div
        className={`tech-level ${stackVisible ? 'filled' : ''}`}
        style={{ '--level-width': '78%' } as React.CSSProperties}
      ></div>
    </div>
  </div>

  <div className="tech-item">
    <div className="tech-left">
      <img src="/img/vite.png" alt="Vite" className="tech-icon" />
      <span className='tech-name'>Vite</span>
    </div>
    <div className="tech-bar">
      <div
        className={`tech-level ${stackVisible ? 'filled' : ''}`}
        style={{ '--level-width': '66%' } as React.CSSProperties}
      ></div>
    </div>
  </div>

  <div className="tech-item">
    <div className="tech-left">
      <img src="/img/tailwind.png" alt="Tailwind CSS" className="tech-icon" />
      <span className='tech-name'>Tailwind CSS</span>
    </div>
    <div className="tech-bar">
      <div
        className={`tech-level ${stackVisible ? 'filled' : ''}`}
        style={{ '--level-width': '80%' } as React.CSSProperties}
      ></div>
    </div>
  </div>

</section>
    


      {/* CONTACT */}
      <section id="contact" className="contact small-padding">
        <h2>Kontakt</h2>
        <p>Masz pomysł? 🚀 Napisz do mnie, chętnie pomogę go zrealizować.</p>
        <div className="socials">
          <a href="https://github.com/xdMatty" target="_blank">GitHub</a>
          <a href="https://linkedin.com" target="_blank">LinkedIn</a>
          <a href="mailto:mateusz@example.com">E-mail</a>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <p>© 2025 Mateusz.dev | Stworzone z ❤️ w React + TS</p>
      </footer>
    </div>
  );
}
