import React from 'react';
import Xarrow from 'react-xarrows';
import Draggable from 'react-draggable';

import { Connection } from '../../types';

interface Props {
    connections: Connection[];
}

export const NodeConnections = ({ connections }: Props) => {
    return (
        <React.Fragment>
            {
                connections.map((connection: Connection, index: number) => (
                    <Draggable
                        bounds={
                            { left: 0, right: 470, top: 0, bottom: 550 }
                        }
                        key={index}>
                            <Xarrow start={connection.from} end={connection.to} />
                    </Draggable>
                ))
            }
        </React.Fragment>
    );
}