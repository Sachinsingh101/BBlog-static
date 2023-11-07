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
    return (
      <>
        <Appbar />
        <Routes>
          <Route exact path='/create-blog' element={<Editors />} />
          <Route
            exact
            path='/'
            element={
              <>
                <Home />
              </>
            }
          />
          <Route
            exact
            path='/Signup'
            element={
              <>
                <Signup />
              </>
            }
          />
          <Route
            exact
            path='/Signin'
            element={
              <>
                <Signin />
              </>
            }
          />
          <Route
            exact
            path={`/account-settings/${user ? user.username : null}`}
            element={
              <>
                <Setting />
              </>
            }
          />
          <Route
            exact
            path='/:heading/:id'
            element={
              <>
                <SpecifigBlog />
              </>
            }
          />
          <Route exact path='/Search' element={<SearchPage />} />
          <Route
            exact
            path='/View-Profile/:id/:username'
            element={<ViewProfile />}
          />
          <Route exact path='/Events' element={<Events />} />
        </Routes>
        <Footer />
      </>
    );
}

export default App;
