import React from 'react';
import L from "leaflet";
import { Marker, Polyline } from 'react-leaflet'

export const Routes = ({ data }) => {
  return (
    <>
      {data.map(item => {
        const marker = new L.Icon({
          iconUrl: item.marker,
          iconSize: [13.50, 14.50]
        });

        return (
          <>
            <Marker
              icon={marker}
              position={item.linePoints[0]} />
            <Marker
              icon={marker}
              position={item.linePoints[item.linePoints.length - 1]} />
            <Polyline
              color={'#2a2217'}
              positions={item.linePoints}
              dashArray={'10, 10'}
              weight={4} />
          </>
        )
      })}
    </>
  )
}