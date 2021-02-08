import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";

function SquareAndMultiply(props) {

    const [A, setA] = useState(0);
    const [B, setB] = useState(0);
    const [C, setC] = useState(0);

    const [result, setResult] = useState([])
    const between = (num) => (num >= 0 && num <= 25)
    const mod = (n, k=26) => {
        return ((n % k) + k) % k;
    };
    const dec2bin = (dec)=>{
        return (dec >>> 0).toString(2);
    }
    const startDecryption = () => {
        let result = []
        debugger
        let binary = dec2bin(B)
        result.push(<p>{B} = {binary} in binary</p>)
        let numbers = binary.split("").reverse().map((v,i)=>parseInt(v)*Math.pow(2,i)).filter(v=>v);
        result.push(<p>{B} = {numbers.map((v,i)=>`${v}${i===numbers.length-1?"":"+"}`)}</p>)
        result.push(<p>{A}^{B} mod{C} = {numbers.map((v,i)=>`${A}^(${v})${i===numbers.length-1?"":"*"}`)} mod {C}</p>)
        result.push([...new Array(22)].map((v,i)=><p>{A}^{i} mod{C} = {mod(Math.pow(A,i),C)} </p>))
        result.push(<p>{A}^{B} mod{C} = {numbers.map((v,i)=>`${mod(Math.pow(A,i),C)}${i===numbers.length-1?"":"*"}`)} mod {C}</p>)
        result.push(<p>{A}^{B} mod{C} = {numbers.reduce((prev,v,i)=>mod(prev*Math.pow(A,v),C),1)}</p>)


        setA(0)
        setB(0)
        setC(0)
        setResult(result)
    }



    return (
        <div className="container">
            <div className="left">
                <h1>A^(B)mod C</h1>
                <div>
                    <TextField id="standard-basic" label="A"
                               type="number"
                               value={A}
                               onChange={e => setA(parseInt(e.target.value))}
                    />
                    ^
                    <TextField id="standard-basic" label="B"
                               type="number"
                               value={B}
                               onChange={e => setB(parseInt(e.target.value))}
                    />
                    mod(
                    <TextField id="standard-basic" label="C"
                               type="number"
                               value={C}
                               onChange={e => setC(parseInt(e.target.value))}
                    />)

                    <Button onClick={() => {
                            startDecryption()
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

export default SquareAndMultiply;