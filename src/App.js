import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { Application, Assets } from 'pixi.js';
import { addBackground } from './game_module/addBackground';
import { addFishes, animateFishes, addFish, controlFish, collideFishes } from './game_module/addFishes';
import { addWaterOverlay, animateWaterOverlay } from './game_module/addWaterOverlay';
import { addDisplacementEffect } from './game_module/addDisplacementEffect';
import { addFuits, updateFuits } from './game_module/addFruit';
import { initWeapon, shoot, updateShoot, shootGoal } from './game_module/addWeapon';
import { initNotify, updateScope, pushGameover } from './game_module/appNotify';


function App() {
  
  // Create a PixiJS application.
  const app = new Application();

  // Store an array of fish sprites for animation.
  const fishes = [];
  const bulls = [];
  var weaponContainer=null;
  var fishesContainer=null;
  var notifyContainer=null;

  async function setup()
  {
    // Intialize the application.
    await app.init({ background: '#1099bb', resizeTo: window, width:(window.innerWidth-100) });

    if(document.querySelector('.App canvas')==null){
      // Then adding the application's canvas to the DOM body.
      document.querySelector('.App').appendChild(app.canvas);
    }
    
  }

  async function preload()
  {
      // Create an array of asset data to load.
      const assets = [
          { alias: 'background', src: '/assets/pond_background.jpg' },
          { alias: 'fish1', src: '/assets/fish1.png' },
          { alias: 'fish2', src: '/assets/fish2.png' },
          { alias: 'fish3', src: '/assets/fish3.png' },
          { alias: 'fish4', src: '/assets/fish4.png' },
          { alias: 'fish5', src: '/assets/fish5.png' },
          { alias: 'overlay', src: '/assets/wave_overlay.png' },
          { alias: 'displacement', src: '/assets/displacement_map.png' },

          { alias: 'fruit1', src: '/assets/fruit01.png' },
          { alias: 'fruit2', src: '/assets/fruit02.png' },
          { alias: 'fruit3', src: '/assets/fruit03.png' },

          { alias: 'bull1', src: '/assets/bull01.png' },
          { alias: 'bull2', src: '/assets/bull02.png' },
          { alias: 'bull3', src: '/assets/bull03.png' },

          { alias: 'gh1', src: '/assets/gh01.png' },
          { alias: 'gh2', src: '/assets/gh02.png' },

      ];

      // Load the assets defined above.
      await Assets.load(assets);
  }

  // Asynchronous IIFE
  (async () =>
  {
      var direct = 1;

      await setup();
      await preload();
      addBackground(app);

      // object
      weaponContainer = initWeapon(app);
      addFish(app, fishes); 
      fishesContainer = addFishes(app, fishes, 20);

      // FX
      addWaterOverlay(app);
      //addDisplacementEffect(app);

      // notify
      notifyContainer = initNotify(app);
      
      // Add the animation callbacks to the application's ticker.
      app.ticker.add((time) =>
      {
          collideFishes(app, fishes, time);
          animateFishes(app, fishes.filter(e=>!e.me), time);
          controlFish(app, fishes[0], time, direct);
          animateWaterOverlay(app, time);
          updateShoot(app, bulls);
          shootGoal(app, fishes, bulls);
      });

      // control
      document.onmousemove = (event)=>{
        direct = Math.atan2((event.pageX - fishes[0].x), (event.pageY - fishes[0].y));
        console.log( fishes[0].getLocalBounds());
      };
      document.onkeydown=(event)=>{
        if(event.code=="Space"){
          shoot(app, fishes[0], weaponContainer, bulls);
        }
      };
      document.onmousedown = (event)=>{
        if(event.button == 0){
          shoot(app, fishes[0], weaponContainer, bulls);
        }
      };
	
      
      
  })();
  return (
    <div className="App">
    </div>
  );
}

export default App;
