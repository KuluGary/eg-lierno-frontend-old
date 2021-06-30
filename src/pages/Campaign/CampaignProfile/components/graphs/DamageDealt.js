import React from 'react';
import { ResponsiveLine } from '@nivo/line';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export default function DamageDealt(props) {

    return (
        <Paper variant="outlined" style={{ height: 420, marginRight: ".2rem", width: "100%" }}>
            <Typography style={{ textAlign: "center", fontSize: "1.1rem", paddingTop: ".2rem" }}>
                Daño total causado
            </Typography>
            {props.damageDealt &&
                <ResponsiveLine
                    height={400}
                    margin={{ top: 20, right: 120, bottom: 60, left: 80 }}
                    data={props.damageDealt}
                    isInteractive
                    useMesh
                    enableSlices="x"
                    enableCrosshair={false}
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
                    sliceTooltip={({ slice }) => {
                        return (
                            <div
                                style={{
                                    background: 'white',
                                    padding: '9px 12px',
                                    border: '1px solid #ccc',
                                }}
                            >
                                {/* <div>x: {slice.id}</div> */}
                                {slice.points.map(point => (
                                    <div
                                        key={point.id}
                                        style={{
                                            color: point.serieColor,
                                            padding: '3px 0',
                                        }}
                                    >
                                        <strong>{point.serieId}</strong> [{point.data.yFormatted}]
                                    </div>
                                ))}
                            </div>
                        )
                    }}
                    axisBottom={{
                        tickValues: "every 1 month",
                        format: "%b %d",
                        // tickValues: "every 1 week",
                        // tickRotation: -90,
                        // legend: "time scale",
                        legendOffset: -12
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: "Daño causado",
                        legendPosition: "middle",
                        legendOffset: -40
                    }}
                    theme={{
                        background: "transparent",
                        textColor: props.theme.palette.text.primary,
                        axis: {
                            fontSize: "14px",
                            tickColor: props.theme.palette.text.primary,
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
                    legends={[{
                        dataFrom: "keys",
                        anchor: "bottom-right",
                        direction: "column",
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: "left-to-right",
                        itemOpacity: 0.5,
                        itemTextColor: props.theme.palette.text.primary,
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: props.theme.palette.text.primary,
                                    itemOpacity: 1
                                }
                            }
                        ]
                    }]}
                />
            }
        </Paper>
    )
}
