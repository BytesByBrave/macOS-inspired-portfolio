import React, { useState } from 'react'
import { dockApps } from '#constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Dock = () => {
  const [hoveredApp, setHoveredApp] = useState(null);

  useGSAP(() => {
    gsap.fromTo(
      '#dock',
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  return (
    <div id="dock">
      <div className="dock-container">
        {dockApps.map((app) => (
          <div 
            key={app.id} 
            className="flex flex-col items-center relative group"
            onMouseEnter={() => setHoveredApp(app.id)}
            onMouseLeave={() => setHoveredApp(null)}
          >
            {/* Tooltip */}
            {hoveredApp === app.id && (
              <div className="absolute -top-12 tooltip transition-opacity duration-200">
                {app.name}
              </div>
            )}
            
            {/* App Icon */}
            <div className="dock-icon hover:-translate-y-2 hover:scale-125 transition-transform duration-300 ease-out origin-bottom">
              <img 
                src={`/images/${app.icon}`} 
                alt={app.name} 
                className="w-full h-full"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dock
