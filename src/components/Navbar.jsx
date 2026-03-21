import React from 'react'
import dayjs from 'dayjs'
import { navIcons, navLinks } from '#constants'

const Navbar = () => {
    return (
        <nav>
            <div>
                <img src="/images/logo.svg" alt="logo " />
                <p className='font-bold'>Bahadur's Portfolio</p>

                <ul>
                    {navLinks.map(({ id, name}) => (
                        <li key={id}>
                            <p>{name}</p>
                        </li>
                    ))}
                </ul>
            </div>
            <nav>
                <ul>
                    {navIcons.map(({id, img}) => (
                        <li key={id}>
                            <img src={img} alt={`icon-${id}`} className='icon-hover'/>
                        </li>
                    ))}
                </ul>
                <time>{dayjs().format('ddd MMM D:mm A')}</time>
            </nav>
        </nav>
    )
}

export default Navbar
