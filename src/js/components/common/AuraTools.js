import React, {Component, PropTypes} from 'react'
import {Popover} from 'react-bootstrap'

export function AuraTools() {
    return (
        <Popover title="AURA tools" id="apps">
            <a href="https://fasit.adeo.no" target="Fasit">

                <div className="app-container">
                    <div className="app-icon">
                        <img src="/images/aura-ikoner/fasit.png" className="app-icon"/>
                    </div>
                    <div className="app-label">
                        Fasit
                    </div>
                </div>
            </a>
            <a href="https://basta.adeo.no" target="Basta">

                <div className="app-container">
                    <div className="app-icon">
                        <img src="/images/aura-ikoner/basta.png" className="app-icon"/>
                    </div>
                    <div className="app-label">
                        Basta
                    </div>
                </div>
            </a>
            <a href="https://vera.adeo.no" target="Vera">
                <div className="app-container">
                    <div className="app-icon">
                        <img src="/images/aura-ikoner/vera.png" className="app-icon"/>
                    </div>
                    <div className="app-label">
                        Vera
                    </div>
                </div>
            </a>
            <a href="https://sera.adeo.no" target="Sera">

                <div className="app-container">
                    <div className="app-icon">
                        <img src="/images/aura-ikoner/sera.png" className="app-icon"/>
                    </div>
                    <div className="app-label">
                        Sera
                    </div>
                </div>
            </a>
            <a href="https://nora.adeo.no" target="Nora">

                <div className="app-container">
                    <div className="app-icon">
                        <img src="/images/aura-ikoner/nora.png" className="app-icon"/>
                    </div>
                    <div className="app-label">
                        Nora
                    </div>
                </div>
            </a>
            <a href="https://coca.adeo.no" target="Coca">

                <div className="app-container">
                    <div className="app-icon">
                        <img src="/images/aura-ikoner/coca.png" className="app-icon"/>
                    </div>
                    <div className="app-label">
                        Coca
                    </div>
                </div>
            </a>
            <a href="https://visa.adeo.no" target="Visa">
                <div className="app-container">
                    <div className="app-icon">
                        <img src="/images/aura-ikoner/visa.png" className="app-icon"/>
                    </div>
                    <div className="app-label">
                        Visa
                    </div>
                </div>
            </a>
            <a href="https://plaster.adeo.no" target="Plaster">
                <div className="app-container">
                    <div className="app-icon">
                        <img src="/images/aura-ikoner/plaster.png" className="app-icon"/>
                    </div>
                    <div className="app-label">
                        Plaster
                    </div>
                </div>
            </a>
            <a href="https://confluence.adeo.no/display/AURA" target="confluence">
                <div className="app-container">
                    <div className="app-icon">
                        <img src="/images/aura-ikoner/confluence.png" className="app-icon"/>
                    </div>
                    <div className="app-label">
                        Docs
                    </div>
                </div>
            </a>
        </Popover>
    )
}
