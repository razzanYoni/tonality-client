import React from "react";
import { Card } from "./ui/card";
import "../styles/Albums.css";

interface AlbumCard {
    title: string;
    description: string;
    imageUrl: string;
}

const AlbumCard: React.FC<AlbumCard> = ({ title, description, imageUrl }) => {
    return (
      <Card style={{ width: "240px", height: "300px", backgroundColor: "#D9D9D9" }} className="album-card cursor-pointer">
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
