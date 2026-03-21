import React from 'react'

const Navbar = () => {
    return (
        <div>
            <img src="/images/logo.svg" alt="logo " />
            <p className='font-bold'>Bahadur's Portfolio</p>

            <ul>
                {[
                    { id: 1, name: "Portfolio" },
                    { id: 2, name: "Contact" },
                    { id: 3, name: "Projects" },
                ].map(({ id, name}) => (
                    <li key={id}>
                        <p>{name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Navbar
