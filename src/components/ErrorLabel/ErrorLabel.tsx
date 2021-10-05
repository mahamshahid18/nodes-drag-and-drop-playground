import React from 'react';
import './ErrorLabel.css'

interface Props {
    errorMessage: string;
}

export const ErrorLabel = ({ errorMessage }: Props) => (
    <div className="error-label">
        {errorMessage}
    </div>
);