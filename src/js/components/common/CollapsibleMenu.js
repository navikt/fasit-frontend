import React, { useState } from "react"
import { List, ListItem, ListItemText } from "@mui/material"
import Collapse from "@mui/material/Collapse"
import ExpandLess from "@mui/icons-material/ExpandLess"
import ExpandMore from "@mui/icons-material/ExpandMore"

export function CollapsibleList(props) {
  let { nestedItems, nestedLevel, primaryText, leftAvatar, initiallyOpen, style, ...rest } = props
  const [open, setOpen] = useState(!!initiallyOpen)

  return (
    <List>
      <ListItem button onClick={() => setOpen(!open)} style={style}>
        {leftAvatar}
        <ListItemText primary={primaryText} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {toArray(nestedItems)}
        </List>
      </Collapse>
    </List>
  )
}

function toArray(maybeArray) {
  if (Array.isArray(maybeArray)) {
    return maybeArray
  }
  let array = []
  array.push(maybeArray)
  return array
}
