import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderComponents: React.FC = () => {
    const navigate = useNavigate();
    return(
        <nav style={{display: "flex", justifyContent: "space-between"}}>
            <span onClick={() => navigate("/")}>LoT</span>
            <span onClick={() => navigate("/maps")}>Mapa</span>
        </nav>
    )
}

export default HeaderComponents;