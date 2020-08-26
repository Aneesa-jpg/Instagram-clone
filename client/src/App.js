import React, { createContext,useReducer } from 'react';

import './App.css';

import { NavbarComponent } from './Components/Navbar/navbar.component'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHeart, faThumbsDown, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { Routing } from './Components/routing.component';

import {initial_state, reducer} from './reducer/userReducer'

library.add(faHeart, faThumbsDown, faThumbsUp);

export const UserContext = createContext();

function App() {
  const [state, dispatch] = useReducer(reducer, initial_state);
  
  return (
  <>
    <UserContext.Provider value={{state,dispatch}}>
    <NavbarComponent />
    <Routing />
    </UserContext.Provider>
  </>
  );
}

export default App;
