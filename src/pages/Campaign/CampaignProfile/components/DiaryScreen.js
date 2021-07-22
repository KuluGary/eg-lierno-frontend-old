import React, { useState, useEffect } from "react";
import HTMLEditor from "components/HTMLEditor/HTMLEditor";

import {
  Box,
  Divider,
  Paper,
  Button,
  IconButton,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  ButtonBase,
} from "@material-ui/core";
import { TreeView, TreeItem } from "@material-ui/lab";
import {
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
  Add as AddIcon,
  Edit as EditIcon,
} from "@material-ui/icons";

function DiaryScreen(props) {
  const [content, setContent] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tree, setTree] = useState(props.diary || []);

  useEffect(() => props.updateDiary(tree), [tree]);

  const modifyTreeNode = (id, title, description) => {
    let newTree = [...tree];
    let foundValue;

    const iterate = (node) => {
      if (parseInt(node.id) === parseInt(id)) {
        foundValue = node;
        return;
      } else {
        if (node.children) {
          for (let child of node.children) {
            iterate(child);
          }
        }
      }
    };

    for (let node of newTree) {
      iterate(node);
    }

    if (foundValue) {
      foundValue.title = title;
      foundValue.content = description;

      setTree(newTree);
      setContent({ id, title, description });
      setDialogOpen(false);
    }
  };

  const getNextId = () => {
    let id = -1;

    const iterate = (node) => {
      if (node.id > id) {
        id = node.id;
      }

      if (node.children) {
        for (const n of node.children) {
          iterate(n);
        }
      }
    };

    for (const node of tree) {
      iterate(node);
    }

    return id + 1;
  };

  const addNewNode = (parentId, title, description) => {
    let newTree = [...tree];
    const newId = getNextId();
    let foundValue;
    const newNode = {
      id: newId,
      title,
      content: description,
      author: props.user,
    };

    const iterate = (node) => {
      if (parseInt(node.id) === parseInt(parentId)) {
        foundValue = node;
        return;
      } else {
        if (node.children) {
          for (let child of node.children) {
            iterate(child);
          }
        }
      }
    };

    for (let node of newTree) {
      iterate(node);
    }

    if (foundValue) {
      if (foundValue.children) {
        foundValue.children.push(newNode);
      } else {
        foundValue.children = [newNode];
      }
    } else {
      newTree.push(newNode);
    }

    setTree(newTree);
    setContent({ newId, title, description });
    setDialogOpen(false);
  };

  const renderTree = (nodes) => {
    const { id, title, content } = nodes;

    return (
      <TreeItem
        key={title}
        nodeId={title}
        label={title}
        onClick={() => setContent({ id, title, description: content })}
      >
        {Array.isArray(nodes.children)
          ? nodes.children.filter((node) => node.author === props.user).map((node) => renderTree(node))
          : null}
      </TreeItem>
    );
  };

  const handleNewEntry = () => {
    setContent({});
    setDialogOpen(true);
  };

  const RenderDialog = () => {
    const [title, setTitle] = useState(content.title || "");
    const [description, setDescription] = useState(content.description || "");
    const [parentNode, setParentNode] = useState(-1);

    const setParentNodes = () => {
      let nodes = [];

      const iterate = (node) => {
        nodes.push({
          id: node.id,
          title: node.title,
        });

        if (node.children) {
          for (const n of node.children) {
            iterate(n);
          }
        }
      };

      for (const node of tree) {
        iterate(node);
      }

      return nodes;
    };

    const parentNodes = setParentNodes();
    const isNewNode = Object.keys(content).length === 0;

    return (
      <Dialog maxWidth={"lg"} fullWidth open={dialogOpen} style={{ padding: 10, height: "100%" }}>
        <DialogTitle>Editar entrada</DialogTitle>
        <DialogContent style={{ overflow: "hidden", height: "60vh" }}>
          <Box
            style={{
              margin: "1rem 0",
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              height: "80 vh",
            }}
          >
            <Box style={{ width: isNewNode ? "70%" : "100%" }}>
              <TextField fullWidth onChange={(e) => setTitle(e.target.value)} value={title} />
            </Box>
            {isNewNode && (
              <Box style={{ width: "28%" }}>
                <Select
                  fullWidth
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={parentNode}
                  onChange={(e) => setParentNode(e.target.value)}
                >
                  <MenuItem value={-1}>Ninguno</MenuItem>
                  {parentNodes.map((node) => (
                    <MenuItem value={node.id}>{node.title}</MenuItem>
                  ))}
                </Select>
              </Box>
            )}
          </Box>
          <Box style={{ margin: "1rem 0", height: "50vh" }}>
            <HTMLEditor value={description} setState={(value) => setDescription(value)} />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="default">
            Cerrar
          </Button>
          {Object.keys(content).length > 0 && (
            <Button
              disabled={!title || title.length <= 0}
              onClick={() => modifyTreeNode(content.id, title, description)}
            >
              Guardar
            </Button>
          )}
          {Object.keys(content).length === 0 && (
            <Button disabled={!title || title.length <= 0} onClick={() => addNewNode(parentNode, title, description)}>
              Guardar
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <Grid item xs={12}>
      <RenderDialog />
      <Grid component={Paper} variant="outlined" container spacing={0} style={{ height: "75vh", width: "100%" }}>
        <Grid item xs={2} style={{ display: "flex", height: "100%", width: "100%", justifyContent: "space-between" }}>
          <Box style={{ width: "100%" }}>
            <ButtonBase
              focusRipple
              onClick={handleNewEntry}
              style={{
                padding: "1rem",
                display: "flex",
                alignItems: "center",
                fontSize: "1rem",
                width: "100%",
                height: 60,
              }}
            >
              <AddIcon fontSize="small" style={{ marginRight: "1rem" }} />
              Añadir página...
            </ButtonBase>
            <Divider style={{ width: "100%" }} />
            <Box style={{ padding: "1rem" }}>
              <TreeView defaultCollapseIcon={<ExpandMoreIcon />} defaultExpandIcon={<ChevronRightIcon />}>
                {tree
                  ?.filter((node) => node.author === props.user)
                  .map((node) => (
                    <TreeItem
                      key={node.title}
                      nodeId={node.title}
                      label={node.title}
                      onClick={() =>
                        setContent({
                          id: node.id,
                          title: node.title,
                          description: node.content,
                        })
                      }
                    >
                      {Array.isArray(node.children) ? node.children.map((n) => renderTree(n)) : null}
                    </TreeItem>
                  ))}
              </TreeView>
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem />
        </Grid>
        <Grid item xs={10} style={{ height: "75vh" }}>
          {Object.keys(content).length > 0 && (
            <>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  margin: "0 1rem",
                  height: 60,
                }}
              >
                <Box style={{ fontSize: "1rem", padding: "1rem" }}>{content.title}</Box>
                {props.dm === props.user && (
                  <Box>
                    <IconButton size="small" onClick={() => setDialogOpen(true)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Box>
              <Divider />
              <Box className={""} style={{ padding: "1rem", height: "90%", overflow: "auto" }}>
                <span
                  style={{ padding: 0, margin: 0 }}
                  className="sun-editor-editable"
                  dangerouslySetInnerHTML={{ __html: content.description }}
                />
              </Box>
            </>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DiaryScreen;
