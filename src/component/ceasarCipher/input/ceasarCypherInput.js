import React from 'react';
import {Button, TextField} from "@material-ui/core";

function CeasarCypherInput({
                               setEncryptValue,
                               encryptValue,
                               setDecryptValue,
                               decryptValue,
                               startEncryption,
                               startDecryption
                           }) {
    return (
        <div>
            <TextField id="standard-basic" label="Encrypt"
                       value={encryptValue}
                       onChange={e=>setEncryptValue(e.target.value)}
            />
            <Button onClick={startEncryption}>Encrypt</Button>
            <TextField id="standard-basic" label="Decrypt"
                       value={decryptValue}
                       onChange={e=>setDecryptValue(e.target.value)}
            />

            <Button onClick={startDecryption}>Decrypt</Button>
        </div>
    );
}

export default CeasarCypherInput;