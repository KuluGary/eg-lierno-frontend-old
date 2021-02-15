import React, { useState } from 'react';
import Radio from '@material-ui/core/Radio';

export default function Durability(props) {
    // const [checked, setChecked] = useState(props.index);
    const [checked, setChecked] = useState(props.durability || 0)

    const modifyDurability = (item, index) => {
        const tableIndex = props.tableItems.findIndex(tableItem => tableItem._id === item.data.id);
        setChecked(index);

        const handlePropItems = (index) => {
            let newItems = { ...props.items };
            let itemToChange = newItems[props.tableItems[tableIndex].data.type].findIndex(item => item.id === props.tableItems[tableIndex].data._id);

            newItems[props.tableItems[tableIndex].data.type][itemToChange].durability = index;
            props.changeStats("equipment", newItems);
        }

        handlePropItems(index);
    }

    const Radios = () => {
        const radios = [];

        for (let index = 1; index < props.length + 1; index++) {
            const check = checked >= index;
            radios.push(
                <Radio
                    checked={checked >= index}
                    // onClick={() => setChecked(!check ? index : index - 1)}
                    onClick={() => modifyDurability(props.item, !check ? index : index - 1)}
                    size="small"
                    color="default" />
            )
        }

        return radios
    }

    return (
        <Radios />
    );
}