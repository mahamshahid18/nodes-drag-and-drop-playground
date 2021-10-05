import React from 'react';
import Draggable from 'react-draggable';

interface Props {
    currentRef: React.RefObject<HTMLDivElement>;
    targetRef: React.RefObject<HTMLDivElement>;
    resetVariables: () => void;
    detectCollision: (currentRef: React.RefObject<HTMLDivElement>, targetRef: React.RefObject<HTMLDivElement>) => void;
}

export const ReaderNode = ({ currentRef, targetRef, resetVariables, detectCollision }: Props) => {
    return (
        <Draggable
            bounds={
                { left: 0, right: 470, top: 0, bottom: 550 }
            }
            defaultPosition={{ x: 10, y: 100}}
            onStart={resetVariables}
            onStop={(event) => {
                detectCollision(currentRef, targetRef)
            }}>
            <div className='node reader-node' ref={currentRef}>
                Reader
            </div>
        </Draggable>
    );
}
