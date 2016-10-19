import React from 'react';
import { createDevTools } from 'redux-devtools';

import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';
import ChartMonitor from 'redux-devtools-chart-monitor'
import DiffMonitor from 'redux-devtools-diff-monitor'
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
        <DiffMonitor />
    </DockMonitor>
);

export default DevTools;
