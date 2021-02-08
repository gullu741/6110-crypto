import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import "./AffineCypher.scss"

function AffineCypherBreak(props) {

    const [plain1, setPlain1] = useState("");
    const [plain2, setPlain2] = useState("");
    const [cipher1, setCipher1] = useState("");
    const [cipher2, setCipher2] = useState("");
    const [solve,setSolve] = useState(false)
    const [result,setResult] = useState([])
    const between = (num)=>(num>=0&&num<=25)
    const mod = (n,k)=> {
        return ((n%k)+k)%k;
    };
    const startSolving = ()=>{
        debugger
        let result=[]
        let ci3 = cipher1-cipher2;
        let p3 = plain1-plain2
        result.push(<p>{cipher1} = {plain1}a+b mod26</p>)
        result.push(<p>{cipher2} = {plain2}a+b mod26</p>)
        result.push(<p>--------------------</p>)
        result.push(<p>{ci3} = {p3}a+b mod26</p>)
        result.push(<p>--------------------</p>)
        result.push(<p>a = {ci3} ({p3})^-1 mod26</p>)
        p3 = mod(p3,26)
        result.push(<p>a = {ci3} ({p3})^-1 mod26</p>)

        let c1 = [26, mod(p3,26)], c2 = [0], c3 = [0, 1];
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
        result.push(c1.map((c,i)=>{
            return <tr>
                <td>{c}</td>
                <td>{c2[i]||0}</td>
                <td>{c3[i]||0}</td>
            </tr>
        }))
        let k = c3[c3.length-1]
        result.push(<p>a^-1 = {k}</p>)
        k = mod(k,26)
        result.push(<p>a^-1 = {k}</p>)
        result.push(<p>a = {ci3} * {k} mod26</p>)
        result.push(<p>a = {ci3 *k} mod26</p>)
        result.push(<p>a = {mod(ci3 *k,26)}</p>)
        let a = mod(ci3 *k,26)
        result.push(<h3>Solve for b</h3>)
        result.push(<p>{cipher1} = {plain1}*{a}+b mod26</p>)
        result.push(<p>{cipher1} = {plain1*a}+b mod26</p>)
        result.push(<p>{cipher1} = {mod(plain1*a,26)}+b mod26</p>)
        let b = mod((26+cipher1)-mod(plain1*a,26),26)
        result.push(<p>({plain1},{plain2})--->({cipher1},{cipher2})</p>)
        result.push(<p>b = {b}</p>)
        result.push(<p>a = {a}</p>)

        setPlain1(0)
        setPlain2(0)
        setCipher1(0)
        setCipher2(0)
        setResult(result)
        setSolve(true)
    }

    return (
        <div className="container">
            <div className="left">
                <div>
                    <TextField id="standard-basic" label="P1"
                               value={plain1}
                               onChange={e=>setPlain1(parseInt(e.target.value))}
                    />
                    <TextField id="standard-basic" label="C1"
                               type="number"
                               value={cipher1}
                               onChange={e=>setCipher1(parseInt(e.target.value))}
                    />
                    <TextField id="standard-basic" label="P2"
                               value={plain2}
                               onChange={e=>setPlain2(parseInt(e.target.value))}
                    />
                    <TextField id="standard-basic" label="C2"
                               type="number"
                               value={cipher2}
                               onChange={e=>setCipher2(parseInt(e.target.value))}
                    />

                    <Button onClick={()=>{
                        if(between(plain2)&&between(cipher2)&&between(plain1)&&between(cipher2)){
                            startSolving()
                        }
                    }}>Solve</Button>
                </div>
            </div>
            <div className="right">
                {solve&&<div className={"affineOutputContainer"}>
                    {result}
                </div>}
            </div>
        </div>
    );
}

export default AffineCypherBreak;