import React, { useState, useEffect } from "react";
import Slide from "@material-ui/core/Slide";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import CircularProgress from "@material-ui/core/CircularProgress";
import ErrorIcon from "@material-ui/icons/Error";
import { useQuery } from "@apollo/client";
import ItemScreen from "./components/ItemScreen";
import SpellScreen from "./components/SpellScreen";
// import ClassScreen from './components/ClassScreen';
import ReferenceScreen from "./components/ReferenceScreen";
import SEO from "components/SEO/SEO";
import { REFERENCE_QUERY } from "helpers/graphql/queries/reference";
import Api from "helpers/api";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function ExploreScreen() {
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState();
  //   const { data, loading, error } = useQuery(REFERENCE_QUERY);

  useEffect(() => {
    const fetchData = async () => {
      const dataSorted = {};

      const items = await Api.fetchInternal("/items");
      const spells = await Api.fetchInternal("/spells");

      items.forEach((item) => (dataSorted[item["type"]] = [...(dataSorted[item["type"]] || []), item]));
      dataSorted.spells = spells;

      setData(dataSorted);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (isLoading) {
    return (
      <Paper variant="outlined" style={{ height: "80vh" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      </Paper>
    );
  }

  //   if (error || Api.hasApolloErrors(data)) {
  //     return (
  //       <Paper variant="outlined" style={{ height: "80vh" }}>
  //         <Box
  //           style={{
  //             display: "flex",
  //             justifyContent: "center",
  //             alignItems: "center",
  //             height: "100%",
  //           }}
  //         >
  //           <Box style={{ textAlign: "center" }}>
  //             <ErrorIcon fontSize="large" />
  //             <Typography variant="h6">Error cargando los datos</Typography>
  //           </Box>
  //         </Box>
  //       </Paper>
  //     );
  //   }

  return (
    <>
      <Slide direction="right" in={true} mountOnEnter unmountOnExit>
        <Paper variant="outlined">
          <SEO>
            <title>{"Referencias | Lierno App"}</title>
          </SEO>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Tabs variant="scrollable" value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label="Objetos" {...a11yProps(0)} />
              <Tab label="Hechizos" {...a11yProps(1)} />
              <Tab label="Referencia rápida" {...a11yProps(2)} />
              {/* <Tab label="Clases" {...a11yProps(2)} /> */}
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <ItemScreen
              data={{
                items: data?.items,
                weapons: data?.weapons,
                armor: data?.armor,
                vehicles: data?.vehicles,
              }}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <SpellScreen data={data?.spells} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ReferenceScreen />
            {/* <ClassScreen
                            data={data?.getAllClasses} /> */}
          </TabPanel>
        </Paper>
      </Slide>
    </>
  );
}

export default ExploreScreen;
