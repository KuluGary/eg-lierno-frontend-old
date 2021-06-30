import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from "leaflet";
import { Marker } from 'react-leaflet'

export const Labels = ({ data, map, setSideBarInfo, setParentLocation, locations, retrieveLocations }) => {
  return (
    <>
      {data.map((item) => {
        const iconMarkup = renderToStaticMarkup(
          <div className={"lierno-map-tag"} >
            <div className={`${item.tag?.type} no-display no-visibility`}>
              {item.name}
            </div>
          </div>);

        const marker = divIcon({
          html: iconMarkup,
          className: "animated-marker"
        });

        return (
          <div key={item.name}>
            {item.unlocked && <>
              {item.tag &&
                <Marker
                  position={item.tag?.pos}
                  icon={marker}
                  eventHandlers={{
                    click: () => {
                      if (item.id) {
                        setParentLocation(locations._id);
                        retrieveLocations(item.id, map);
                      }

                      if (item.flavor) {
                        setSideBarInfo({
                          name: item.name,
                          flavor: item.flavor
                        });
                      }
                    }
                  }} />
              }
              {item.children?.length && <Labels data={item.children} setSideBarInfo={setSideBarInfo} />}
            </>}
          </div>
        )
      })}
    </>
  )
}