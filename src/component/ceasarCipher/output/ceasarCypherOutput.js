import React from 'react';

function CeasarCypherOutput({type,output}) {
    return (
        <div>
            <h1>{type}</h1>
            <h2>{output}</h2>
        </div>
    );
}

export default CeasarCypherOutput;