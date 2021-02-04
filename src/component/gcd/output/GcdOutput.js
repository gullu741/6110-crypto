import React from 'react';
import "./GcdOutput.scss"
function GcdOutput({result}) {
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
            </div>
        );
    }else{
        return null
    }

}

export default GcdOutput;