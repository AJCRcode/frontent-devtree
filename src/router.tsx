import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import RegisterView from "./views/RegisterView";
import AuthLayyout from "./layouts/AuthLayyout";

export default function Router() {

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthLayyout/>}>
                    <Route path="/auth/login" element={<LoginView/>}/>
                    <Route path="/auth/register" element={<RegisterView/>}/>         
                </Route>

            </Routes>
        </BrowserRouter>
    );
}