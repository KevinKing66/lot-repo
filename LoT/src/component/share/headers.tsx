import React from "react";
import { useNavigate } from "react-router-dom";

const HeaderComponents: React.FC = () => {
    const navigate = useNavigate();
    return (
        <nav className=" bg-gray-600 text-white px-6 py-4  mb-4 shadow-md space-x-6 text-lg font-semibold">
            <div  className="flex justify-between items-center">
                <span onClick={() => navigate("/")} className="cursor-pointer hover:text-blue-400 transition-colors">Dashboard</span>
                <span onClick={() => navigate("/maps")} className="cursor-pointer hover:text-blue-400 transition-colors">Mapa</span>
                <span onClick={() => navigate("/alerts")} className="cursor-pointer hover:text-blue-400 transition-colors">Lista de Alertas</span>
            </div >
        </nav>
    )
}

export default HeaderComponents;