import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderComponents: React.FC = () => {
    const navigate = useNavigate();
    return(
        <nav style={{display: "flex", justifyContent: "space-between"}}>
            <span onClick={() => navigate("/")}>Dashboard</span>
            <span onClick={() => navigate("/maps")}>Mapa</span>
            <span onClick={() => navigate("/alerts")}>Lista de Alertas</span>
        </nav>
    )
}

export default HeaderComponents;