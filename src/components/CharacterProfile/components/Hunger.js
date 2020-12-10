import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { StringUtil } from "../../../helpers/string-util"; 
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Radio from '@material-ui/core/Radio';

const useStyles = makeStyles({
    root: {
        height: "100%",
        // margin: "0 .1rem .2rem .1rem",
        margin: ".1rem",
        paddingBottom: ".2rem"
    },
    paper: {
        padding: "1rem",
        display: "flex",
        flexDirection: "row",
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: "stretch"    ,
        height: "100%"
    },
    stat: {
        margin: "0 1.5rem",
        textAlign: "center"
    },
    link: {
        color: 'inherit',
        textDecoration: 'none',

    }
});

export default function Hunger(props) {
    const classes = useStyles();
    const options = [
        [
            {
                label: StringUtil.generiza('Lleno', 'Llena', 'Llene', props.pronoun),
                background: '#46cf01',
            }, {
                label: StringUtil.generiza('Satisfecho', 'Satisfecha', 'Satisfeche', props.pronoun),
                background: '#7dcf01',
            }, {
                label: 'Bien',
                background: '#b4cf01'
            }, {
                label: 'Con gula',
                background: "#cfb401"
            }, {
                label: StringUtil.generiza('Hambriento', 'Hambrienta', 'Hambriente', props.pronoun),
                background: "#cf7d01"
            }, {
                label: 'Voraz',
                background: "#cf4601"
            }, {
                label: StringUtil.generiza('Famélico', 'Famélica', 'Famélique', props.pronoun),
                background: "#cf0101"
            }
        ],
        [
            {
                label: StringUtil.generiza('Satisfecho', 'Satisfecha', 'Satisfeche', props.pronoun),
                background: '#46cf01',
            }, {
                label: StringUtil.generiza('Refrescado', 'Refrescada', 'Refrescade', props.pronoun),
                background: '#7dcf01',
            }, {
                label: 'Bien',
                background: '#b4cf01'
            }, {
                label: StringUtil.generiza('Seco', 'Seca', 'Seque', props.pronoun),
                background: "#cfb401"
            }, {
                label: StringUtil.generiza('Sediento', 'Sedienta', 'Sediente', props.pronoun),
                background: "#cf7d01"
            }, {
                label: StringUtil.generiza('Reseco', 'Reseca', 'Reseque', props.pronoun),
                background: "#cf4601"
            }, {
                label: StringUtil.generiza('Deshidratado', 'Deshidratada', 'Deshidratade', props.pronoun),
                background: "#cf0101"
            }
        ],
        [
            {
                label: StringUtil.generiza('Energizado', 'Energizada', 'Energizade', props.pronoun),
                background: '#46cf01',
            }, {
                label: StringUtil.generiza('Descansado', 'Descansada', 'Descansade', props.pronoun),
                background: '#7dcf01',
            }, {
                label: 'Bien',
                background: '#b4cf01'
            }, {
                label: StringUtil.generiza('Cansado', 'Cansada', 'Cansade', props.pronoun),
                background: "#cfb401"
            }, {
                label: StringUtil.generiza('Adormilado', 'Adormilada', 'Adormilade', props.pronoun),
                background: "#cf7d01"
            }, {
                label: StringUtil.generiza('Somnoliento', 'Somnolienta', 'Somnoliente', props.pronoun),
                background: "#cf4601"
            }, {
                label: StringUtil.generiza('Agotado', 'Agotada', 'Agotade', props.pronoun),
                background: "#cf0101"
            }
        ], [
            {
                label: StringUtil.generiza('Perfecto', 'Perfecta', 'Perfecte', props.pronoun),
                background: '#46cf01',
            }, {
                label: StringUtil.generiza('Cómodo', 'Perfecta', 'Perfecte', props.pronoun),
                background: '#7dcf01',
            }, {
                label: 'Bien',
                background: '#b4cf01'
            }, {
                label: StringUtil.generiza('Molesto', 'Molesta', 'Moleste', props.pronoun),
                background: "#cfb401"
            }, {
                label: StringUtil.generiza('Incómodo', 'Incómoda', 'Incómode', props.pronoun),
                background: "#cf7d01"
            }, {
                label: StringUtil.generiza('Abrumado', 'Abrumada', 'Abrumade', props.pronoun),
                background: "#cf4601"
            }, {
                label: StringUtil.generiza('Enfermizo', 'Enfermiza', 'Enfermice', props.pronoun),
                background: "#cf0101"
            }
        ]
    ]
    
    const comfort = props.comfort ? props.comfort : {};


    useEffect(() => {

    }, [])

    return (
        <div className={classes.root}>
            <Paper variant="outlined" className={classes.paper}>
                <Table size="small" style={{ textAlign: "center", padding: 10 }}>
                    <TableHead>
                        <TableCell>
                            <Typography variant="subtitle2" style={{ fontSize: "11px", textAlign: "center" }} >{'HAMBRE'}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" style={{ fontSize: "11px", textAlign: "center" }} >{'SED'}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" style={{ fontSize: "11px", textAlign: "center" }} >{'FATIGA'}</Typography>
                        </TableCell>
                        <TableCell>
                            <Typography variant="subtitle2" style={{ fontSize: "11px", textAlign: "center" }} >{props.width === "xs" ? "TEMP" : 'TEMPERATURA'}</Typography>
                        </TableCell>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell style={{ padding: props.width === "xs" && 10 }}>
                                {options[0].map((option, index) => (
                                    props.width !== "xs" ? <Typography
                                        variant="subtitle2"
                                        style={{
                                            fontSize: "11px",
                                            textAlign: "center",
                                            borderRadius: 20,
                                            cursor: 'pointer',
                                            backgroundColor: (comfort.hunger !== undefined ? comfort.hunger : 2) === index ? option.background : 'transparent'
                                        }}
                                        onClick={() => props.editable && props.changeStats("comfort", { ...comfort, hunger: index })}
                                    >{option.label}</Typography> :
                                    <Radio size="small" />
                                ))}
                            </TableCell>
                            <TableCell style={{ padding: props.width === "xs" && 10 }}>
                                {options[1].map((option, index) => (
                                    props.width !== "xs" ?
                                    <Typography
                                        variant="subtitle2"
                                        style={{
                                            fontSize: "11px",
                                            textAlign: "center",
                                            borderRadius: 20,
                                            cursor: 'pointer',
                                            backgroundColor: (comfort.thirst !== undefined ? comfort.thirst : 2) === index ? option.background : 'transparent'
                                        }}
                                        onClick={() => props.editable && props.changeStats("comfort", { ...comfort, thirst: index })}
                                    >{option.label}</Typography> :
                                    <Radio size="small" />
                                ))}
                            </TableCell>
                            <TableCell style={{ padding: props.width === "xs" && 10 }}>
                                {options[2].map((option, index) => (
                                    props.width !== "xs" ?
                                    <Typography
                                        variant="subtitle2"
                                        style={{
                                            fontSize: "11px",
                                            textAlign: "center",
                                            borderRadius: 20,
                                            cursor: 'pointer',
                                            backgroundColor: (comfort.tired !== undefined ? comfort.tired : 2) === index ? option.background : 'transparent'
                                        }}
                                        onClick={() => props.editable && props.changeStats("comfort", { ...comfort, tired: index })}
                                    >{option.label}</Typography> :
                                    <Radio size="small" />
                                ))}
                            </TableCell>
                            <TableCell style={{ padding: props.width === "xs" && 10 }}>
                                {options[3].map((option, index) => (
                                    props.width !== "xs" ?
                                    <Typography
                                        variant="subtitle2"
                                        style={{
                                            fontSize: "11px",
                                            textAlign: "center",
                                            borderRadius: 20,
                                            cursor: 'pointer',
                                            backgroundColor: (comfort.temperature !== undefined ? comfort.temperature : 2) === index ? option.background : 'transparent'
                                        }}
                                        onClick={() => props.editable && props.changeStats("comfort", { ...comfort, temperature: index })}
                                    >{option.label}</Typography> :
                                    <Radio size="small" />
                                ))}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}