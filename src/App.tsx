import { useEffect, useRef, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
const { BASE_URL } = import.meta.env;

export default function App() {
  // State do animacji tech stack
  const [, setLoaded] = useState(false);

  // Refs do kontenerów projektów
  const projectRefs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
  ];

  const handleBonusClick = () => {
    alert('Brawo! Wygrałeś darmową wycene!');
  };

// --- Hook losujący słowo ---

// --- Lista słów do animacji ---
const rotatingWords = ['pozyskiwania klientów', 'budowania marki', 'utrzymywania uwagi', 'rozwijania biznesu'];





  
  // --- 🎮 Coin Flip Game States ---
  const [showCoinGame, setShowCoinGame] = useState(false);
  const [playerChoice, setPlayerChoice] = useState<'Orzeł' | 'Reszka' | null>(null);
  const [coinResult, setCoinResult] = useState<'Orzeł' | 'Reszka' | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);
  const [winStreak, setWinStreak] = useState(0);
  const [maxDiscount, setMaxDiscount] = useState(0);
    

  const flipCoin = (choice: 'Orzeł' | 'Reszka') => {
  if (isFlipping) return;
  setPlayerChoice(choice);
  setIsFlipping(true);
  setCoinResult(null);

  setTimeout(() => {
    const result: 'Orzeł' | 'Reszka' = Math.random() < 0.5 ? 'Orzeł' : 'Reszka';
    setCoinResult(result);
    setIsFlipping(false);

    if (result === choice) {
      setWinStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak <= 7) {
          setMaxDiscount(prevDisc => Math.min(7, Math.max(prevDisc, newStreak)));
        }
        return newStreak;
      });
    } else {
      setWinStreak(0); // reset streaka, ale zniżka zostaje
    }

    // reset po chwili
    setTimeout(() => {
      setPlayerChoice(null);
      setCoinResult(null);
    }, 2100);
  }, 1500);
};



const [wordIndex, setWordIndex] = useState(0);
const [displayedText, setDisplayedText] = useState('');
const [deleting, setDeleting] = useState(false);

useEffect(() => {
  const currentWord = rotatingWords[wordIndex];
  let timer: number; 

  if (!deleting) {
    if (displayedText.length < currentWord.length) {
      timer = window.setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length + 1));
      }, 150);
    } else {
      timer = window.setTimeout(() => setDeleting(true), 1000);
    }
  } else {
    if (displayedText.length > 0) {
      timer = window.setTimeout(() => {
        setDisplayedText(currentWord.slice(0, displayedText.length - 1));
      }, 80);
    } else {
      setDeleting(false);
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }
  }

  return () => clearTimeout(timer);
}, [displayedText, deleting, wordIndex]);




  // --- Sekcja animacji i drag scroll ---
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.2 }
    );
    sections.forEach(sec => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

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
            setStackVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(stackRef.current);
    return () => observer.disconnect();
  }, []);

  // Drag scroll
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
      const walk = (x - startX) * 2;
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

  useEffect(() => {
    const cleanups = projectRefs.map(ref => enableDragScroll(ref));
    if (projectRefs[2].current) {
      const firstImgWidth = projectRefs[2].current.querySelector('.image-container')!.clientWidth;
      const gap = 20;
      projectRefs[2].current.scrollLeft = firstImgWidth + gap;
    }
    return () => cleanups.forEach(clean => clean && clean());
  }, []);

  return (
    <div className="app  ">
      <Navbar />

      {/* HERO */}
    <section id="hero" className="relative py-20">
  <h1 className="text-center font-bold text-white leading-tight relative">
    
    <span className="text-4xl text-gray-400 font-light">od</span>{' '}

    {/* Hover dla "pomysłu" */}
    <span className="relative group inline-block mx-1">
      <span className="text-8xl text-purple-400 font-semibold cursor-pointer">
        pomysłu
      </span>
      <span className="absolute left-1/2 -translate-x-1/2 -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-pink-400 text-4xl font-semibold mt-5">
        twojego
      </span>
    </span>{' '}
    
    <span className="text-4xl text-gray-400 font-light">do</span>{' '}

    {/* Hover dla "strony" */}
    <span className="relative group inline-block mx-1">
      <span className="text-8xl text-purple-400 font-semibold cursor-pointer">
        strony
      </span>
      <span className="absolute left-1/2 -translate-x-1/2 -top-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-pink-400 text-4xl font-semibold">
        perfekcyjnej
      </span>
    </span>
  </h1>
</section>




  <section id="highlight" className="highlight">
  <div className="highlight-text">
    <h2>Robimy strony internetowe</h2>
    <h3>Stworzone do&nbsp;
      <span className="rotating-word">{displayedText}</span>
      <span className="cursor">|</span>
    </h3>
    <p>Powiedz nam czego potrzebujesz, a my Ci to ogarniemy.</p>

  </div>

  <div className="highlight-image">
    <img src="${BASE_URL}/img/ujdzie.jpg" alt="Grafika" />
  </div>
</section>




      {/* --- MODAL COIN GAME --- */}
              {showCoinGame && (
          <div className="coin-modal">
            <div className="coin-content">
              <h3 className="coin-title">🎯 Rzuć monetą!</h3>

              <div className="coin-choices">
                <button
                  className={`coin-btn ${playerChoice === 'Orzeł' ? 'active' : ''}`}
                  onClick={() => flipCoin('Orzeł')}
                  disabled={isFlipping || playerChoice !== null}
                >
                  Orzeł
                </button>

                <button
                  className={`coin-btn ${playerChoice === 'Reszka' ? 'active' : ''}`}
                  onClick={() => flipCoin('Reszka')}
                  disabled={isFlipping || playerChoice !== null}
                >
                  Reszka
                </button>
              </div>

              {isFlipping && <p className="coin-status">Moneta w powietrzu... 🪙</p>}

              {coinResult && (
                <p className="coin-result">
                  {coinResult === playerChoice ? (
                    <><strong>Wygrałeś! 🎉</strong> – dobrze obstawiłeś.<br /></>
                  ) : (
                    <><strong>Niestety, przegrałeś.</strong> – spróbuj ponownie.<br /></>
                  )}
                </p>
              )}

              <div className="coin-stats">
                <p>🔥 Streak: <strong>{winStreak}</strong></p>
                <p>💰 Twój max win: <strong>{maxDiscount}%</strong></p>
              </div>

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
            <p className="project-review">"Profesjonalna realizacja! Strona wygląda świetnie i działa bez zarzutu." – Jan Kowalski</p>
            <div className="project-tags">
              <span className="tag">Branding</span>
              <span className="tag">Key Visual</span>
            </div>
          </div>
          <div className="project-images" ref={projectRefs[0]}>
            <div className="image-container"><img src="/img/auto1.png" alt="Auto" /></div>
            <div className="image-container"><img src="/img/auto3.png" alt="Auto" /></div>
            <div className="image-container"><img src="/img/auto2.png" alt="Auto" /></div>
          </div>
        </div>

        {/* Projekt 2 */}
        <div className="project">
          <div className="project-info">
            <h2 className="project-title">Kotki 😸</h2>
            <p className="project-description">
              Interaktywna strona o kotkach z drag & scroll i animacjami hover w React + TypeScript.
            </p>
            <p className="project-review">"Strona jest przejrzysta i bardzo przyjazna! Animacje robią wrażenie." – PurrDesign</p>
            <div className="project-tags">
              <span className="tag">UI/UX</span>
              <span className="tag">React</span>
            </div>
          </div>
          <div className="project-images" ref={projectRefs[1]}>
            <div className="image-container"><img src="/img/kotek1.png" alt="Kotki" /></div>
            <div className="image-container"><img src="/img/kotek2.png" alt="Kotki" /></div>
            <div className="image-container"><img src="/img/kotek3.png" alt="Kotki" /></div>
            <div className="image-container"><img src="/img/kotek4.png" alt="Kotki" /></div>
          </div>
        </div>

        {/* Projekt 3 */}
        <div className="project">
          <div className="project-info">
            <h2 className="project-title">Twoja strona</h2>
            <p className="project-description">Tutaj może znaleźć się Twój projekt — stwórzmy coś wyjątkowego razem!</p>
            
            <div className="project-tags"><span className="tag">Współpraca</span></div>
          </div>
          <div className="project-images" ref={projectRefs[2]}>
            <div className="image-container" onClick={handleBonusClick}><img src="/img/jackpot.jpg" alt="Bonus" /></div>
            <div className="image-container"><img src="/img/twoja1.jpg" alt="Twoja strona" /></div>
            <div className="image-container"><img src="/img/twoja2.jpg" alt="Twoja strona" /></div>
            <div className="image-container"><img src="/img/xd.avif" alt="Twoja strona" /></div>
          </div>
        </div>
      </section>

      {/* TECH STACK */}
     <section id="stack" className="stack small-padding" ref={stackRef}>
  <h2 className="tech-title">Tech Stack</h2>

  <div className="tech-grid">
    {/* Kolumna 1 */}
    <div className="flex flex-col gap-6">
      {[
        ['JavaScript', 'js.png', '52%'],
        ['TypeScript', 'ts.png', '82%'],
        ['React', 'react.png', '73%'],
        ['Angular', 'angular.png', '68%'],
        ['Vite', 'vite.png', '76%'],
      ].map(([name, img, level]) => (
        <div className="tech-item" key={name}>
          <div className="tech-left">
            <img src={`/img/${img}`} alt={name} className="tech-icon" />
            <span className="tech-name">{name}</span>
          </div>
          <div className="tech-bar">
            <div
              className={`tech-level ${stackVisible ? 'filled' : ''}`}
              style={{ '--level-width': level } as React.CSSProperties}
            ></div>
          </div>
        </div>
      ))}
    </div>

    {/* Kolumna 2 */}
    <div className="flex flex-col gap-6">
      {[
        ['Tailwind CSS', 'tailwind.png', '72%'],
        ['Node.js', 'node.png', '65%'],
        ['PHP', 'php.png', '40%'],
        ['CSS', 'css.png', '75%'],
        ['HTML', 'html.png', '90%'],
      ].map(([name, img, level]) => (
        <div className="tech-item" key={name}>
          <div className="tech-left">
            <img src={`/img/${img}`} alt={name} className="tech-icon" />
            <span className="tech-name">{name}</span>
          </div>
          <div className="tech-bar">
            <div
              className={`tech-level ${stackVisible ? 'filled' : ''}`}
              style={{ '--level-width': level } as React.CSSProperties}
            ></div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>




      {/* CONTACT */}
      <section id="contact" className="contact small-padding ">

        <div className="cta">
          <button className="btn" onClick={() => { setShowCoinGame(true); setCoinResult(null); }}>
            Zagrajmy w grę 🎲
          </button>
        </div>


        <div className="socials mt-1">
          <a href="https://github.com/xdMatty" target="_blank">GitHub</a>
        </div>
      </section>

      <footer>
        <p>© 2025 MattyW | Stworzone z ❤️ w React + TS</p>
      </footer>
    </div>
  );
}
