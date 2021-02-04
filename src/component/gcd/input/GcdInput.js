import React from 'react';
import {Button, TextField} from "@material-ui/core";

import "./GcdInput.scss"

function GcdInput({setOne,setTwo,computeGcd}) {
    return (
        <div className={"gcdInputContainer"}>
            <h1>GCD</h1>
            <h2>gcd(first,second)</h2>
            <TextField className="input" label={"One"}
                       type={"number"}
                       onChange={e=>setOne(parseInt(e.target.value))}

            />
            <TextField className="input" label={"Two"}
                       type={"number"}
                       onChange={e=>setTwo(parseInt(e.target.value))}
            />
            <Button className="input"
                    variant="contained"
                    color="primary"
                    onClick={computeGcd}
            >
                Primary
            </Button>
        </div>
    );
}

export default GcdInput;