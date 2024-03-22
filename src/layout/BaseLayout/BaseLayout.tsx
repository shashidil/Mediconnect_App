import {Outlet} from "react-router-dom";

export const BaseLayout = () => {
    return (<>
        <div style={{width: "100%", height: "100%", color: "black"}}></div>

        
        <Outlet></Outlet>

    </>);
}