import React, { useLayoutEffect, useRef } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';
import useWindowStore from '#store/window'

const windowWrapper = (Component, windowKey) => {

    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const windowState = windows[windowKey];
        const { isOpen = false, zIndex = 0 } = windowState || {};
        const ref = useRef(null)

        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            gsap.fromTo(
                el,
                { scale: 0.8, opacity: 0, y: 40 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
            )

        }, [isOpen])

        useGSAP(() => {
            const el = ref.current;
            if (!el) return;
            const [instance] = Draggable.create(el, {
                onPress: () => focusWindow(windowKey)
            });
            return () => instance.kill()
        }, [])

        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;
            el.style.display = isOpen ? "block" : "none"
        }, [isOpen])

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex }}
                className='absolute'
            >
                <Component {...props} />
            </section>
        )
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

    return Wrapped;
};

export default windowWrapper
