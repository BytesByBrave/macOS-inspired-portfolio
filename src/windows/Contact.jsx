import React from 'react'
import { WindowControls } from '#components'
import { socials } from '#constants'
import windowWrapper from '#hoc/windowWrapper'

const Contact = () => {
    return (
        <>
            <div id='window-header'>
                <WindowControls target="contact"/>
                <h2>Contact Me</h2>
            </div>
            <div className='p-5 space-y-5 flex-1 overflow-auto w-full h-full'>
                <img src="/images/custom.jpg" alt="Bahadur" className='w-20 rounded-full'/>
                <h3>Let's Connect</h3>
                <p>Got am idea? A bug to squash? Or just wanna talk tech? I'm in</p>
                <p>bahadurali123470@gmail.com</p>
                <ul>
                    {socials.map(({ id, bg, link, icon, text }) => (
                        <li key={id} style={{background: bg}}>
                            <a href={link} target='_blank' rel="noopener noreferrer" title={text}>
                                <img src={icon} alt={text} className='size-5' />
                                <p>{text }</p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

const ContactWindow = windowWrapper(Contact, "contact")

export default ContactWindow
