import React, { useRef } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { dockApps } from '#constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import useWindowStore from '#store/window'

const Dock = () => {

    const { openWindow, closeWindow, restoreWindow, windows } = useWindowStore();
    const dockRef = useRef()

    useGSAP(() => {
        const dock = dockRef.current;
        if(!dock) return;

        const icons = dock.querySelectorAll(".dock-icon")
        const animateIcons = (mouseX) => {
            const { left } = dock.getBoundingClientRect();
            icons.forEach((icon) => {
                const { left: iconLeft, width } = icon.getBoundingClientRect()
                const center = iconLeft - left + width / 2;
                const distance = Math.abs(mouseX - center);

                // Tighten the curve so neighbors don't scale too much & overlap
                const intensity = Math.exp(-(distance ** 2) / 3000);

                gsap.to(icon, {
                    scale: 1 + 0.30 * intensity, // Reduced max scale
                    y: -10 * intensity,
                    transformOrigin: "bottom center",
                    duration: 0.2,
                    ease: "power2.out",
                });
                
                // Keep hovered item and its near neighbors above other icons
                gsap.set(icon.parentElement, {
                    zIndex: Math.round(intensity * 10)
                });
            });
        };
        const handleMouseMove = (e) => {
            const { left } = dock.getBoundingClientRect();
            animateIcons(e.clientX - left)
        }
        const resetIcons = () => icons.forEach((icon) => {
            gsap.to(icon, {
                scale: 1,
                y: 0,
                duration: 0.3,
                ease: "power1.out"
            });
            gsap.set(icon.parentElement, {
                zIndex: 1
            });
        })
        dock.addEventListener("mousemove", handleMouseMove);
        dock.addEventListener("mouseleave", resetIcons);

        return () => {
            dock.removeEventListener("mousemove", handleMouseMove);
            dock.removeEventListener("mouseleave", resetIcons);
        }
    },[]);

    const toggleApp = (app) => {
      if(!app.canOpen) return;
      
      const win = windows[app.id];
      if (!win) {
        openWindow(app.id);
        return;
      }

      if (win.isOpen && win.isMinimized) {
        restoreWindow(app.id);
      } else if (win.isOpen) {
        closeWindow(app.id);
      } else {
        openWindow(app.id);
      }
    }

    return (
        <section id="dock">
            <div ref={dockRef} className='dock-container gap-3 px-3'>
                {dockApps.map(({ id, name, icon, canOpen}) => (
                    <div key={id} className='relative flex justify-center'>
                        <button 
                        type='button' 
                        className='dock-icon' 
                        aria-label={name} 
                        data-dock-id={id}
                        data-tooltip-id="dock-tooltip"
                        data-tooltip-content={name}
                        data-tooltip-delay-show={150}
                        disabled={!canOpen}
                        onClick={() => toggleApp({id, canOpen})}
                        >
                            <img src={`/images/${icon}`} 
                            alt={name}
                            loading='lazy'
                            className={canOpen ? "" : "opacity-60"}
                            />
                        </button>
                        {windows[id]?.isOpen && (
                            <div className="absolute -bottom-1 size-1 rounded-full bg-black/50" />
                        )}
                    </div>
                ))}
                <Tooltip id='dock-tooltip' place='top' className='tooltip' />             
            </div>
        </section>
    )
}

export default Dock
