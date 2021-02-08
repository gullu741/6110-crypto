import './App.css';
import Gcd from "./component/gcd/Gcd";
import CeasaarCypher from "./component/ceasarCipher/CeasaarCypher";
import ShiftCypher from "./component/shiftCypher/ShiftCypher";
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import HillCypher from "./component/hillCypher/HillCypher";
import AffineCypherBreak from "./component/affineCypher/AffineCypherBreak";
import HillCypherBreak from "./component/hillCypherBreak/HillCypherBreak";
import SquareAndMultiply from "./component/squareAndMultiply/SquareAndMultiply";
import PhiFunction from "./component/phiFunction/PhiFunction";
import CRT from "./component/CRT/CRT";

function App() {
    return (
        <BrowserRouter basename={`${process.env.REACT_APP_BASE_PATH}`}>
            <div className={"app"}>
                <div className={"sidenav"}>
                    <ul>
                        <tr><Link to={"/"}>GCD</Link></tr>
                        <tr><Link to={"/affine"}>Affine</Link></tr>
                        <tr><Link to={"/cesar"}>Cesar</Link></tr>
                        <tr><Link to={"/shift"}>Shift</Link></tr>
                        <tr><Link to={"/hill"}>Hill</Link></tr>
                        <tr><Link to={"/hillBreak"}>Hill Break</Link></tr>
                        <tr><Link to={"/squareAndMultiply"}>Square and Multiply</Link></tr>
                        <tr><Link to={"/phiFunction"}>Phi Function</Link></tr>
                        <tr><Link to={"/crt"}>CRT</Link></tr>
                    </ul>
                </div>
                <Switch>
                    <Route path={"/affine"} component={AffineCypherBreak}/>
                    <Route path={"/cesar"} component={CeasaarCypher}/>
                    <Route path={"/shift"} component={ShiftCypher}/>
                    <Route path={"/hill"} component={HillCypher}/>
                    <Route path={"/hillBreak"} component={HillCypherBreak}/>
                    <Route path={"/squareAndMultiply"} component={SquareAndMultiply}/>
                    <Route path={"/phiFunction"} component={PhiFunction}/>
                    <Route path={"/crt"} component={CRT}/>
                    <Route path={"/"} component={Gcd}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
