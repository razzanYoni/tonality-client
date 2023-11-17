import React from "react";
import { Card } from "./ui/card";
import "../styles/Albums.css";
import {useNavigate} from "react-router-dom";

interface AlbumCard {
  albumId: number;
  albumName: string;
  releaseDate: Date;
  genre: string;
  artist: string;
  coverFilename: string;
}

const staticFileUrl = import.meta.env.VITE_REST_STATIC_URL;

const AlbumCard: React.FC<AlbumCard> = ({ albumId, albumName, artist, coverFilename }) => {
    const navigate = useNavigate();
    return (
        <Card onClick={() => navigate(`/${albumId}/songs`, {replace : true})} style={{ width: "200px", height: "250px", backgroundColor: "#D9D9D9" }} className="album-card cursor-pointer border-none transition duration-300 ease-in-out transform hover:scale-105">
          <div className="image-container">
           <img src={staticFileUrl + coverFilename} alt={albumName} className="album-image" />
          </div>
          <div className="text-container text-left pl-6">
            <h3>{albumName}</h3>
            <p>{artist}</p>
          </div>
        </Card>
    );
  };

export default AlbumCard;
