import React from 'react'
import TweenOne from 'rc-tween-one/lib/TweenOne'

export default function ZoomAnimate({ children }) {
  return (
    <TweenOne
      animation={{
        scale: 0.5,
        repeat: 1,
        yoyo: true,
        duration: 800,
      }}
    >
      {children}
    </TweenOne>
  )
}
