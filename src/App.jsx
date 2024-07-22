
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movies from './components/Movies'
import Tv from './components/Tv'
import People from './components/People'
import MovieDetails from './components/MovieDetails'
import TvDetails from './components/TvDetails'
import PersonDetails from "./components/PersonDetails"
function App() {
  return (

      <div className=' h-[112vh] w-screen bg-[#1f1e24]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/trending' element={<Trending/>}/>
          <Route path='/popular' element={<Popular/>}/>
          <Route path='/movies' element={<Movies/>}/>
          <Route path='/movie/details/:id' element={<MovieDetails/>}/>
          <Route path='/tv' element={<Tv/>}/>
          <Route path='/tv/details/:id' element={<TvDetails/>}/>
          <Route path='/people' element={<People/>}/>
          <Route path='/people/details/:id' element={<PersonDetails/>}/>
          <Route path='/person/details/:id' element={<PersonDetails/>}/>
        </Routes>
      </div>
   
  )
}

export default App
