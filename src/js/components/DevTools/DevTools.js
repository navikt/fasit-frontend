import React from 'react';
import { createDevTools } from 'redux-devtools';

import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import ChartMonitor from 'redux-devtools-chart-monitor'
import Inspector from 'redux-devtools-inspector'

const DevTools = createDevTools(
    <DockMonitor toggleVisibilityKey="ctrl-h"
                 changePositionKey="ctrl-q"
                 changeMonitorKey="ctrl-m"
                 defaultIsVisible={false}
                 defaultPosition="bottom"
    >
        <Inspector />
        <LogMonitor theme="tomorrow" />
        <ChartMonitor />
    </DockMonitor>
);

export default DevTools;
