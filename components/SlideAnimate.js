import React from 'react'
import TweenOne from 'rc-tween-one/lib/TweenOne'

export default function SlideAnimate({ children }) {
  return (
    <TweenOne
      animation={[
        {
          x: 300,
          opacity: 0,
          repeat: 0,
          duration: 0,
        },
        {
          x: 0,
          opacity: 1,
          repeat: 0,
          duration: 1000,
        },
        {
          x: 300,
          opacity: 0,
          repeat: 0,
          duration: 1000,
          delay: 3500
        },
      ]}
    >
      {children}
    </TweenOne>
  )
}
