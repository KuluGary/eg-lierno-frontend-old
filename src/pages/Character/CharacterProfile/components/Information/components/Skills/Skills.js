import React from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Tooltip from 'components/Tooltip/Tooltip';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import TableRow from '@material-ui/core/TableRow';
import Radio from '@material-ui/core/Radio';
import { MenuItem, Select } from '@material-ui/core';
import { useWidth } from 'hooks/media-query';
import { stats, skills } from 'assets/json/customizable_stats.json';
import useStyles from './Skills.styles';

export function Skills(props) {
    const classes = useStyles();
    const statStr = Object.keys(stats).map(check => stats[check].name);
    const width = useWidth();

    const handleClick = (check) => {
        let newItems = { ...props.skills };

        if (props.skills[check].expertise) {
            newItems[check].expertise = false;
            newItems[check].proficient = false;
        } else if (props.skills[check].proficient) {
            newItems[check].expertise = true;
        } else {
            newItems[check].proficient = true;
        }

        props.changeStats("skills", newItems)
    }

    const changeStat = (stat, check) => {
        const newSkills = { ...props.skills };

        newSkills[check].modifier = stat;

        props.changeStats("skills", newSkills);
    }

    const replaceInDescription = (check, modifier) => {
        const strArray = skills[check].description.split(" ");
        const index = strArray.findIndex(i => statStr.includes(i));
        const indexString = Object.keys(props.stats).findIndex(stat => stat === modifier);

        strArray[index] = statStr[indexString];

        return strArray.join(" ");
    }

    const proficiencyDescription = (check) => {
        const indexString = Object.keys(props.stats).findIndex(stat => stat === check.modifier);
        const modifier = statStr[indexString];
        const value = Math.floor((props.stats[check.modifier] - 10) / 2)

        if (check.expertise) {
            return `Cuando tienes pericia en tu tirada de habilidad de ${modifier} (${check.name}), doblas tu bono de proficiencia (+${props.proficiency * 2}) cuando utilizas esta habilidad.`
        } else if (check.proficient) {
            return `Cuando tienes proficiencia en tu tirada de habilidad de ${modifier} (${check.name}), añades tu bono de proficiencia (+${props.proficiency}) cuando utilizas esta habilidad.`
        } else {
            return `Al usar tu habilidad de ${check.name} utilizas tu modificador de ${modifier} (${value > 0 ? "+" + value : value}) para tus tiradas.`
        }
    }

    return (
        <Paper variant="outlined" className={classes.paper}>
            <Box className={classes.subtitleContainer}>
                <Typography variant="subtitle2" className={classes.subtitle} >{'TIRADAS DE SALVACIÓN'}</Typography>
            </Box>
            <Divider />
            <Table className={classes.table} size="small">
                {/* <TableHead>
                    <TableRow>
                        <TableCell size="small" colSpan={4}>
                            <div style={{ fontSize: "12px", textAlign: 'center' }}>
                                {'HABILIDADES'}
                            </div>
                        </TableCell>
                    </TableRow>
                </TableHead> */}
                <TableBody>
                    {Object.keys(props.skills)
                        .sort((a, b) => skills[a].name.localeCompare(skills[b].name, 'en', { 'sensitivity': 'base' }))
                        .map((check, index) => {
                            let bonus = 0;

                            if (props.skills[check].expertise) {
                                bonus = Math.floor((props.stats[props.skills[check].modifier] - 10) / 2) + (props.proficiency * 2)
                            } else if (props.skills[check].proficient) {
                                bonus = Math.floor((props.stats[props.skills[check].modifier] - 10) / 2) + (props.proficiency)
                            } else {
                                bonus = Math.floor((props.stats[props.skills[check].modifier] - 10) / 2)
                            }

                            return (
                                <TableRow key={index} hover>
                                    <Tooltip className={classes.tooltip} title={proficiencyDescription(props.skills[check])}>
                                        <TableCell size="small" padding="none" className={classes.smallCell}>
                                            <Radio
                                                checked={props.skills[check].proficient}
                                                size="small"
                                                onClick={() => handleClick(check)}
                                                disabled={!props.editable}
                                                color={props.skills[check].expertise ? 'secondary' : 'default'}
                                            />
                                        </TableCell>
                                    </Tooltip>
                                    <Tooltip className={classes.tooltip} title={replaceInDescription(check, props.skills[check].modifier)}>
                                        <TableCell>
                                            <div style={{ fontSize: "12px" }}>
                                                {skills[check].name}
                                            </div>
                                        </TableCell>
                                    </Tooltip>
                                    {(props.settings && props.settings.generalOptions.openSkills) &&
                                        <TableCell>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                value={props.skills[check].modifier}
                                                disabled={!props.editable}
                                                fullWidth
                                                onChange={(e) => changeStat(e.target.value, check)}
                                                inputProps={{
                                                    classes: {
                                                        select: classes.resize,
                                                    },
                                                }}
                                            >
                                                {Object.keys(props.stats).map((stat, index) => (
                                                    <MenuItem value={stat}>{width === "xl" ? statStr[index] : statStr[index].substring(0, 3)}</MenuItem>
                                                ))}
                                            </Select>
                                        </TableCell>
                                    }
                                    <TableCell align="right">
                                        <div style={{ fontSize: "14px" }}>
                                            {bonus}
                                        </div>
                                    </TableCell>
                                </TableRow>

                            )
                        })}
                </TableBody>
            </Table>
        </Paper>
    );
}