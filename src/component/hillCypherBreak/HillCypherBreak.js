import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";

function HillCypherBreak(props) {

    const [plain1, setPlain1] = useState("");
    const [plain2, setPlain2] = useState("");
    const [cipher1, setCipher1] = useState("");
    const [cipher2, setCipher2] = useState("");
    const [result, setResult] = useState([])
    const between = (num) => (num >= 0 && num <= 25)
    const mod = (n, k = 26) => {
        return ((n % k) + k) % k;
    };
    const splitLength = (str) => {
        return str.split(" ").length === 2
    }
    const startSolving = () => {
        let result = []
        let cipher = [...cipher1.split(" "), ...cipher2.split(" ")].map(v => parseInt(v));
        let plain = [...plain1.split(" "), ...plain2.split(" ")].map(v => parseInt(v))
        result.push(<p>[{plain[0]} , {plain[1]}] K = [{cipher[0]} , {cipher[1]}] mod26 </p>)
        result.push(<p>[{plain[2]} , {plain[3]}] K = [{cipher[2]} , {cipher[3]}] mod26 </p>)
        result.push(<p>[{plain[0]} , {plain[1]} , {plain[2]} , {plain[3]}] K =
            [{cipher[0]} , {cipher[1]} , {cipher[2]} , {cipher[3]}] mod26 </p>)
        result.push(<p> K = [{plain[0]} , {plain[1]} , {plain[2]} , {plain[3]}]^-1
            [{cipher[0]} , {cipher[1]} , {cipher[2]} , {cipher[3]}] mod26 </p>)
        result.push(<p> K = ({plain[0] * plain[3]} - {plain[1] * plain[2]})^-1
            [{plain[3]} , {-plain[1]} , {-plain[2]} , {plain[0]}] [{cipher[0]} , {cipher[1]} , {cipher[2]} , {cipher[3]}]
            mod26 </p>)
        plain[1] = -plain[1]
        plain[2] = -plain[2]
        let m = plain[0] * plain[3] - plain[1] * plain[2]
        result.push(<p> K = ({m})^-1
            [{plain[3]} , {plain[1]} , {plain[2]} , {plain[0]}] [{cipher[0]} , {cipher[1]} , {cipher[2]} , {cipher[3]}]
            mod26 </p>)
        m = mod(m, 26)
        result.push(<p> K = ({m})^-1
            [{plain[3]} , {plain[1]} , {plain[2]} , {plain[0]}] [{cipher[0]} , {cipher[1]} , {cipher[2]} , {cipher[3]}]
            mod26 </p>)

        let c1 = [26, mod(m, 26)], c2 = [0], c3 = [0, 1];
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


        m = c3[c3.length - 1]
        result.push(<p> m^-1 = ({m})</p>)
        m = mod(m, 26)
        result.push(<p> m^-1 = ({m})</p>)

        result.push(<p> K = ({m})
            [{plain[3]} , {plain[1]} , {plain[2]} , {plain[0]}] [{cipher[0]} , {cipher[1]} , {cipher[2]} , {cipher[3]}]
            mod26 </p>)
        result.push(<p> K =
            [{plain[3]}*{m} , {plain[1]}*{m} , {plain[2]}*{m} {plain[0]}*{m}]
            [{cipher[0]} , {cipher[1]} , {cipher[2]} , {cipher[3]}] mod26 </p>)
        plain = plain.map(v => v * m)
        result.push(<p> K =
            [{plain[3]} , {plain[1]} , {plain[2]} , {plain[0]}] [{cipher[0]} , {cipher[1]} , {cipher[2]} , {cipher[3]}]
            mod26 </p>)

        result.push(<p> K =
            [{plain[3]} , {plain[1]} , {plain[2]} , {plain[0]}] [{cipher[0]} , {cipher[1]} , {cipher[2]} , {cipher[3]}]
             </p>)

        plain = plain.map(v => mod(v,26))

        result.push(<p> K =
            [{plain[3] * cipher[0]}-{plain[1] * cipher[2]} , {plain[3] * cipher[1]}-{plain[1] * cipher[3]} ,
            {plain[0] * cipher[2]}-{plain[2] * cipher[0]} , {plain[2] * cipher[1]}-{plain[0] * cipher[3]}]
            mod26 </p>)
        result.push(<p> K =
            [[{plain[3] * cipher[0] - plain[1] * cipher[2]} , {plain[3] * cipher[1] - plain[1] * cipher[3]}],
            [{plain[0] * cipher[2] - plain[2] * cipher[0]} , {plain[2] * cipher[1] - plain[0] * cipher[3]}]]
            mod26 </p>)
        // result.push(<p> K =
        //     [[{mod(plain[3] * cipher[0] - plain[1] * cipher[2])} , {mod(plain[3] * cipher[1] - plain[1] * cipher[3])}],
        //     [{mod(plain[0] * cipher[2] - plain[2] * cipher[0])} , {mod(plain[2] * cipher[1] - plain[0] * cipher[3])}]]</p>)

        setPlain1("")
        setPlain2("")
        setCipher1("")
        setCipher2("")
        setResult(result)
    }

    return (
        <div className="container">
            <div className="left">
                <div>
                    <TextField id="standard-basic" label="[P1 P2]"
                               value={plain1}
                               onChange={e => setPlain1(e.target.value)}
                    />
                    <TextField id="standard-basic" label="[C1 C2]"
                               value={cipher1}
                               onChange={e => setCipher1(e.target.value)}
                    />
                    <TextField id="standard-basic" label="[P3 P4]"
                               value={plain2}
                               onChange={e => setPlain2(e.target.value)}
                    />
                    <TextField id="standard-basic" label="[C3 C4]"
                               value={cipher2}
                               onChange={e => setCipher2(e.target.value)}
                    />

                    <Button onClick={() => {
                        debugger
                        if (splitLength(plain2) && splitLength(cipher2) && splitLength(plain1) && splitLength(cipher1)) {
                            startSolving()
                        }
                    }}>Solve</Button>
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

export default HillCypherBreak;