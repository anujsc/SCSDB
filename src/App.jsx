
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './components/Home'
import Trending from './components/Trending'
import Popular from './components/Popular'
import Movies from './components/Movies'
import Tv from './components/Tv'
import People from './components/People'

function App() {
  return (

      <div className=' h-[112vh] w-screen bg-[#1f1e24]'>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/trending' element={<Trending/>}/>
          <Route path='/popular' element={<Popular/>}/>
          <Route path='/movies' element={<Movies/>}/>
          <Route path='/tv' element={<Tv/>}/>
          <Route path='/people' element={<People/>}/>
        </Routes>
      </div>
   
  )
}

export default App
