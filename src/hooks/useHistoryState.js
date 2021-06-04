import React from 'react'
import { useDispatch } from 'react-redux'

export function useHistoryState (key, defaultTo) {
  const [state, rawSetState] = React.useState(() => {
    const value = window.history.state && window.history.state[key]
    return value || defaultTo
  })
  const dispatch = useDispatch()

  function setState (value, dispatchFunc = null) {
    window.history.replaceState(
      { ...window.history.state, [key]: value },
      document.title
    )
    if (dispatchFunc) dispatch(dispatchFunc(value))

    rawSetState(value)
  }

  return [state, setState]
}
