import React, { useRef } from 'react'
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { dockApps } from '#constants'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

const Dock = () => {

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
                const intensity = Math.exp(-(distance ** 2) / 3500);

                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity, // Reduced max scale
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

    const toggleApp = (App) => {}
    // TODO implement Open window Logic 
    return (
        <section id="dock">
            <div ref={dockRef} className='dock-container gap-3 px-3'>
                {dockApps.map(({ id, name, icon, canOpen}) => (
                    <div key={id} className='relative flex justify-center'>
                        <button 
                        type='button' 
                        className='dock-icon' 
                        aria-label={name} 
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
                    </div>
                ))}
                <Tooltip id='dock-tooltip' place='top' className='tooltip' />             
            </div>
        </section>
    )
}

export default Dock
