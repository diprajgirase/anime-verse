import Artplayer from 'artplayer'
import React from 'react'

export const VideoPlayer = ({ option, getInstance, id, ...rest }: any) => {
  const artRef = React.useRef()

  React.useEffect(() => {
    const art = new Artplayer({
      ...option,
      container: artRef.current,
    })

    if (getInstance && typeof getInstance === 'function') {
      getInstance(art)
    }

    return () => {
      if (art && art.destroy) {
        art.destroy(false)
      }
    }
  }, [id])
  return <div ref={artRef} {...rest}></div>
}
