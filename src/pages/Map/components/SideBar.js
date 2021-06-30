import React from 'react';
import {
  Paper,
  Box,
  IconButton,
  Typography
} from '@material-ui/core';
import {
  Close as CloseIcon
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  sideNav: {
    height: "100%",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1000,
    transition: "0.25s all ease-in-out",
    textOverflow: "clip",
    overflow: "hidden"
  }
});

export const SideBar = ({ sideBarInfo, setSideBarInfo }) => {
  const classes = useStyles();
  return (
    <Box
      className={classes.sideNav}
      style={{ width: sideBarInfo ? "20%" : "0%" }}
      component={Paper}>
      <Box style={{
        position: "relative"
      }}>
        <img style={{
          maxWidth: "100%",
          maskImage: "url('https://i.imgur.com/gY6rXhF.png')",
          WebkitMaskImage: "url('https://i.imgur.com/gY6rXhF.png')",
          maskSize: "100% 100%",
          WebkitMaskSize: "100% 100%"
        }}
          src={"https://i.pinimg.com/564x/f3/66/47/f3664784e373b5326c7a4bcfef0d63a4.jpg"}
        />
        <IconButton
          onClick={() => setSideBarInfo()}
          size="small"
          style={{ position: "absolute", top: 10, right: 10 }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box style={{ padding: sideBarInfo ? "1rem" : 0 }}>
        <Box component="div" style={{ textAlign: "center", marginBottom: "1rem" }}>
          <Typography variant="h6">
            {sideBarInfo?.name}
          </Typography>
        </Box>
        {sideBarInfo?.flavor?.properties?.map(property => (
          <Box component="p">
            <Box component="b" display="inline">
              {property.name + " "}
            </Box>
            <Box display="inline">
              {property.value}
            </Box>
          </Box>
        ))}
        <Box component="div" style={{
          webKitMaskImage: 'linear-gradient(to top, transparent 15%, black 85%)',
          maskImage: 'linear-gradient(to top, transparent 15%, black 85%)',
          overflow: 'auto',
          textAlign: "justify"
        }}>
          {/* {sideBarInfo?.flavor?.description} */}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. In vitae turpis massa sed elementum tempus egestas sed. Mauris commodo quis imperdiet massa tincidunt. Semper feugiat nibh sed pulvinar proin gravida hendrerit lectus a. Vulputate eu scelerisque felis imperdiet proin. Nibh venenatis cras sed felis eget velit aliquet sagittis id. Lacinia quis vel eros donec ac odio tempor orci. Lectus proin nibh nisl condimentum id venenatis a condimentum. Iaculis nunc sed augue lacus viverra vitae congue. Gravida in fermentum et sollicitudin. Diam vel quam elementum pulvinar etiam non quam lacus. Mattis aliquam faucibus purus in.

          Integer eget aliquet nibh praesent. Eget nunc scelerisque viverra mauris in aliquam. Parturient montes nascetur ridiculus mus mauris vitae ultricies leo integer. Lobortis scelerisque fermentum dui faucibus in ornare quam viverra orci. Nulla at volutpat diam ut venenatis tellus in metus vulputate. Mattis enim ut tellus elementum sagittis vitae. Lacus suspendisse faucibus interdum posuere. Fermentum dui faucibus in ornare quam viverra. Ornare arcu dui vivamus arcu felis bibendum ut tristique et. Mi tempus imperdiet nulla malesuada. Nullam ac tortor vitae purus faucibus ornare suspendisse sed. Faucibus interdum posuere lorem ipsum dolor. Turpis cursus in hac habitasse platea dictumst quisque sagittis purus. Pellentesque dignissim enim sit amet venenatis urna. Et malesuada fames ac turpis egestas. Nec sagittis aliquam malesuada bibendum.
        </Box>
      </Box>
    </Box>
  )
}