import React from "react";
import { Card } from "./ui/card";
import "../styles/Albums.css";
import { useNavigate } from "react-router-dom";

interface AlbumCard {
  albumId: number;
  albumName: string;
  releaseDate: Date;
  genre: string;
  artist: string;
  coverFilename: string;
}

const AlbumCard: React.FC<AlbumCard> = ({ albumName, artist, coverFilename }) => {
  const navigate = useNavigate();

  const toDetail = () => {
    navigate('/1/songs');
  }
    return (
      <Card onClick={toDetail} style={{ width: "240px", height: "300px", backgroundColor: "#D9D9D9" }} className="album-card cursor-pointer border-none transition duration-300 ease-in-out transform hover:scale-105">
        <div className="image-container">
         <img src={coverFilename} alt={albumName} className="album-image" />
        </div>
        <div className="text-container text-left pl-6">
          <h3>{albumName}</h3>
          <p>{artist}</p>
        </div>
      </Card>
    );
  };

export default AlbumCard;
