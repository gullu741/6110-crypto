import React, {useState} from 'react';
import GcdInput from "../gcd/input/GcdInput";
import GcdOutput from "../gcd/output/GcdOutput";
import CeasarCypherInput from "../ceasarCipher/input/ceasarCypherInput";
import CeasarCypherOutput from "../ceasarCipher/output/ceasarCypherOutput";
import {Button, TextField} from "@material-ui/core";

function ShiftCypher(props) {
    const [encryptValue, setEncryptValue] = useState("");
    const [decryptValue, setDecryptValue] = useState("");
    const [output, setOutput] = useState([]);
    const [type, setType] = useState("");
    const [key,setKey] = useState(0)

    function toLetters(num) {
        let mod = num % 26;
        return String.fromCharCode(65 + mod)
    }

    function toNumber(letter) {
        return (letter.charCodeAt(0) - 65)
    }

    const startEncryption = () => {
        let msg = encryptValue.toUpperCase().split("")
        msg = msg.map(l=>toNumber(l))
        msg = msg.map(l=>(((l)+((key<0?26+key:key)%26))%26))
        msg = msg.map(l=>toLetters(l));
        msg=msg.join("")
        setOutput([msg])
        setType("Encrypted")
    }
    const startDecryption = () => {

        let msg = decryptValue.toUpperCase().split("")
        let list = []
        for(let i = 1;i<26;i++){
            list.push(msg.map(l=>(toLetters((toNumber(l)+(i)%26)))).join(""))
        }
        setOutput(list)
        setType("Decrypted")
    }

    return (
        <div className="container">
            <div className="left">
                <div>
                    <TextField id="standard-basic" label="Encrypt"
                               value={encryptValue}
                               onChange={e=>setEncryptValue(e.target.value)}
                    />
                    <TextField id="standard-basic" label="Encrypt"
                                type="number"
                               value={key}
                               onChange={e=>setKey(parseInt(e.target.value))}
                    />
                    <Button onClick={startEncryption}>Encrypt</Button>
                    <TextField id="standard-basic" label="Decrypt"
                               value={decryptValue}
                               onChange={e=>setDecryptValue(e.target.value)}
                    />

                    <Button onClick={startDecryption}>Decrypt</Button>
                </div>
            </div>
            <div className="right">
                <div>
                    <h1>{type}</h1>
                    <p>{output.map((l,idx)=><p>{l} ,key = {26-idx}</p>)}</p>
                </div>
            </div>
        </div>
    );
}

export default ShiftCypher;