import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";
import {brown} from "@material-ui/core/colors";

function CRT(props) {
    const [count, setCount] = useState(2);
    const [a, setA] = useState([]);
    const [b, setB] = useState([]);
    const [c, setC] = useState(0);
    const [result, setResult] = useState([])
    const mod = (n, k=26) => {
        return ((n % k) + k) % k;
    };
    const startSolving = () => {
        let result = []
        let n = 0;
        result.push(a.map((v,i)=><p>X = {v} mod {b[i]}</p>))
        result.push(<p>X = [
            {a.map((av,i)=>`(${av})* (${b.reduce((p,c,bi)=>p*(bi!==i?c:1),1)})*(${b.reduce((p,c,bi)=>p*(bi!==i?c:1),1)} ^-1 mod ${b[i]}) + `)}] mod {c} </p>)
        result.push(<p>X = [
            {a.map((av,i)=>`(${av*b.reduce((p,c,bi)=>p*(bi!==i?c:1),1)})*(${b.reduce((p,c,bi)=>p*(bi!==i?c:1),1)} ^-1 mod ${b[i]}) + `)}] mod {c} </p>)
        result.push(<p>X = [
            {a.map((av,i)=>`(${av*b.reduce((p,c,bi)=>p*(bi!==i?c:1),1)})*(${mod(b.reduce((p,c,bi)=>p*(bi!==i?c:1),1),b[i])} ^-1 mod ${b[i]}) + `)}] mod {c} </p>)
        let modInv = a.map((av,i)=>mod(b.reduce((p,c,bi)=>p*(bi!==i?c:1),1),b[i]))
        let finalModInverse = []
        modInv.forEach((mi,index)=>{
            result.push(<br/>)
            let c1 = [b[index], mi], c2 = [0], c3 = [0, 1];
            let ii = 0;
            while (true) {
                let div = Math.floor(c1[ii] / c1[ii + 1])
                let remainder = c1[ii] % c1[ii + 1]
                c2.push(div)
                c1.push(remainder)
                if (remainder === 0) {
                    break
                }
                ii++;
            }

            for (let ii = 2; ii < c2.length; ii++) {
                c3.push(c3[ii - 2] - (c2[ii - 1] * c3[ii - 1]))
            }
            result.push(<p>----------------------</p>)
            result.push(c1.map((c,i)=>{
                return <tr>
                    <td>{c}</td>
                    <td>{c2[i]||0}</td>
                    <td>{c3[i]||0}</td>
                </tr>
            }))
            finalModInverse[index] = mod(c3[c3.length-1],b[index])
        })
        result.push(<p>X = [
            {a.map((av,i)=>`(${av*b.reduce((p,c,bi)=>p*(bi!==i?c:1),1)})*(${finalModInverse[i]} mod ${b[i]}) + `)}] mod {c} </p>)

        setResult(result)
    }

    return (
        <div className="container">
            <div className="left">
                <div>
                    X = A modB
                    <br/>
                    <TextField id="standard-basic" label="Count"
                               value={count}
                               type="number"
                               onChange={e => setCount(parseInt(e.target.value) || 0)}
                    />
                    {[...Array(count)].map((v, i) => <div style={{marginTop: "10px",
                    marginBottom:"10px"}}>
                        X = <TextField id="standard-basic" label="A"
                                       value={a[i]}
                                       onChange={e => setA(prev => {
                                           prev[i] = parseInt(e.target.value) || 0
                                           return [...prev]
                                       })}
                    /> mod <TextField id="standard-basic" label="B"
                                      value={b[i]}
                                      onChange={e => setB(prev => {
                                          prev[i] = parseInt(e.target.value)||0
                                          return [...prev]
                                      })}
                    /></div>)}
                    X = ? mod <TextField id="standard-basic" label="C"
                                         value={c}
                                         onChange={e => setC(parseInt(e.target.value) || 0)}
                /></div>
                <Button onClick={() => {

                    startSolving()

                }}>Solve</Button>
            </div>

            <div className="right">
                <div className={"affineOutputContainer"}>
                    {result}
                </div>
            </div>
        </div>
    );
}

export default CRT;