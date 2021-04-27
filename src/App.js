import 'antd/dist/antd.css';
import './index.css';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SideBar from "./components/sidebar/sidebar.js";
import Home from "./components/home/home.js";
import Voting from "./components/voting/voting.js";
import Breeds from "./components/breeds/breeds";
import Gallery from "./components/gallery/gallery";


function App() {
  return (
    <Router>
      <SideBar/>
      <main id='main'>
          <Route path='/' component={Home} exact/>
          <Route path='/voting' component={Voting}/>
          <Route path='/breeds' component={Breeds}/>
          <Route path='/gallery' component={Gallery}/>
      </main>
    </Router>
  );
}

export default App;
