import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
import { navIcons, navLinks } from '#constants'
import useWindowStore from '#store/window'

const Navbar = () => {

    const { openWindow } = useWindowStore();
    const [theme, setTheme] = useState(
        typeof window !== 'undefined' ? localStorage.getItem('theme') || 'light' : 'light'
    );

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    const handleIconClick = (id) => {
        if (id === 4) { // mode.svg
            setTheme(prev => prev === 'light' ? 'dark' : 'light');
        }
    };

    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo " className="dark:invert"/>
                <p className='font-bold dark:text-white'>Bahadur's Portfolio</p>

                <ul>
                    {navLinks.map(({ id, name, type}) => (
                        <li key={id} onClick={() => openWindow(type)}>
                            <p className="dark:text-gray-200">{name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <ul>
                    {navIcons.map(({id, img}) => (
                        <li key={id} onClick={() => handleIconClick(id)}>
                            <img src={img} alt={`icon-${id}`} className='icon dark:invert'/>
                        </li>
                    ))}
                </ul>
                <time className="dark:text-white">{dayjs().format('ddd D MMM h:mm A')}</time>
            </div>
        </nav>
    )
}

export default Navbar
