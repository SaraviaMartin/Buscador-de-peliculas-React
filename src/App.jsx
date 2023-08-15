import './App.css'
import { useEffect, useState, useRef, useCallback } from 'react'
import { useMovies } from './hooks/useMovies'
import { Movies } from './components/Movies'
import debounce from 'just-debounce-it'

function useSearch (){
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if(isFirstInput.current) {
      isFirstInput.current = search === ''
      return
    }
    if(search === ''){
      setError('No se puede buscar una pelicula vacia')
      return
    }
    if(search.match(/^\d+$/)){
      setError('No se puede buscar una pelicula con un numero')
      return
    }
    if(search.length < 3){
      setError('La busqueda tiene que tener al menos 3 caracteres')
      return
    }
    setError(null)
  }, [search])

  return {search, updateSearch, error }
}

function App() {
  const [sort, setSort] = useState(false)
  const [yearSort, setYearSort] = useState(false)
  const {search, updateSearch, error} = useSearch()
  const {movies,loading, getMovies} = useMovies({search, sort, yearSort})
  

  const debouncedGetMovies = useCallback(
    debounce(search => {
    getMovies({search})
  }, 300)
    , [getMovies]
  )

  const handleSubmit = (event) => {
    event.preventDefault()
    getMovies({search})
    
  }

  const handleSort = () => {
    setSort(!sort)
    
  }
  const handleYearSort = () => {
    setYearSort(!yearSort)
  }

  const handleChange = (event) => {
    const newSearch = event.target.value
    updateSearch(newSearch)
    debouncedGetMovies(newSearch)
  }


  return (
    <div className='page'>
      <header>
        <h1>
          Buscador de peliculas 
        </h1>
        <form className='form' onSubmit={handleSubmit}>
          <input 
          style={{
            border: '1px solid transparent ', 
            borderColor: error ? 'red' : 'transparent'
            }} onChange={handleChange} value={search} name='query' placeholder='Avengers, Star Wars, The Matrix'/>
            <span>Filtrar por Titulo </span><input type="checkbox" onChange={handleSort}  checked={sort}/>
            {/* <span>Filtrar por Año </span><input type="checkbox" onChange={handleYearSort}  checked={yearSort}/> */}
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{color: 'red'}}>{error}</p> }
      </header>

    <main>
      {
        loading ? <p>Cargando...</p> : <Movies movies={movies}/>
      }
    </main>
      
    </div>
  )
}

export default App
