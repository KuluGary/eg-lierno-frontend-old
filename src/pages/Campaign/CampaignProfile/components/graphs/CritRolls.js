import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { ResponsivePie } from '@nivo/pie'

function CritRolls(props) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (props.characters && props.players && props.logs.length > 0) {
            const data = [];
            const userData = {};

            props.logs.forEach(log => {
                if (log.data.nat20) {
                    Object.keys(log.data.nat20).forEach(key => {                        
                        if (key !== props.dm.metadata.discordId) {
                            userData[key] += log.data.nat20[key];
                        }
                    })
                }
            })

            setOptions(data)
        }

    }, [props.characters, props.players, props.logs])
    return (
        <Paper variant="outlined" style={{ height: 420, width: (100 / 3) + "%", marginRight: ".2rem"}}>
            <Typography style={{ textAlign: "center", fontSize: "1.1rem", paddingTop: ".2rem" }}>
                Golpes críticos
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
                tooltip={({ id, value, color }) => (
                    <strong style={{ color }}>
                        {id}: {value + " golpe" + (value === 1 ? "" : "s") + " crítico"+ (value === 1 ? "" : "s")}
                    </strong>
                )}
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
                        itemTextColor: '#fff', // <= this worked for me in the end
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

export default CritRolls

