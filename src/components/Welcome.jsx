import React, { useRef } from 'react'
import gsap from 'gsap'


const FONT_WEIGHTS = {
    subtitle: {min:100, max:400, default: 100},
    title: {min:400, max:900, default: 400},
}

const renderText = (text, className, baseWeight = 400 ) => {
    return [...text].map((char , i) => (
        <span key={i} className={className} style={{fontVariationSettings: `'whgt ${baseWeight}`}}>
            {char === " " ? "\u00A0" : char}
        </span>
    ))
}

const setupTextHover = (container, type) => {
    if(!container) return;
    const letter = container.querySelectorAll("span");
    const {min, max, default: base} =  FONT_WEIGHTS[type]
    const animateLetter = (letter, weight, duration = 0.25) => {
        return gsap.to(letter, {duration, ease: 'power2.out', fontVariationSettings: `'whgt ${weight}`,})
    }
    const handleMouseMove = (e) => {
        const {left} = container.getBoundingClientRect();
        const mouseX = e.clientX - left;

        letters.forEach((letter) => {
            const { left: l , width: w } =letter.getBoundingClientRect()
        })
    }
} 

const Welcome = () => {

    const titleRef = useRef(null)
    const subtitleRef = useRef(null)

    return (
        <section id='welcome'>
            <p ref={titleRef}>{renderText("Hy, I'm Bahadur! Welcome to my", "text-3xl font-georama")}</p>
            <h1 ref={subtitleRef} className='mt-7'>{renderText("portfolio", "text-9xl italic font-georama")}</h1>
            
            <div className='small-screen'>
                <p>This portfolio is designed for desktop/tablet screens only</p>
            </div>
        </section>
    )
}

export default Welcome
