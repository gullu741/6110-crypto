import React from 'react';
import "./GcdOutput.scss"
function GcdOutput({result}) {
    const mod = (n,k=26)=>((n % k) + k) % k;


    if(result){
        let {c1,c2,c3} = result;

        return (
            <div className="gcdOutputContainer">
                <table>
                    <tbody>
                    {
                        c1.map((c,i)=>{
                            return <tr>
                                <td>{c}</td>
                                <td>{c2[i]||0}</td>
                                <td>{c3[i]||0}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
                <div>
                    <p>{c1[1]}^-1 mod({c1[0]}) = {mod(c3[c3.length-1],c1[0])}</p>
                </div>
            </div>
        );
    }else{
        return null
    }

}

export default GcdOutput;