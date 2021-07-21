import React, { useState, useEffect } from "react";
import useStyles from "../../Features.styles";
import { Collapse, TableCell, TableRow, IconButton, Box, Checkbox, Paper } from "@material-ui/core";
import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
    MoreVert as MoreVertIcon,
} from "@material-ui/icons";
import { Draggable } from "react-beautiful-dnd";
import { StringUtil } from "helpers/string-util";

const Row = (props) => {
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const { item, array, index, type, editFunc, setSelectedData, handleMenu, checks } = props;

    return (
        <>
            <TableRow
                component={Paper}
                key={item.name}
                ref={props.innerRef}
                {...props.dragHandleProps}
                {...props.draggableProps}
            >
                <TableCell style={{ width: "5%" }}>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{item.name}</TableCell>
                {props.editable && editFunc && (
                    <TableCell align="right">
                        <IconButton
                            onClick={(e) => {
                                setSelectedData({
                                    item,
                                    index,
                                    array,
                                    type,
                                    editFunc,
                                });
                                return handleMenu(e);
                            }}
                        >
                            <MoreVertIcon size="small" />
                        </IconButton>
                    </TableCell>
                )}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        {item.usage_num && item.usage_type && (
                            <Box style={{ display: "flex", alignItems: "center" }}>
                                {checks}
                                <Box style={{ fontSize: 11 }}>
                                    {item.usage_type === "long_rest" ? "por descanso largo" : "por descanso corto"}
                                </Box>
                            </Box>
                        )}
                        <div
                            style={{ margin: ".5rem 0" }}
                            className={classes.descriptionBox}
                            dangerouslySetInnerHTML={{ __html: StringUtil.parseHTML(item.description) }}
                        />
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

export default function DraggableRow({
    item,
    index,
    array,
    type,
    features,
    setSelectedData,
    editFunc = null,
    modifyItem,
    handleMenu,
    innerRef,
    ...props
}) {
    const [checks, setChecks] = useState([]);

    useEffect(() => {
        const checkTemp = [];

        if (item.usage_num && checks.length <= 0) {
            for (let i = 0; i < parseInt(item.usage_num.max); i++) {
                checkTemp.push(
                    <Checkbox
                        color="default"
                        size="small"
                        checked={item.usage_num.current - 1 >= i}
                        onChange={() => {
                            const action = { ...item };
                            action["usage_num"]["current"] = item.usage_num.current - 1 >= i ? i : i + 1;

                            const newActions = [...features[type]];
                            newActions[index] = action;

                            props.changeStats(type, newActions);
                        }}
                    />,
                );
            }
        }

        setChecks(checkTemp);
    }, [item.usage_num]);

    return (
        <Draggable key={item.name} draggableId={item.name} index={index}>
            {(provided) => (
                <Row
                    item={item}
                    array={array}
                    index={index}
                    type={type}
                    editFunc={editFunc}
                    setSelectedData={setSelectedData}
                    modifyItem={modifyItem}
                    handleMenu={handleMenu}
                    checks={checks}
                    editable={props.editable}
                    innerRef={provided.innerRef}
                    dragHandleProps={provided.dragHandleProps}
                    draggableProps={provided.draggableProps}
                />
            )}
        </Draggable>
    );
}
