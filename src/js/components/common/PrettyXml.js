import React from 'react'
import xmlFormat from 'xml-formatter'


export default function PrettyXml(props) {
    const xml = String(props.xml).replace(/ns2:/g, '') // remove namespace noise
    const prettyXml = xmlFormat(xml, { indentation: '  ', collapseContent: true, lineSeparator: '\n' })
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

