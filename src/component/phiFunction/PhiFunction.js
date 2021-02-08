import React, {useState} from 'react';
import {Button, TextField} from "@material-ui/core";

function PhiFunction(props) {

    const [plain1, setPlain1] = useState("");
    const [result, setResult] = useState([])
    const startSolving = () => {
        let result = []
        let n = plain1;
        result.push(<p>Prime factors of {n}</p>)
        let primeFactors = []
        for(let i = 2; i<n;i++){
            let prime=true;
            for(let k = 2;k<i;k++){
                if(i%k===0){
                    prime = false
                    break
                }
            }
            if(prime)primeFactors.push(i)
        }
        primeFactors = primeFactors.filter(v=>n%v===0)
        result.push(primeFactors.map(v=><p>{v}</p>))
        result.push(<p>Phi({n}) = ({n}){primeFactors.map(p=>`*(1 - (1/${p}))`)}</p>)
        result.push(<p>Phi({n}) = ({n}){primeFactors.map(p=>`*((${p}-1)/${p})`)}</p>)
        result.push(<p>Phi({n}) = ({n}){primeFactors.map(p=>`*((${p-1})/${p})`)}</p>)
        let multiplied = primeFactors.reduce((prev,p)=>  [prev[0] * (p - 1), prev[1] * p],[1,1])
        result.push(<p>Phi({n}) = ({n})*({multiplied[0]}/{multiplied[1]})</p>)
        result.push(<p>Phi({n}) = ({(n*multiplied[0])/multiplied[1]})</p>)

        setPlain1("")
        setResult(result)
    }

    return (
        <div className="container">
            <div className="left">
                <div>
                    Phi(n)
                    <TextField id="standard-basic" label="n"
                               value={plain1}
                               onChange={e => setPlain1(e.target.value)}
                    />

                    <Button onClick={() => {

                            startSolving()

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

export default PhiFunction;