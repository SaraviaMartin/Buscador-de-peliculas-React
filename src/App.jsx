import './App.css'
import { useEffect, useRef, useState } from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'



function App() {
  const {movies: mappedMovies} = useMovies()
  const inputRef = useRef()
  const [query, setQuery] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({query})
    
  }

  const handleChange = (event) => {
    const newQuery = event.target.value
    setQuery(newQuery)
    if(newQuery === ''){
      setError('No se peude buuscar una pelicula vacia')
      return
    }
    if(newQuery.match(/^\d+$/)){
      setError('No se puede buscar una pelicula con un numero')
      return
    }
    if(newQuery.length < 3){
      setError('La busqueda tiene que tener al menos 3 caracteres')
      return
    }
    setError(null)
  }



  return (
    <div className='page'>
      <header>
        <h1>
          Buscador de peliculas 
        </h1>
        <form className='form' onSubmit={handleSubmit}>
          <input onChange={handleChange} value={query} name='query' ref={inputRef} placeholder='Avengers, Star Wars, The Matrix'/>
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p> }
      </header>

    <main>
      <Movies movies={mappedMovies}/>
    </main>
      
    </div>
  )
}

export default App
