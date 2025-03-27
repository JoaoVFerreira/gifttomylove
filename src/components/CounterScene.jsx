"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

export default function AffectionateCounter() {
  const [timeUnits, setTimeUnits] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  
  const [animate, setAnimate] = useState(false)
  
  const startDate = new Date("2025-01-25T00:00:00")
  
  useEffect(() => {
    const calculateTime = () => {
      const now = new Date()
      const difference = now.getTime() - startDate.getTime()
      
      if (difference < 0) {
        setTimeUnits({
          years: 0,
          months: 0,
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
        return
      }
      
      const seconds = Math.floor((difference / 1000) % 60)
      const minutes = Math.floor((difference / (1000 * 60)) % 60)
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 30)
      const months = Math.floor((difference / (1000 * 60 * 60 * 24 * 30)) % 12)
      const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365))
      
      setTimeUnits({
        years,
        months,
        days,
        hours,
        minutes,
        seconds,
      })
      
      setAnimate(true)
      setTimeout(() => setAnimate(false), 500)
    }
    
    calculateTime()
    
    const interval = setInterval(calculateTime, 1000)
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="counter-container" style={{
      position: 'absolute',
      top: '5%',
      left: '25%',
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      borderRadius: '12px',
      padding: '15px',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
      width: '280px',
      textAlign: 'center',
      fontFamily: "'Caveat', cursive, sans-serif",
      zIndex: 15,
      border: '1px solid rgba(255, 192, 203, 0.5)',
    }}>
      <div className="counter-title" style={{
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#e5738c',
        marginBottom: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px'
      }}>
        <Heart 
          size={20} 
          color="#e5738c" 
          fill="#e5738c" 
          className={animate ? "heart-beat" : ""}
          style={{
            animation: animate ? 'heartBeat 0.5s ease-in-out' : 'none',
          }}
        />
        Nosso tempo juntos
        <Heart 
          size={20} 
          color="#e5738c" 
          fill="#e5738c"
          className={animate ? "heart-beat" : ""}
          style={{
            animation: animate ? 'heartBeat 0.5s ease-in-out' : 'none',
          }}
        />
      </div>
      
      <div className="time-units-container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '10px',
        marginBottom: '12px'
      }}>
        <TimeUnit value={timeUnits.years} label="Anos" animate={animate} />
        <TimeUnit value={timeUnits.months} label="Meses" animate={animate} />
        <TimeUnit value={timeUnits.days} label="Dias" animate={animate} />
        <TimeUnit value={timeUnits.hours} label="Horas" animate={animate} />
        <TimeUnit value={timeUnits.minutes} label="Min" animate={animate} />
        <TimeUnit value={timeUnits.seconds} label="Seg" animate={animate} />
      </div>
      
      <div className="counter-subtitle" style={{
        fontSize: '14px',
        color: '#8B5A2B',
        marginBottom: '6px',
        fontStyle: 'italic'
      }}>
        Cada segundo é precioso desde 25 de janeiro de 2025
      </div>
      
      <div className="counter-footer" style={{
        fontSize: '15px',
        color: '#e5738c',
        fontWeight: 'bold'
      }}>
        ♥ Te amo mais que ontem e menos que amanhã ♥
      </div>
    </div>
  )
}

function TimeUnit({ value, label, animate }) {
  return (
    <div className="time-unit" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <div className="time-value" style={{
        backgroundColor: '#e5738c',
        color: 'white',
        borderRadius: '6px',
        padding: '4px 2px',
        fontSize: '18px',
        fontWeight: 'bold',
        width: '100%',
        transition: animate ? 'transform 0.5s ease' : 'none',
        transform: animate ? 'scale(1.05)' : 'scale(1)'
      }}>
        {value < 10 ? `0${value}` : value}
      </div>
      <div className="time-label" style={{
        fontSize: '12px',
        color: '#8B5A2B',
        marginTop: '2px'
      }}>
        {label}
      </div>
    </div>
  )
}