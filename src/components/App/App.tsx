import React, { useRef, useState } from 'react';
import './App.css';

import { PipelineNode } from '../../types';

import { ErrorLabel } from '../ErrorLabel';
import { ReaderNode } from '../ReaderNode';
import { RetrieverNode } from '../RetrieverNode';
import { NodeConnections } from '../NodeConnections';

function App() {
  const readerRef = useRef(null);
  const retrieverRef = useRef(null);

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [connections, setConnections] = useState<any>([]);

  const detectCollision = (ref: React.RefObject<HTMLDivElement>, targetRef: React.RefObject<HTMLDivElement>) => {
    const currentNodePosition = ref?.current?.getBoundingClientRect() as DOMRect;
    const targetNodePosition = targetRef?.current?.getBoundingClientRect() as DOMRect;

    const currentXInterval = currentNodePosition.right - currentNodePosition.left
    const currentYInterval = currentNodePosition.bottom - currentNodePosition.top
    const currentNodeXPositions: number[] = [];
    const currentNodeYPositions: number[] = [];
    
    for (let count = 0; count < currentXInterval; count++) {
      currentNodeXPositions.push(currentNodePosition.right - count);
    };

    for (let count = 0; count < currentYInterval; count++) {
      currentNodeYPositions.push(currentNodePosition.bottom - count);
    };

    const xPositionMatches = currentNodeXPositions.includes(targetNodePosition.left) || currentNodeXPositions.includes(targetNodePosition.right);
    const yPositionMatches = currentNodeYPositions.includes(targetNodePosition.top) || currentNodeYPositions.includes(targetNodePosition.bottom);

    if (xPositionMatches && yPositionMatches) {
      console.log('collision detected!');
      handleConnection(ref, targetRef);
    };
  }

  const handleConnection = (currentRef: any, targetRef: any) => {
    const currentNodeClasses = [...currentRef?.current?.classList];
    const targetNodeClasses = [...targetRef?.current?.classList];
    const currentNodeType = currentNodeClasses.includes('reader-node') ? PipelineNode.Reader : PipelineNode.Retriever;
    const targetNodeType = targetNodeClasses.includes('retriever-node') ? PipelineNode.Retriever : PipelineNode.Reader;

    if (currentNodeType === PipelineNode.Retriever && targetNodeType === PipelineNode.Reader) {
      setErrorMessage('This operation is not allowed - you cannot add a connection from a retriever to a reader');
    } else {
      const connection = [
        ...connections,
        {
          from: currentRef,
          to: targetRef
        }
      ];

      setConnections(connection);
    }
  }

  const resetVariables = () => {
    setErrorMessage('');
  }

  return (
    <React.Fragment>
      <div className="main-container">

        <div className="header">
          <span className="title">
            Pipeline Designer
          </span>
          <span className="description">
            Move nodes around by dragging. Connect a node to another by dragging and dropping on top of the other node.
          </span>
        </div>

        {
          errorMessage && <ErrorLabel errorMessage={errorMessage} />
        }

        <div className="pipeline-design-area">
          <ReaderNode currentRef={readerRef} targetRef={retrieverRef} detectCollision={detectCollision} resetVariables={resetVariables} />
          <RetrieverNode currentRef={retrieverRef} targetRef={readerRef} detectCollision={detectCollision} resetVariables={resetVariables} />

          {
            !!connections?.length && (
              <NodeConnections connections={connections} />
            )
          }
  
        </div>

      </div>
    </React.Fragment>
  );
}

export default App;
