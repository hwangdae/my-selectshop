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
            src: "/assets/MyLocation.svg",
            size: {
              width: 50,
              height: 50,
            },
          }}
        />
  )
}

export default MyLocationMaker
