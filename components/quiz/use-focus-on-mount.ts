import { useEffect, useRef } from 'react'

/** Moves focus to a screen's heading when it mounts so keyboard and screen-reader users follow each step. */
export function useFocusOnMount<T extends HTMLElement>(enabled = true) {
  const ref = useRef<T>(null)
  useEffect(() => {
    if (enabled) ref.current?.focus({ preventScroll: true })
  }, [enabled])
  return ref
}
