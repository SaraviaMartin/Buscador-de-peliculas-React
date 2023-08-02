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
    if(newQuery.startsWith(' ')) return 
    setQuery(event.target.value)

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
          <input style={{border: '1px solid transparent ', borderColor: error ? 'red' : 'transparent'}} onChange={handleChange} value={query} name='query' ref={inputRef} placeholder='Avengers, Star Wars, The Matrix'/>
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
