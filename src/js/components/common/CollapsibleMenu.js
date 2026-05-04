import React, { useState } from "react"
import { List, ListItem, ListItemText } from "@material-ui/core"
import Collapse from "@material-ui/core/Collapse"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"

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
