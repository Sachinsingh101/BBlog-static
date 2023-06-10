import './App.css';
import Appbar from './components/Appbar.jsx'
import Home from './components/home.jsx'
import Editors from './components/Editor.jsx'
import {Routes,Route} from 'react-router-dom'
import Signup from './components/Signup.jsx'
import Signin from './components/Signin.jsx'
import Setting from './components/subpages/settings.jsx'
import SpecifigBlog from './components/specificBlog.jsx';
import { useSelector } from 'react-redux';
import SearchPage from './components/searchPage.jsx';
import Footer from './components/Footer.jsx';
import ViewProfile from './components/subpages/seeProfile';
import Events from './components/subpages/events';

function App(){
    const user=useSelector((state)=>state.users.user);
    return(
    <>
      <Appbar/>
      <Routes>
        <Route path='/create-blog' element={<Editors/>}/>
        <Route path='/' element={<><Home/></>}
         />
        <Route path='/Signup' element={<><Signup/></>}/>
        <Route path='/Signin' element={<><Signin/></>}/>
        <Route path={`/account-settings/${user ? user.username : null}`} element={<><Setting/></>} />
        <Route path='/:id' element={<><SpecifigBlog/></>} />
        <Route path='/Search' element={<SearchPage/>} />
        <Route path='/View-Profile/:id/:username' element={<ViewProfile/>} />
        <Route path='/Events' element={<Events />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
