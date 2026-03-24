import React from 'react'
import gsap from 'gsap';
import { Draggable } from 'gsap/all';
import { Navbar, Welcome, Dock } from '#components'
import { Resume, Safari, Terminal } from '#windows';

gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar/>
      <Welcome/>
      <Dock />

      <Terminal/>
      <Safari/>
      <Resume/>
    </main>
  )
}

export default App
