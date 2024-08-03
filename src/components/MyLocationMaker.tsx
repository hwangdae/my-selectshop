import { MyLocationType } from '@/globalState/recoilState'
import React from 'react'
import { MapMarker } from 'react-kakao-maps-sdk'

interface Props {
    myLocation : MyLocationType
}

const MyLocationMaker = ({myLocation}:Props) => {
  return (
<MapMarker
          position={myLocation.center}
          image={{
            src: "/MyLocation.png",
            size: {
              width: 60,
              height: 60,
            },
          }}
        />
  )
}

export default MyLocationMaker
