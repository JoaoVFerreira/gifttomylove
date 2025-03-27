"use client";

import { useState, useRef, useEffect } from "react";
import { Music } from "lucide-react";
import musicFile from '../assets/sounds/rubel_partilhar.mp3';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioLoaded, setAudioLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(musicFile);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.7;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => {
          console.error("Erro ao reproduzir áudio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('canplaythrough', () => {
        console.log("Áudio carregado e pronto para reprodução");
        setAudioLoaded(true);
      });
      
      audioRef.current.addEventListener('error', (e) => {
        console.error("Erro ao carregar o áudio:", e);
      });
    }
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('canplaythrough', () => {});
        audioRef.current.removeEventListener('error', () => {});
      }
    };
  }, []);

  return (
    <div 
      className="music-player-container"
      onClick={togglePlay}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Music
        size={64}
        className={`music-icon ${isPlaying ? "playing" : ""} ${isHovered ? "hovered" : ""}`}
        strokeWidth={1.5}
      />
      
      {isPlaying && (
        <div className="sound-waves">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}

      <style jsx>{`
        .music-player-container {
          position: fixed;
          top: 16px;
          right: 16px;
          z-index: 9999;
          padding: 10px;
          cursor: pointer;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        
        .music-player-container:hover {
          transform: scale(1.1);
          background-color: rgba(255, 255, 255, 0.1);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.2);
        }
        
        .music-player-container:active {
          transform: scale(0.95);
          transition: transform 0.1s ease;
        }
        
        .music-icon {
          color: black;
          transition: all 0.3s ease;
        }
        
        .music-icon.playing {
          color: #e74c3c;
          filter: drop-shadow(0 0 5px rgba(231, 76, 60, 0.6));
          animation: pulse 2s infinite;
        }
        
        .music-icon.hovered {
          transform: rotate(5deg);
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        .sound-waves {
          position: absolute;
          right: -10px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 4px;
        }
        
        .sound-waves span {
          display: block;
          width: 3px;
          background-color: #e74c3c;
          border-radius: 3px;
          animation: soundWave 1.2s infinite ease-in-out;
        }
        
        .sound-waves span:nth-child(1) {
          height: 15px;
          animation-delay: 0s;
        }
        
        .sound-waves span:nth-child(2) {
          height: 25px;
          animation-delay: 0.2s;
        }
        
        .sound-waves span:nth-child(3) {
          height: 10px;
          animation-delay: 0.4s;
        }
        
        .sound-waves span:nth-child(4) {
          height: 20px;
          animation-delay: 0.6s;
        }
        
        @keyframes soundWave {
          0%, 100% { transform: scaleY(0.5); opacity: 0.5; }
          50% { transform: scaleY(1); opacity: 1; }
        }
      `}</style>
    </div>
  );
}