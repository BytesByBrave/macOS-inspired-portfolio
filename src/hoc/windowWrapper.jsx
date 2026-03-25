import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Draggable } from 'gsap/all';
import useWindowStore from '#store/window'

const NAV_HEIGHT = 44;
const DOCK_HEIGHT = 90;

const RESIZE_HANDLES = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];

const windowWrapper = (Component, windowKey) => {

    const Wrapped = (props) => {
        const { focusWindow, windows } = useWindowStore();
        const windowState = windows[windowKey];
        const {
            isOpen = false,
            isMinimized = false,
            isMaximized = false,
            zIndex = 0,
        } = windowState || {};
        const ref = useRef(null);
        const draggableRef = useRef(null);
        const [preMaxStyle, setPreMaxStyle] = useState(null);

        // Open animation
        useGSAP(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            gsap.fromTo(
                el,
                { scale: 0.8, opacity: 0, y: 40 },
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
            )
        }, [isOpen])

        // Draggable setup
        useGSAP(() => {
            const el = ref.current;
            if (!el) return;
            const [instance] = Draggable.create(el, {
                trigger: el.querySelector('#window-header'),
                onPress: () => focusWindow(windowKey),
                bounds: { top: NAV_HEIGHT, left: 0, width: window.innerWidth, height: window.innerHeight - NAV_HEIGHT },
            });
            draggableRef.current = instance;
            return () => instance.kill();
        }, [])

        // Show/hide based on isOpen
        useLayoutEffect(() => {
            const el = ref.current;
            if (!el) return;
            el.style.display = isOpen ? "block" : "none";
        }, [isOpen])

        // Minimize animation
        useEffect(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            if (isMinimized) {
                let targetProps = {
                    scale: 0.3,
                    opacity: 0,
                    y: window.innerHeight,
                    duration: 0.4,
                    ease: "power3.in",
                    onComplete: () => { el.style.display = "none"; },
                };

                const dockIcon = document.querySelector(`[data-dock-id="${windowKey}"]`);
                if (dockIcon) {
                    const rect = el.getBoundingClientRect();
                    const iconRect = dockIcon.getBoundingClientRect();
                    // Determine offset to animate towards dock icon center
                    const originX = (iconRect.left + iconRect.width / 2) - rect.left;
                    const originY = (iconRect.top + iconRect.height / 2) - rect.top;
                    gsap.set(el, { transformOrigin: `${originX}px ${originY}px` });
                    
                    targetProps = {
                        scale: 0,
                        opacity: 0,
                        duration: 0.4,
                        ease: "power3.in",
                        onComplete: () => { el.style.display = "none"; },
                    };
                }

                gsap.to(el, targetProps);
            } else {
                el.style.display = "block";
                gsap.to(el, {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    ease: "power3.out",
                    clearProps: "transformOrigin",
                });
            }
        }, [isMinimized, isOpen, windowKey]);

        // Maximize / restore
        useEffect(() => {
            const el = ref.current;
            if (!el || !isOpen) return;

            if (isMaximized) {
                // Save current position/size before maximizing
                const rect = el.getBoundingClientRect();
                setPreMaxStyle({
                    width: el.style.width || `${rect.width}px`,
                    height: el.style.height || `${rect.height}px`,
                    top: el.style.top,
                    left: el.style.left,
                    transform: el.style.transform,
                });

                if (draggableRef.current) draggableRef.current.disable();

                gsap.to(el, {
                    x: 0, y: 0,
                    width: "100vw",
                    height: `calc(100vh - ${NAV_HEIGHT}px)`,
                    top: `${NAV_HEIGHT}px`,
                    left: 0,
                    borderRadius: 0,
                    duration: 0.35,
                    ease: "power2.out",
                    clearProps: "transform",
                });
            } else if (preMaxStyle) {
                if (draggableRef.current) draggableRef.current.enable();

                gsap.to(el, {
                    width: preMaxStyle.width,
                    height: preMaxStyle.height,
                    top: preMaxStyle.top || "auto",
                    left: preMaxStyle.left || "auto",
                    borderRadius: "0.75rem",
                    duration: 0.35,
                    ease: "power2.out",
                    onComplete: () => {
                        if (preMaxStyle.transform) {
                            el.style.transform = preMaxStyle.transform;
                        }
                    },
                });
                setPreMaxStyle(null);
            }
        }, [isMaximized]);

        // Resize handler
        const handleResize = useCallback((e, direction) => {
            e.preventDefault();
            e.stopPropagation();
            if (isMaximized) return;

            const el = ref.current;
            if (!el) return;

            focusWindow(windowKey);
            const startX = e.clientX;
            const startY = e.clientY;
            const rect = el.getBoundingClientRect();
            const startW = rect.width;
            const startH = rect.height;
            const startTop = rect.top;
            const startLeft = rect.left;

            const onMouseMove = (ev) => {
                const dx = ev.clientX - startX;
                const dy = ev.clientY - startY;
                let newW = startW;
                let newH = startH;
                let newTop = startTop;
                let newLeft = startLeft;

                if (direction.includes('e')) newW = Math.max(250, startW + dx);
                if (direction.includes('w')) {
                    newW = Math.max(250, startW - dx);
                    newLeft = startLeft + (startW - newW);
                }
                if (direction.includes('s')) newH = Math.max(150, startH + dy);
                if (direction.includes('n')) {
                    newH = Math.max(150, startH - dy);
                    newTop = Math.max(NAV_HEIGHT, startTop + (startH - newH));
                }

                // Clamp within viewport
                newLeft = Math.max(0, Math.min(newLeft, window.innerWidth - 50));
                newTop = Math.max(NAV_HEIGHT, newTop);

                el.style.width = `${newW}px`;
                el.style.height = `${newH}px`;
                el.style.top = `${newTop}px`;
                el.style.left = `${newLeft}px`;
                el.style.transform = 'none';
            };

            const onMouseUp = () => {
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            };

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        }, [isMaximized, focusWindow]);

        return (
            <section
                id={windowKey}
                ref={ref}
                style={{ zIndex }}
                className='absolute flex flex-col'
                onMouseDownCapture={() => focusWindow(windowKey)}
            >
                <Component {...props} />
                {!isMaximized && RESIZE_HANDLES.map((dir) => (
                    <div
                        key={dir}
                        className={`resize-handle resize-${dir}`}
                        onMouseDown={(e) => handleResize(e, dir)}
                    />
                ))}
            </section>
        )
    };

    Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

    return Wrapped;
};

export default windowWrapper
