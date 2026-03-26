import { locations } from '#constants'
import useLocationStore from '#store/location';
import useWindowStore from '#store/window';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { Draggable } from 'gsap/all';
import React, { useRef } from 'react'


const projects = locations.work?.children ?? [];

const Home = () => {

    const containerRef = useRef(null);
    const { setActiveLocation } = useLocationStore();
    const { openWindow } = useWindowStore();
    const handleOpenProjectFinder = (project) => {
        setActiveLocation(project)
        openWindow("finder")
    }

    useGSAP(() => {
        const el = containerRef.current;
        if (!el) return;
        const folders = el.querySelectorAll('.folder');
        const instances = Draggable.create(folders);
        return () => instances.forEach((instance) => instance.kill());
    }, [])

    return (
        <section id='home' ref={containerRef}>
            <ul>
                {projects.map((project) => (
                    <li key={project.id} className={clsx("group folder", project.windowPosition)} onClick={()=> handleOpenProjectFinder(project)}>
                        <img src="/images/folder.png" alt={project.name} />
                        <p>{project.name}</p>
                    </li>
                ))}
            </ul>
        </section>
    )
}

export default Home
