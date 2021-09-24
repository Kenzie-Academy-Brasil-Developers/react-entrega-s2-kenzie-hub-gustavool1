import LogIn from "../components/LogIn"
import SignIn from "../components/SignIn"

const { Switch, Route } = require("react-router")

const Routes = () =>{
    return(
        <Switch>
            <Route exact path='/'>
                <LogIn/>
            </Route>
            <Route exact path='/sigIn'>
                <SignIn/>
            </Route>
            <Route exact path='/logged'>
                Logado
            </Route>
        </Switch>
    )
}
export default Routes