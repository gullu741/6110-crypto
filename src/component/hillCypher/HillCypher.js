import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import "./HillCypher.scss";

function HillCypher(props) {

    const [plain1, setPlain1] = useState(0);
    const [plain2, setPlain2] = useState(0);
    const [cipher1, setCipher1] = useState(0);
    const [cipher2, setCipher2] = useState(0);
    const [key, setKey] = useState('');

    const [result, setResult] = useState([])
    const between = (num) => (num >= 0 && num <= 25)
    const mod = (n, k) => {
        return ((n % k) + k) % k;
    };
    const startDecryption = () => {
        let result = []
        let keys = key.split(" ")
        if (keys.length === 4) {
            keys = keys.map(key => parseInt(key))
            result.push(<p> [P1 P2] = [{cipher1} {cipher2}] [[{keys[0]} {keys[1]}][{keys[2]} {keys[3]}]]^-1 mod26</p>)
            result.push(<p> [P1 P2] = [{cipher1} {cipher2}] ({keys[0] * keys[3]} - {keys[1] * keys[2]})^-1
                [[{keys[3]} {-keys[1]}][{-keys[2]} {keys[0]}]] mod26</p>)
            let k = mod(keys[0] * keys[3] - keys[1] * keys[2], 26)
            result.push(<p> [P1 P2] = [{cipher1} {cipher2}] ({k})^-1 [[{keys[3]} {-keys[1]}][{-keys[2]} {keys[0]}]]
                mod26</p>)

            let c1 = [26, mod(k, 26)], c2 = [0], c3 = [0, 1];
            let i = 0;
            while (true) {
                let div = Math.floor(c1[i] / c1[i + 1])
                let remainder = c1[i] % c1[i + 1]
                c2.push(div)
                c1.push(remainder)
                if (remainder === 0) {
                    break
                }
                i++;
            }
            for (let i = 2; i < c2.length; i++) {
                c3.push(c3[i - 2] - (c2[i - 1] * c3[i - 1]))
            }
            result.push(<p>----------------------</p>)
            result.push(c1.map((c, i) => {
                return <tr>
                    <td>{c}</td>
                    <td>{c2[i] || 0}</td>
                    <td>{c3[i] || 0}</td>
                </tr>
            }))

            k = c3[c3.length - 1]
            k = mod(k, 26)
            result.push(<p> [P1 P2] = [{cipher1} {cipher2}] ({k}) [[{keys[3]} {-keys[1]}][{-keys[2]} {keys[0]}]]
                mod26</p>)
            keys[2] = -keys[2]
            keys[1] = -keys[1]
            result.push(<p> [P1 P2] = [{cipher1} {cipher2}] ({k}) [[{keys[3]} {keys[1]}][{keys[2]} {keys[0]}]]
                mod26</p>)
            result.push(<p> [P1 P2] = ({k})
                [{cipher1 * keys[3]}+{cipher2 * keys[2]} {cipher1 * keys[1]}+{cipher2 * keys[0]}] mod26</p>)
            result.push(<p> [P1 P2] = ({k})
                [{cipher1 * keys[3] + cipher2 * keys[2]} {cipher1 * keys[1] + cipher2 * keys[0]}] mod26</p>)
            result.push(<p> [P1 P2] =
                [{k * (cipher1 * keys[3] + cipher2 * keys[2])} {k * (cipher1 * keys[1] + cipher2 * keys[0])}] mod26</p>)
            result.push(<p> [P1 P2] =
                [{mod(k * (cipher1 * keys[3] + cipher2 * keys[2]), 26)} {mod(k * (cipher1 * keys[1] + cipher2 * keys[0]), 26)}]</p>)
        }

        setPlain1(0)
        setPlain2(0)
        setCipher1(0)
        setCipher2(0)
        setKey("")
        setResult(result)
    }

    const startEncryption = () => {
        let result = []
        let keys = key.split(" ");
        if (keys.length === 4) {
            keys = keys.map(key => parseInt(key))
            result.push(<p>[C1 C2] = [{plain1} {plain2}]*[[{keys[0]} {keys[1]}][{keys[2]} {keys[3]}]] mod(26)</p>)
            result.push(<p>[C1 C2] = [{plain1}*{keys[0]}+{plain2}*{keys[2]} {plain1}*{keys[1]}+{plain2}*{keys[3]}]
                mod(26)</p>)
            result.push(<p>[C1 C2] = [{plain1 * keys[0] + plain2 * keys[2]} {plain1 * keys[1] + plain2 * keys[3]}]
                mod(26)</p>)
            result.push(<p>[C1 C2] =
                [{mod(plain1 * keys[0] + plain2 * keys[2], 26)} {mod(plain1 * keys[1] + plain2 * keys[3], 26)}]</p>)
        }

        setPlain1(0)
        setPlain2(0)
        setCipher1(0)
        setCipher2(0)
        setKey("")
        setResult(result)
    }

    return (
        <div className="container">
            <div className="left">
                <div>
                    <TextField id="standard-basic" label="P1"
                               type="number"
                               value={plain1}
                               onChange={e => setPlain1(parseInt(e.target.value))}
                    />
                    <TextField id="standard-basic" label="P2"
                               type="number"
                               value={plain2}
                               onChange={e => setPlain2(parseInt(e.target.value))}
                    />
                    <TextField id="standard-basic" label="C1"
                               type="number"
                               value={cipher1}
                               onChange={e => setCipher1(parseInt(e.target.value))}
                    />
                    <TextField id="standard-basic" label="C2"
                               type="number"
                               value={cipher2}
                               onChange={e => setCipher2(parseInt(e.target.value))}
                    />
                    <TextField id="standard-basic" label="[[k1 k2] [k3 K4]]"
                               type="text"
                               value={key}
                               onChange={e => setKey(e.target.value)}
                    />

                    <Button onClick={() => {
                        debugger
                        if (between(plain2) && between(plain1) && key.split(" ").length ===4) {
                            startEncryption()
                        }
                    }}>Encrypt</Button>
                    <Button onClick={() => {
                        debugger
                        if (between(cipher2)  && between(cipher2) && key.split(" ").length ===4) {
                            startDecryption()
                        }
                    }}>De-Encrypt</Button>
                </div>
            </div>
            <div className="right">
                <div className={"affineOutputContainer"}>
                    {result}
                </div>
            </div>
        </div>
    );
}

export default HillCypher;