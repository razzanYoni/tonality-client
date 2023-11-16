import React from "react";
import { Card } from "./ui/card";
import "../styles/Albums.css";
import { useNavigate } from "react-router-dom";

interface AlbumCard {
    title: string;
    description: string;
    imageUrl: string;
}

const AlbumCard: React.FC<AlbumCard> = ({ title, description, imageUrl }) => {
  const navigate = useNavigate();

  const toDetail = () => {
    navigate('/1/songs');
  }
    return (
      <Card onClick={toDetail} style={{ width: "240px", height: "300px", backgroundColor: "#D9D9D9" }} className="album-card cursor-pointer border-none transition duration-300 ease-in-out transform hover:scale-105">
        <div className="image-container">
         <img src={imageUrl} alt={title} className="album-image" />
        </div>
        <div className="text-container text-left pl-6">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </Card>
    );
  };

export default AlbumCard;
