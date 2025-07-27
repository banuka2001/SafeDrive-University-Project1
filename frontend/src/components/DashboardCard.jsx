
import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/DashboardCard.css';

export default function DashboardCard({title,route,image,color}){
    const navigate = useNavigate();

    return(
        <div
        className="dashboard-card-card"
            onClick={() => navigate(route)}
            style={ {backgroundColor: color }}>
                <img src={image} alt={title} className="dashboard-card-image" />
                <div className="dashboard-card-title">{title}</div>
            </div>
    );
}