import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Application, Assets } from 'pixi.js';
import { addBackground } from './game_module/addBackground';
import { addFishes, animateFishes, addFish, controlFish } from './game_module/addFishes';
import { addWaterOverlay, animateWaterOverlay } from './game_module/addWaterOverlay';
import { addDisplacementEffect } from './game_module/addDisplacementEffect';



function App() {
  
  // Create a PixiJS application.
  const app = new Application();

  // Store an array of fish sprites for animation.
  const fishes = [];

  async function setup()
  {
    // Intialize the application.
    await app.init({ background: '#1099bb', resizeTo: window });

    if(document.querySelector('.App canvas')==null){
      // Then adding the application's canvas to the DOM body.
      document.querySelector('.App').appendChild(app.canvas);
    }
    
  }

  async function preload()
  {
      // Create an array of asset data to load.
      const assets = [
          { alias: 'background', src: 'https://pixijs.com/assets/tutorials/fish-pond/pond_background.jpg' },
          { alias: 'fish1', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish1.png' },
          { alias: 'fish2', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish2.png' },
          { alias: 'fish3', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish3.png' },
          { alias: 'fish4', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish4.png' },
          { alias: 'fish5', src: 'https://pixijs.com/assets/tutorials/fish-pond/fish5.png' },
          { alias: 'overlay', src: 'https://pixijs.com/assets/tutorials/fish-pond/wave_overlay.png' },
          { alias: 'displacement', src: 'https://pixijs.com/assets/tutorials/fish-pond/displacement_map.png' },
      ];

      // Load the assets defined above.
      await Assets.load(assets);
  }

  // Asynchronous IIFE
  (async () =>
  {
      await setup();
      await preload();
      addBackground(app);
      //addFishes(app, fishes);
      addFish(app, fishes); 
      addWaterOverlay(app);
      addDisplacementEffect(app);

      // Add the animation callbacks to the application's ticker.
      app.ticker.add((time) =>
      {
          //animateFishes(app, fishes, time);
          controlFish(app, fishes[0], time);
          animateWaterOverlay(app, time);
      });

      document.onmousemove = (event)=>{
        // console.log({pageX:event.pageX, pageY:event.pageY});
      }
  })();
  return (
    <div className="App">
    </div>
  );
}

export default App;
