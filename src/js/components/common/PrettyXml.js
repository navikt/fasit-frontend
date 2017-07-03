import React from 'react'
import {pd} from 'pretty-data'


export default function PrettyXml(props) {
    const xml = String(props.xml).replace(/ns2:/g, '') // remove namespace noise
    const prettyXml = pd.xml(xml)
    const printable = props.filter ? prettyXml
        .split('\n')
        .filter(line => line.toLowerCase().includes(props.filter.toLowerCase()))
        .map(line => `${line.trim()}\n`) : prettyXml

    return (
        <pre>
             <code>
                    {printable}
                </code>
            </pre>
    )
}

