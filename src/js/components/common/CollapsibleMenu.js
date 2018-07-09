import React, { Component } from "react"
import { List, ListItem } from "material-ui/List"

export function CollapsibleList(props) {
  let { nestedItems, nestedLevel, ...rest } = props

  return (
    <List>
      <ListItem
        nestedItems={toArray(nestedItems)}
        {...rest}
        primaryTogglesNestedList={true}
      />
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
