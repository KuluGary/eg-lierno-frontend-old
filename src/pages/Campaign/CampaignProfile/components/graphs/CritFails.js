import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { ResponsivePie } from '@nivo/pie'

function CritFails(props) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (props.characters && props.players && props.logs.length > 0) {
            const data = [];
            const userData = {};

            props.logs.forEach(log => {
                if (log.data?.nat1) {
                    Object.keys(log.data.nat1).forEach(key => {

                        if (key !== props.dm.metadata.discordId) {
                            if (userData[key]) {
                                userData[key] += log.data.nat1[key];
                            } else {
                                userData[key] = log.data.nat1[key];
                            }
                        }
                    })

                }
            })

            Object.keys(userData).forEach(key => {
                const user = props.players.filter(player => player.metadata.discordId === key)[0];
                const userId = user.id;
                const char = props.characters.filter(character => character.player === userId)[0];

                const collection = {
                    "id": char.flavor.traits.name,
                    "label": char.flavor.traits.name,
                    "color": "hsl(4, 70%, 50%)",
                    "value": userData[key]
                }

                data.push(collection)
            })

            setOptions(data)
        }

    }, [props.characters, props.players, props.logs])
    return (
        <Paper variant="outlined" style={{ height: 420, width: "100%" }}>
            <Typography style={{ textAlign: "center", fontSize: "1.1rem", paddingTop: ".2rem" }}>
                Fallos críticos
            </Typography>
            <ResponsivePie
                data={options}
                margin={{ top: 40, right: 80, bottom: 180, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                colors={{ scheme: 'nivo' }}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                enableRadialLabels={false}
                slicesLabelsSkipAngle={10}
                slicesLabelsTextColor="#333333"
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                theme={{
                    textColor: props.theme.palette.text.primary,
                    tooltip: {
                        container: {
                            background: props.theme.palette.background.paper,
                            color: props.theme.palette.text.primary
                        }
                    }
                }}
                legends={[
                    {
                        anchor: 'bottom',
                        direction: 'row',
                        translateY: 56,
                        itemWidth: 100,
                        itemHeight: 18,
                        symbolSize: 18,
                        symbolShape: 'circle',
                        itemOpacity: 0.5,
                        itemTextColor: props.theme.palette.text.primary,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: props.theme.palette.text.primary,
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }
                ]}
            />
        </Paper>
    )
}

export default CritFails