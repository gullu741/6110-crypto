import React, {useState} from 'react';
import GcdInput from "../gcd/input/GcdInput";
import GcdOutput from "../gcd/output/GcdOutput";
import CeasarCypherInput from "./input/ceasarCypherInput";
import CeasarCypherOutput from "./output/ceasarCypherOutput";

function CeasaarCypher(props) {
    const [encryptValue, setEncryptValue] = useState("");
    const [decryptValue, setDecryptValue] = useState("");
    const [output, setOutput] = useState("");
    const [type, setType] = useState("");

    function toLetters(num) {
        let mod = num % 26;
        return String.fromCharCode(65 + mod)
    }

    function toNumber(letter) {
        return (letter.charCodeAt(0) - 65)
    }

    const startEncryption = () => {
        debugger
        let msg = encryptValue.toUpperCase().split("")
        msg = msg.map(l=>toNumber(l))
        msg = msg.map(l=>(((l)+3)%26))
        msg = msg.map(l=>toLetters(l));
        msg=msg.join("")
        setOutput(msg)
        setType("Encrypted")
    }
    const startDecryption = () => {
        let msg = decryptValue.toUpperCase().split("")
        msg = msg.map(l=>(toLetters((toNumber(l)+23)%26))).join("")
        setOutput(msg)
        setType("Decrypted")
    }

    return (
        <div className="container">
            <div className="left">
                <CeasarCypherInput {...{
                    encryptValue,
                    setEncryptValue,
                    decryptValue,
                    setDecryptValue,
                    startEncryption,
                    startDecryption
                }}/>
            </div>
            <div className="right">
                <CeasarCypherOutput {...{output, type}}/>
            </div>
        </div>
    );
}

export default CeasaarCypher;