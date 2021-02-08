import React, {useState} from 'react';
import GcdInput from "./input/GcdInput";
import "./Gcd.scss";
import GcdOutput from "./output/GcdOutput";

function Gcd(props) {
    const [one, setOne] = useState(null);
    const [two, setTwo] = useState(null);
    const [result, setResult] = useState(null);

    const computeGcd = () => {
        if (one && two) {
            let c1 = [one, two], c2 = [0], c3 = [0, 1];
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
            setResult({
                c1, c2, c3
            })
        }


    }
    return (
        <div className="container">
            <div className="left">
                <GcdInput {...{setOne, setTwo, computeGcd}}/>
            </div>
            <div className="right">
                <GcdOutput result={result}/>
            </div>
        </div>
    );
}

export default Gcd;