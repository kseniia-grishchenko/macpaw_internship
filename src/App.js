import 'antd/dist/antd.css';
import './index.css';
import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import SideBar from "./components/sidebar/sidebar.js";
import Home from "./components/home/home.js";
import Voting from "./components/voting/voting.js";
import Breeds from "./components/breeds/breeds";
import Gallery from "./components/gallery/gallery";
import BreedInfo from "./components/breedInfo/breedInfo";
import Upload from "./components/upload/upload";
import Search from "./components/searchBreed/searchBreed";
import Favourites from "./components/favourites/favourites";
import Likes from "./components/likes/likes";


function App() {
    const [sidebarClassname, setSidebarClassname] = useState('sidebar-content');
    const [background, setBackground] = useState('#E5E5E5');

    const sendData = (classname) => {
        setSidebarClassname(classname);
    }

    useEffect(() => {
        if(sidebarClassname === 'sidebar-content-disabled'){
            setBackground(() => 'rgba(29, 29, 29, 0.6)')
        } else{
            setBackground(() => '#E5E5E5');
        }

    }, [sidebarClassname])


  return (
      <div style={{background: background}} className='root'>
          <Router>
              <SideBar classname={sidebarClassname}/>
              <div id='main'>
                  <Route path='/' component={Home} exact/>
                  <Route path='/voting' component={Voting}/>
                  <Route path='/breeds' component={Breeds}/>
                  <Route path='/gallery' render={() => <Gallery sendData={sendData}/>}/>

                  <Route path='/breed/:id' component={BreedInfo}/>
                  <Route path='/upload' render={() => <Upload sendData={sendData}/>}/>

                  <Route path='/searchBreed/:breedName' component={Search}/>
                  <Route path='/favourites' component={Favourites}/>
                  <Route path='/likes' component={Likes}/>
              </div>
          </Router>
      </div>

  );
}

export default App;
