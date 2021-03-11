import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';

function DamagePerDay(props) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (props.characters && props.players && props.logs.length > 0) {
            const data = [];
            const userData = {};

            props.logs.forEach(log => {
                // Object.keys(log.data.damageDealt).forEach(key => {
                //     if (key !== props.dm.metadata.discordId) {
                //         userData[key] = userData[key] ? [...userData[key], ...log.data.damageDealt[key]] : [...log.data.damageDealt[key]]
                //     }
                // })
            })

            Object.keys(userData).forEach(key => {
                userData[key] = userData[key].sort((a, b) => new Date(a.date) - new Date(b.date));
            })

            Object.keys(userData).forEach(key => {
                const entry = userData[key];
                const user = props.players.filter(player => player.metadata.discordId === key)[0];
                const userId = user.id;
                const char = props.characters.filter(character => character.player === userId)[0];

                if (char.flavor.traits.name === props.character) {
                    const collection = {
                        "id": char.flavor.traits.name,
                        "color": "hsl(63, 70%, 50%)",
                        "data": []
                    }

                    entry.forEach(step => {
                        if (collection.data.findIndex(item => item.x === step.date.split(" ")[0]) >= 0) {
                            const index = collection.data.findIndex(item => item.x === step.date.split(" ")[0]);

                            collection.data[index].y += step.damage;
                        } else {
                            collection.data.push({
                                x: step.date.split(" ")[0],
                                y: step.damage
                            })
                        }
                    })

                    data.push(collection)
                }
            })

            setOptions(data)
        }
    }, [props.characters, props.players, props.logs])

    return (
        <div style={{ height: "30px", width: "200px" }}>
            <ResponsiveLine
                height={30}
                margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                data={options}
                yScale={{ type: 'linear', stacked: false }}
                xScale={{
                    type: "time",
                    format: "%Y-%m-%d"
                }}
                xFormat="time:%Y-%m-%d"
                indexBy="map"
                labelTextColor="inherit:darker(2.4)"
                labelSkipWidth={12}
                labelSkipHeight={12}
                enableGridX={false}
                enableGridY={false}
                enablePoints={false}
                axisBottom={{
                    tickValues: "every 1 month",
                    format: "%b %d",
                    legendOffset: -12
                }}
                theme={{
                    background: "transparent",
                    textColor: props.theme.palette.text.primary,
                    axis: {
                        fontSize: "14px",
                        color: "transparent",
                        tickColor: "transparent",
                        ticks: {
                            line: {
                                stroke: "#555555"
                            },
                        }
                    },
                    grid: {
                        line: {
                            stroke: "#555555"
                        }
                    }
                }}
            />
        </div>
    )
}

export default DamagePerDay

