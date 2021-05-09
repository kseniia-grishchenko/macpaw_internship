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
import Dislikes from "./components/dislikes/dislikes";


function App() {
    const [sidebarClassname, setSidebarClassname] = useState('sidebar-content');
    const [mainClassname, setMainClassname] = useState('main');
    const [background, setBackground] = useState('#E5E5E5');



    const getSidebarClassname = (classname) => {
        setSidebarClassname(classname);
    }

    const getMainClassname = (classname) => {
        setMainClassname(classname);
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
              <div id='sidebar'>
                  <SideBar classname={sidebarClassname} sidebarName={getSidebarClassname} mainClassname={getMainClassname}/>
              </div>
              <div id={mainClassname}>
                  <Route path='/' render={() => <Home sidebarClassname={getSidebarClassname} mainClassname={getMainClassname}/>} exact/>
                  <Route path='/voting' render={() => <Voting sidebarClassname={getSidebarClassname} mainClassname={getMainClassname}/>}/>
                  <Route path='/breeds' render={() => <Breeds sidebarClassname={getSidebarClassname} mainClassname={getMainClassname}/>}/>
                  <Route path='/gallery' render={() => <Gallery sidebarClassname={getSidebarClassname} mainClassname={getMainClassname}/>}/>

                  <Route path='/breed/:id' render={(match) => <BreedInfo {...match} sidebarClassname={getSidebarClassname} mainClassname={getMainClassname}/>}/>
                  <Route path='/upload' render={() => <Upload sidebarClassname={getSidebarClassname} mainClassname={getMainClassname}/>}/>
                  <Route path='/searchBreed/:breedName' render={(match) => <Search {...match} sidebarClassname={getSidebarClassname} mainClassname={getMainClassname}/>}/>
                  <Route path='/favourites' render={() => <Favourites sidebarClassname={getSidebarClassname} mainClassname={getMainClassname}/>}/>
                  <Route path='/likes' render={() => <Likes sidebarClassname={getSidebarClassname} mainClassname={getMainClassname}/>}/>
                  <Route path='/dislikes' render={() => <Dislikes sidebarClassname={getSidebarClassname} mainClassname={getMainClassname}/>}/>
              </div>
          </Router>
      </div>

  );
}

export default App;
