import { Outlet } from "react-router-dom";
import './Login/scss/style.scss'



const FullLayout = () => {
  return (
    <div id="loginwrap">
        <div id="right">
            <div className="right">
                <Outlet/>
            </div>
        </div>
    </div>
  );
};



export default FullLayout;
