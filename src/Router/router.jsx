import { Route, Routes } from "react-router"
import HomePage from "../components/homePage"

const Router = ()=>{
    return(
        <>
        <Routes>
            <Route exact path="/" element={<HomePage/>}></Route>
        </Routes>
        </>
    )
}

export default Router