import { Route, Link, Routes } from 'react-router';
import React from 'react';
import './App.css';
import './Classic.js'
import ClassicApp from './Classic.js';

function App() {
  return (
    <>
    <NavBar />
    <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />}> 
        <Route path="classic" element={<div className="page-container"><ClassicApp /></div>} />
        </Route>
    </Routes>
    </>
  );
}


function Home() {
  const BUTTONS = [
    {
      id: 1,
      name: "classic",
      img: "/assets/wordle.png", 
      link: "/classic"
    },
    {
      id: 2,
      name: "in the dark",
      img: "/assets/lightbulb.png", 
      link: "/in-the-dark"
    }
  ];
  
  return (
    <div className="page-container">
      <div className="buttons-grid">
        {BUTTONS.map((button) => (
          <Link 
            key={button.id} 
            to={button.link}
            className="game-button"
          >
            <div className="button-image-container">
              <img src={button.img} alt={button.name} className="button-image" />
            </div>
            <span className="button-text">{button.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}


function About() {
  return (
    <>
      <div className="page-container">
        <section>
          <h1>About</h1>
          <hr></hr>
          <p>Wordle: Variants is a small, personal project of mine to increase my proficiency in ReactJS. I hope to create 20 Wordle variants by the end of this year..</p>

          <h2>Documentation</h2>
          <p>This entire website is one ReactJS App, thanks to react-router. See the github here. Dont mind my messy code! If you'd like to contact me, view my personal website: <a href="https://miniaturity.neocities.org" target="_blank">@miniaturity</a></p>
        </section>
      </div>
    </>
  );
}

const NavBar = () => {
  const BUTTONS = [
    { 
      id: 1,
      link: <Link to="/">Home</Link>
    },
    {
      id: 2,
      link: <Link to="/about">About</Link>
    },
    {
      id: 3,
      link: <Link to="/updates">Updates</Link>
    },
    {
      id: 4,
      link: <Link to="/random">Random</Link>
    }
  ];

  return (
    <nav className="navbar">
      {BUTTONS.slice(0, BUTTONS.length / 2).map((button) => (
        <div key={button.id} className="navbar-button left-b">
          {button.link}
        </div>
      ))}
      
      <div className="navbar-center">
        wordle: variants
      </div>
      
      {BUTTONS.slice(BUTTONS.length / 2).map((button) => (
        <div key={button.id} className="navbar-button right-b">
          {button.link}
        </div>
      ))}
    </nav>
  );
};

export default App;
