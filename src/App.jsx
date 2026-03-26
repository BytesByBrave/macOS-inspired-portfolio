import React from 'react'
import gsap from 'gsap';
import { Draggable } from 'gsap/all';
import { Navbar, Welcome, Dock, Home } from '#components'
import { Finder, Resume, Safari, Terminal, TextFile, ImageFile, Contact, Photos } from '#windows';

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
      <Finder/>
      <TextFile/>
      <ImageFile/>
      <Contact/>
      <Photos/>

      <Home/>
    </main>
  )
}

export default App
