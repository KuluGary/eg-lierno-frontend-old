import React, { useState } from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Paper from '@material-ui/core/Paper';
import CreatureListComponent from "pages/Creature/CreatureList/CreatureList";
import { useHistoryState } from "hooks/useHistoryState";

function CreatureList(props) {
    const [categories] = useState(["PNJs", "Criaturas"]);
    const [selectedCategory, setSelectedCategory] = useHistoryState("tab", 0);

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (event, newValue) => {
        setSelectedCategory(newValue);
    }

    function tabData() {
        switch (selectedCategory) {
            case 0: return <CreatureListComponent type="npc" history={props.history} dm={props.dm} campaign={props.campaignId} />
            default: return <CreatureListComponent type="bestiary" history={props.history} dm={props.dm} campaign={props.campaignId} />
        }
    }

    return (
        <Paper variant="outlined" style={{ position: "relative" }}>
            <Tabs
                variant="scrollable"
                value={selectedCategory}
                onChange={handleChange}
                aria-label="simple tabs example">
                {categories.map((category, index) => {
                    return <Tab key={index} label={category} {...a11yProps(category)} />
                })}
            </Tabs>
            {tabData()}
        </Paper>
    )

}

export default CreatureList;