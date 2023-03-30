import { Routes, Route } from "react-router-dom";
import Admin from "./components/admin";
import Loginpage from "./components/adminlogin";
import StatusAdmin from "./components/adminstatus";
import AdminSuggestion from "./components/adminsuggest";
import BookAdd from "./components/bookadd";
import BookSearch from "./components/booksearch";
import Home from "./components/home";
import Order from "./components/order";
import Profile from "./components/profile";
import Register from "./components/register";
import RequireAuthAdmin from "./components/require.auth(admin)";
import RequireAuth from "./components/require_auth";
import Status from "./components/status";
import Student from "./components/student";
import { StudentAuth } from "./components/StudentAuthProvider";
import StudentLogin from "./components/studentlogin";
import Suggestion from "./components/suggestion";

function App(){
    return(
        <StudentAuth>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/studentlogin" element={<StudentLogin/>}/>
                <Route path="/register" element={<Register/>}/>
                <Route path="/studentprofile" element={<RequireAuth><Profile/></RequireAuth>}/>
                <Route path="/student" element={<RequireAuth><Student/></RequireAuth>}>
                    <Route index element={<RequireAuth><BookSearch/></RequireAuth>}/>
                    <Route path="status" element={<RequireAuth><Status/></RequireAuth>}/>
                    <Route path="suggestion" element={<RequireAuth><Suggestion/></RequireAuth>}/>
                    <Route path="order" element={<RequireAuth><Order/></RequireAuth>}/>
                </Route>
                <Route path="/adminlogin" element={<Loginpage/>}/>
                <Route path="/admin" element={<RequireAuthAdmin><Admin/></RequireAuthAdmin>}>
                    <Route index element={<BookAdd/>}/>
                    <Route path="status" element={<StatusAdmin/>}/>
                    <Route path="suggestion" element={<AdminSuggestion/>}/>
                </Route>
            </Routes>
        </StudentAuth>
    );
}

export default App;