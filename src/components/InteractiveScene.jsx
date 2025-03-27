import React, { useState, useEffect } from 'react';
import AffectionateCounter from "./CounterScene";
import MusicPlayer from "./MusicPlayer";
import { motion, AnimatePresence } from 'framer-motion';
import backgroundImage from '../assets/love_background_withouthleaf.png';
import cameraImage from '../assets/camera_scenario.png';
import loveBookImage from '../assets/book_scenario.png';
import leafImage from '../assets/rigth_leaf_scenario_1.png';
import '../styles/InteractiveScene.css';

import cameraSound from '../assets/sounds/camera_click.mp3';
import bookSound from '../assets/sounds/turning_page.wav';
import coffeeSound from '../assets/sounds/drinking_coffe.wav';
import leafSound from '../assets/sounds/leaf_cracking.mp3';
import changingPhotoSound from '../assets/sounds/changing_photo.wav';

import womanMyLife from '../assets/photos/woman_of_my_life.png';
import yourFavPlace from '../assets/photos/your_fav_place.jpeg';
import takingCareOfMe from '../assets/photos/taking_care_of_me.jpeg';
import loveU from '../assets/photos/love_u.jpeg';
import bestSmile from '../assets/photos/best_smile.jpeg';
import bDayHug from '../assets/photos/bday_hug.jpeg';
import bDayKiss from '../assets/photos/bday_kiss.jpeg';
import havingFun from '../assets/photos/having_fun.jpeg';

const InteractiveScene = () => {
  const [isNotebookOpen, setIsNotebookOpen] = useState(false);
  const [isCameraRollOpen, setIsCameraRollOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [showHeart, setShowHeart] = useState(false);
  const [showCoffeeTooltip, setShowCoffeeTooltip] = useState(false);
  const [showLeafInfo, setShowLeafInfo] = useState(false);

  const cameraSoundRef = React.useRef(null);
  const bookSoundRef = React.useRef(null);
  const coffeeSoundRef = React.useRef(null);
  const leafSoundRef = React.useRef(null);
  const changingPhotoSoundRef = React.useRef(null);

  useEffect(() => {
    cameraSoundRef.current = new Audio(cameraSound);
    bookSoundRef.current = new Audio(bookSound);
    coffeeSoundRef.current = new Audio(coffeeSound);
    leafSoundRef.current = new Audio(leafSound);
    changingPhotoSoundRef.current = new Audio(changingPhotoSound);

    cameraSoundRef.current.volume = 0.7;
    bookSoundRef.current.volume = 0.7;
    coffeeSoundRef.current.volume = 0.7;
    leafSoundRef.current.volume = 0.7;
    changingPhotoSoundRef.current.volume = 1;

    return () => {
      cameraSoundRef.current = null;
      bookSoundRef.current = null;
      coffeeSoundRef.current = null;
      leafSoundRef.current = null;
      changingPhotoSoundRef.current = null;
    };
  }, []);
  
  const photos = [
    { src: womanMyLife, caption: "Contemplem a minha mulher 😍" },
    { src: yourFavPlace, caption: "Um dos deus lugares favoritos" },
    { src: takingCareOfMe, caption: "Nossa primeira viagem juntos e você cuidando de mim 🥰" },
    { src: loveU, caption: "Te amo hihihi ❤️" },
    { src: bestSmile, caption: "Sou apaixonado por esse sorriso 😍" },
    { src: havingFun, caption: "Com você os dias são mais divertidos" },
    { src: bDayKiss, caption: "Beijo de aniversário" },
    { src: bDayHug, caption: "Esse olho no olho uu" }
  ];

  const handleCameraClick = () => {
    if (cameraSoundRef.current) {
      cameraSoundRef.current.currentTime = 0;
      cameraSoundRef.current.play();
    }
    setIsCameraRollOpen(true);
  };

  const handleBookClick = () => {
    if (bookSoundRef.current) {
      bookSoundRef.current.currentTime = 0;
      bookSoundRef.current.play();
    }
    setIsNotebookOpen(true);
  };

  const handleLeafClick = () => {
    if (leafSoundRef.current) {
      leafSoundRef.current.currentTime = 0;
      leafSoundRef.current.play();
    }
    setShowLeafInfo(true);
  };

  const handleClickPhoto = (photo) => {
    if (changingPhotoSoundRef.current) {
      changingPhotoSoundRef.current.currentTime = 0;
      changingPhotoSoundRef.current.play();
    }
    setSelectedPhoto(photo);
  };

  const handleCoffeeClick = () => {
    if (coffeeSoundRef.current) {
      coffeeSoundRef.current.currentTime = 0;
      coffeeSoundRef.current.play();
    }
    setShowCoffeeTooltip(true);
  };
  
  const handleHeartClick = () => {
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 1500);
  };
  
  return (
    <div className="scene-container">
      <div className="background-image-container">
      { <img 
          src={backgroundImage} 
          alt="Fundo aconchegante" 
          className="background-image"
        /> }

        <AffectionateCounter />
        <MusicPlayer />
        {/* Folha clicável no canto direito */}
        <motion.div
          style={{
            position: 'absolute',
            width: '10%',
            height: '10%',
            right: '14.5%',
            bottom: '59%',
            cursor: 'pointer',
            zIndex: 20,
          }}
          onClick={handleLeafClick}
          onHoverStart={() => setShowLeafInfo(true)}
          onHoverEnd={() => setShowLeafInfo(false)}
          whileHover={{ 
            scale: 1.1,
            rotate: 5,
            filter: "brightness(1.1)",
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 0.95 }}
        >
          <img 
            src={leafImage}
            alt="Folha de outono"
            style={{
              width: '225%',
              height: '225%',
              objectFit: 'contain',
            }}
          />
          
          {/* Tooltip da folha */}
          <AnimatePresence>
            {showLeafInfo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  top: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  whiteSpace: 'nowrap',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#8B4513',
                  zIndex: 25
                }}
              >
                Folhinhas de outono da sua estação preferida ❤️
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Área interativa da xícara de café */}
        <motion.div
          style={{
            position: 'absolute',
            width: '15%',
            height: '15%',
            right: '35%',
            top: '35%',
            cursor: 'pointer',
            zIndex: 20,
            borderRadius: '50%'
          }}
          onClick={handleCoffeeClick}
          onHoverStart={() => setShowCoffeeTooltip(true)}
          onHoverEnd={() => setShowCoffeeTooltip(false)}
        >
          {/* Tooltip da xícara */}
          <AnimatePresence>
            {showCoffeeTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: 'absolute',
                  top: '-40px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                  whiteSpace: 'nowrap',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  color: '#8B5A2B',
                  zIndex: 25
                }}
              >
                hmmmm cappuccino nhami nhami 😋
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Imagem do livro com efeitos mas mantendo as dimensões originais */}
        <motion.div 
          style={{
            position: 'absolute',
            width: '70%', /* Mantendo exatamente o mesmo tamanho */
            height: 'auto',
            left: '25%', /* Mantendo exatamente a mesma posição */
            top: '50%',
            zIndex: 5,
            transformOrigin: 'center center',
            cursor: 'pointer'
          }}
          onClick={handleBookClick}
          whileHover={{ 
            filter: "brightness(1.05) drop-shadow(0 8px 20px rgba(0,0,0,0.3))",
            transition: { duration: 0.3 }
          }}
          whileTap={{ 
            scale: 0.98,
            transition: { duration: 0.1 }
          }}
        >
          <motion.img 
            src={loveBookImage}
            alt="Livro de amor"
            style={{
              width: '100%',
              height: 'auto',
              transform: 'rotate(-1deg)', /* Mantendo a mesma rotação */
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s ease'
            }}
            className="love-book-image"
            whileHover={{ 
              transform: 'rotate(-1deg) translateY(-5px)', 
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.15)' 
            }}
          />
          
          {/* Efeito de brilho na capa do livro que só aparece no hover */}
          <motion.div 
            className="book-shine"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            style={{
              position: 'absolute',
              width: '30%',
              height: '50%',
              background: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0) 60%)',
              borderRadius: '50%',
              top: '20%',
              left: '20%',
              pointerEvents: 'none',
              filter: 'blur(2px)'
            }}
          />
          
          {/* Texto de hover */}
          <motion.div
            className="book-hover-text"
            initial={{ opacity: 0, y: 20 }}
            whileHover={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute',
              bottom: '-30px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              padding: '5px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#e5738c',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              pointerEvents: 'none'
            }}
          >
            Clique para abrir o diário de nós dois
          </motion.div>
        </motion.div>

        {/* Câmera - mantendo igual */}
        <motion.div 
          className="camera-clickable-area"
          onClick={handleCameraClick}
          whileHover={{ 
            scale: 1.03,
            rotate: 1,
            filter: "brightness(1.12)",
            transition: { duration: 0.3 }
          }}
          whileTap={{ scale: 1 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            transition: { delay: 0.5, duration: 0.8, type: "spring" }
          }}
        >
          <img 
            src={cameraImage} 
            alt="Câmera fotográfica vintage" 
            style={{
              width: '425%', /* Maior que o container */
              height: '425%',
              objectFit: 'contain',
              position: 'relative',
              left: '-25%', /* Recentra a imagem */
              top: '-38%'
            }} 
          />
          {/* Efeito de reflexo na lente */}
          <div className="camera-lens-effect"></div>
          
          <div className="hover-label">Clique para ver nossas memórias</div>
        </motion.div>

        {/* Botão flutuante de coração */}
        <motion.div 
          className="floating-heart"
          onClick={handleHeartClick}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          ❤️
        </motion.div>

        {/* Efeito de coração quando clicado */}
        <AnimatePresence>
          {showHeart && (
            <motion.div 
              className="heart-explosion"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1.5 }}
              exit={{ opacity: 0, scale: 2 }}
              transition={{ duration: 1 }}
            >
              <div className="heart-container">
                {[...Array(15)].map((_, index) => (
                  <motion.div
                    key={index}
                    className="flying-heart"
                    initial={{ 
                      x: 0, 
                      y: 0, 
                      opacity: 1,
                      scale: Math.random() * 0.5 + 0.5 
                    }}
                    animate={{ 
                      x: (Math.random() - 0.5) * 200, 
                      y: (Math.random() - 0.5) * 200, 
                      opacity: 0,
                      rotate: Math.random() * 360
                    }}
                    transition={{ duration: 1.5 }}
                  >
                    ❤️
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <AnimatePresence>
  {isNotebookOpen && (
    <div className="modal-overlay">
      <motion.div 
        className="notebook-modal"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        transition={{ type: "spring", damping: 25 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="notebook-background"></div>

        {/* Conteúdo do caderno */}
        <div className="notebook-content">
          <div className="notebook-pages">
            <motion.div 
              className="page left-page"
              initial={{ rotateY: -30, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <div className="heart-icon" style={{ marginBottom: "20px" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-svg">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#ff6b6b"/>
                  </svg>
                </div>
                <p className="poem">
                Sei que não sou o melhor quando se trata de demonstrar meus sentimentos, 
                mas quero que você saiba o quanto é especial para mim. Esse gesto de agora
                é a minha maneira de te convidar a ver o mundo pelos meus olhos e, assim,
                entender um pouquinho de como eu te vejo.
                </p>
                
                <p className="poem">
                Sou apaixonado por cada detalhe seu: seus olhos grandes e verdes, 
                seu narizinho, sua boca bem desenhada, suas orelhas, seus pezinhos,
                seu coro cabeludo mole de bebe kkkkkkk, tudo se encaixa... 
                e outras partes que guardo só para mim hihihi.
                </p>
                
              </motion.div>
              
              <motion.p 
                className="page-number"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
              </motion.p>
            </motion.div>

            <motion.div 
              className="page right-page"
              initial={{ rotateY: 30, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <p className="poem">
                Admiro e tenho orgulho do seu esforço em equilibrar estudo, trabalho, exercícios, 
                namoro e até tirar a carta de motorista (Só falta aprender a estacionar comigo 😎).
                </p>
                <p className="poem">
                Amo a leveza das suas risadas espontâneas durante as calls
                no discord isso deixa o meu dia mais leve, mesmo a distância.
                </p>
                
                <p className="poem">
                Amo o jeito carinhoso que você trata e apoia os seus amigos. 
                O seu apoio fazendo artes para a live do Erik, ajudando na configuração e doação de bit em bit ahusdhuauhsd
                </p>
                
              </motion.div>
              
              <motion.p 
                className="page-number"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                — Para Érika, com todo meu amor
              </motion.p>

              <div className="button-container">
                <motion.button 
                  className="close-button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsNotebookOpen(false)}
                >
                  Fechar
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div 
          className="modal-background"
          onClick={() => setIsNotebookOpen(false)}
        ></div>
      </motion.div>
      
      <div 
        className="modal-background-outer"
        onClick={() => setIsNotebookOpen(false)}
      ></div>
    </div>
  )}
      </AnimatePresence>

      {<AnimatePresence>
        {isCameraRollOpen && (
          <div className="modal-overlay">
            <motion.div 
              className="camera-roll-modal"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="camera-roll-header" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                width: '100%'
              }}>
                <h2 style={{
                  textAlign: 'center',
                  margin: '0 auto'
                }}>Pedacinhos da Nossa História</h2>
                <motion.button 
                  className="close-button"
                  style={{
                    position: 'absolute',
                    right: '10px'
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsCameraRollOpen(false)}
                >
                  Fechar
                </motion.button>
              </div>

              <div className="film-strip-container">
                <div className="film-strip">
                  {photos.map((photo, index) => (
                    <motion.div 
                      className="film-frame"
                      key={index}
                      whileHover={{ 
                        scale: 1.05,
                        y: -10,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.2)" 
                      }}
                      onClick={() => handleClickPhoto(photo)}
                    >
                      <div className="frame-holes">
                        <div className="hole"></div>
                        <div className="hole"></div>
                      </div>
                      <img src={photo.src} alt={photo.caption} />
                      <div className="frame-holes">
                        <div className="hole"></div>
                        <div className="hole"></div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <AnimatePresence>
                {selectedPhoto && (
                  <div className="photo-viewer-overlay" onClick={() => setSelectedPhoto(null)}>
                    <motion.div 
                      className="photo-viewer"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (changingPhotoSoundRef.current) {
                          changingPhotoSoundRef.current.currentTime = 0;
                          changingPhotoSoundRef.current.play();
                        }
                      }}
                    >
                      <img src={selectedPhoto.src} alt={selectedPhoto.caption} />
                      <div className="photo-caption">{selectedPhoto.caption}</div>
                      <motion.button 
                        className="close-photo-button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedPhoto(null)}
                      >
                        ×
                      </motion.button>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
            
            <div 
              className="modal-background-outer"
              onClick={() => setIsCameraRollOpen(false)}
            ></div>
          </div>
        )}
      </AnimatePresence> }
    </div>
  );
};

export default InteractiveScene;