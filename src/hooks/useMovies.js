import { searchMovies } from '../services/movies'
import { useRef, useState, useMemo, useCallback} from 'react'

export function useMovies ({search, sort, yearSort}){
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const previusSearch = useRef(search)

    const getMovies = useCallback(async ({search}) => {
        if(search === previusSearch.current) return 
        
      try {
        setLoading(true)
        setError(null)
        previusSearch.current = search
        const newMovies = await searchMovies({search})
        setMovies(newMovies)
      }catch(e){
        setError(e.message)
      }finally {
        setLoading(false)
      }
    }, [])

    const sortedMovies = useMemo(() => {
      return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
    }, [sort, movies])

    const yearSortedMovies = useMemo(() => {
      return yearSort
      ? [...movies].sort((a, b) => a.year.localeCompare(b.year))
      : movies
    }, [yearSort, movies])

    return {movies: sortedMovies, yearSortedMovies, loading, error, getMovies}
  }