import logo from './logo.svg';
import './App.css';

import React from 'react';
import { TwitchEmbed } from 'react-twitch-embed';

function App() {
  return (
    <div>
      <TwitchEmbed channel='kiaraakitty' withChat={false}/>
    </div>
  );
}

export default App;
