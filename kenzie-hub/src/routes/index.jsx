import LogIn from "../components/LogIn"
import SignUp from "../components/SignUp"
import Dashboard from "../components/Dashboard"
import { useEffect, useState } from "react"
const { Switch, Route } = require("react-router")

const Routes = () =>{
    const [ authenticated, setAuthenticated ] = useState(false)
    useEffect(()=>{
        const token = localStorage.getItem('@KenzieHub:token')
        if(token){
            return setAuthenticated(true)
        }
        
    }, [authenticated])
    return(
        <Switch>
            <Route exact path='/'>
                <LogIn authenticated={authenticated} setAuthenticated={setAuthenticated} />
            </Route>
            <Route exact path='/signUp' >
                <SignUp   authenticated={authenticated} setAuthenticated={setAuthenticated}/>
            </Route>
            <Route exact path='/dashboard' >
                <Dashboard authenticated={authenticated} />
            </Route>
        </Switch>
    )
}
export default Routes