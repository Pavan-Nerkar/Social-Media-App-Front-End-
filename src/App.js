import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import "./App.css";
import Authentication from "./pages/Authentication/Authentication";
import HomePage from "./pages/HomePage/HomePage";
import Message from "./pages/Message/MessagePage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfileAction } from "./Redux/Auth/auth.action";
import Reels from "./Components/Reels/Reels";
import { ThemeProvider } from "@mui/material";
import { darTheme } from "./theam/DarkTheme";


function App() {
  const {auth} = useSelector(store=>store);
  const dispatch=useDispatch();
  const jwt = localStorage.getItem("jwt"); 


  useEffect(() => {
  if (jwt) {
    dispatch(getProfileAction(jwt));
  }
}, [jwt]); // ✅ dependency array prevents infinite loop

  return (
     <BrowserRouter>
      <ThemeProvider theme={darTheme} className="App">
        <Routes>
         
          <Route path="/home/*" element={auth.user?<HomePage/>:<Authentication />} />
          <Route path="/home/message" element={<Message />} />
          {/* <Route path="/reels" element={<Reels />} /> */}
           <Route path="/*" element={<Authentication />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
