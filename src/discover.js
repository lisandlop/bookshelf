// export * from './discover.final'

// export * from './discover.exercise'

// 💯 handle failed requests
// export * from './discover.extra-1'

// 💯 use the useAsync hook
// export * from './discover.extra-2'

/** @jsx jsx */
import {jsx} from '@emotion/core'
import * as colors from 'styles/colors'
import * as React from 'react'

import {useAsync} from 'utils/hooks'

import './bootstrap'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
// 🐨 import the client from './utils/api-client'
import {client} from './utils/api-client'

function DiscoverBooksScreen() {
  // 🐨 add state for status ('idle', 'loading', or 'success'), data, and query
  // const data = null // 💣 remove this, it's just here so the example doesn't explode
  const {data, error, run, isLoading, isError, isSuccess} = useAsync()
  const [query, setQuery] = React.useState(); 

  // 🐨 you'll also notice that we don't want to run the search until the
  // user has submitted the form, so you'll need a boolean for that as well
  // 💰 I called it "queried"
  const [querySubmitted, setQuerySubmitted] = React.useState(false); 

  // 🐨 Add a useEffect callback here for making the request with the
  // client and updating the status and data.
  // 💰 Here's the endpoint you'll call: `books?query=${encodeURIComponent(query)}`
  // 🐨 remember, effect callbacks are called on the initial render too
  // so you'll want to check if the user has submitted the form yet and if
  // they haven't then return early (💰 this is what the queried state is for).
  React.useEffect(() => {
    if (!querySubmitted) return
    // setStatus('loading'); 

    run(client(`books?query=${encodeURIComponent(query)}`))
    // .catch(error => {
    //   setError(error)
    //   setStatus('error')
    // })
  }, [query, querySubmitted, run])

  function handleSearchSubmit(event) {
    // 🐨 call preventDefault on the event so you don't get a full page reload
    event.preventDefault()
    // 🐨 set the queried state to true
    setQuerySubmitted(true); 
    // 🐨 set the query value which you can get from event.target.elements
    // setQuery(event.target.elements.search.value)
    setQuery(event.target.elements.search.value)
    // 💰 console.log(event.target.elements) if you're not sure.
    console.log(event.target.elements.search.value)
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : (isError ? 
                <FaTimes aria-label="error" css={{color: colors.danger}} /> 
              : <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>

      {
        isError ? (
          <div css={{color: colors.danger}}>
            <p>There was an error:</p>
            <pre>{error.message}</pre>
          </div>
        ) : null
      }

      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id} aria-label={book.title}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}