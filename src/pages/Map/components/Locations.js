
import React from 'react';
import { ImageOverlay } from 'react-leaflet';

export const Locations = props => {
  return (
    <>
      {props.data.map(item => {
        let image;

        if (item.image || item.imageLocked) {
          image = item.unlocked ? item.image : item.imageLocked;
        }

        return (
          <div key={item.name}>
            {image && item.bounds &&
              <ImageOverlay
                url={image}
                bounds={item.bounds} />
            }
            {item.children?.length && <Locations data={item.children} />}
          </div>
        )
      })}
    </>
  )
}