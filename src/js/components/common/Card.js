import React from "react"
import { colors } from "../../commonStyles/commonInlineStyles"
import { Link } from "react-router-dom"
import { pink } from "@material-ui/core/colors"

const cardStyle = {
  boxShadow: "0 1px 6px 0 rgba(0,0,0,0.2)",
  borderRadius: "2px",
  marginTop: "15px",
}

const cardItemStyle = {
  fontSize: "14px",
  color: colors.darkgrey,
  marginBottom: "0px",
  fontWeight: "bold",
}

export function CardItem(props) {
  const { label, value, linkTo } = props
  return (
    <div style={{ paddingBottom: "0.5rem" }}>
      <p style={cardItemStyle}>{label}</p>
      {linkTo ? (
        <Link to={linkTo}>{value}</Link>
      ) : (
        <p style={{ color: "#555" }}>{value ? value : "-"}</p>
      )}
    </div>
  )
}

export function CardLinkItem(props) {
  const { label, linkTo, secondaryText } = props

  return (
    <div>
      <div>
        <Link to={linkTo}>{label}</Link>
        {secondaryText && <p>{secondaryText}</p>}
      </div>
    </div>
  )
}

export function CardList(props) {
  const { label } = props
  return (
    <div>
      <div>
        <p style={cardItemStyle}>{label}</p>
      </div>
      <div style={{ marginBottom: "1rem", color: "#555" }}>
        {props.children}
      </div>
    </div>
  )
}

export function Card(props) {
  const { title, subtitle, content, linkTo } = props
  return (
    <div style={cardStyle}>
      <div style={{ padding: "2px 16px" }}>
        <div style={{ paddingBottom: "1rem" }}>
          <h5>
            <b>{linkTo ? <Link to={linkTo}>{title}</Link> : title}</b>
          </h5>
          <h5 style={{ color: colors.grey }}>{subtitle}</h5>
        </div>
        {content && <p style={{ color: "#555" }}>{content}</p>}
        {props.children}
      </div>
    </div>
  )
}
