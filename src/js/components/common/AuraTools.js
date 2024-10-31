import React from "react"
import { Popover } from "react-bootstrap"

export function AuraTools() {
  return (
    <Popover title="AURA tools" id="apps">
      <a href="https://basta.intern.nav.no/" target="Basta">
        <div className="app-container">
          <div className="app-icon">
            <img src="/images/aura-ikoner/basta.png" className="app-icon" />
          </div>
          <div className="app-label">Basta</div>
        </div>
      </a>
      <a href="https://vera.intern.nav.no" target="Vera">
        <div className="app-container">
          <div className="app-icon">
            <img src="/images/aura-ikoner/vera.png" className="app-icon" />
          </div>
          <div className="app-label">Vera</div>
        </div>
      </a>
    </Popover>
  )
}
