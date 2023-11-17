import React from "react";
import { Card } from "./ui/card";
import "../styles/Albums.css";
import {useNavigate} from "react-router-dom";
import {restUrl} from "@/api/api.ts";
import {PremiumAlbum} from "@/types/premium-album.ts";


const AlbumCard: React.FC<PremiumAlbum> = ({ albumId, albumName, artist, coverFilename }) => {
    const navigate = useNavigate();
    return (
        <Card onClick={() => navigate(`/${albumId}/songs`, {replace : true})} style={{ width: "200px", height: "250px", backgroundColor: "#D9D9D9" }} className="album-card cursor-pointer border-none transition duration-300 ease-in-out transform hover:scale-105">
          <div className="image-container">
           <img src={restUrl + coverFilename} alt={albumName} className="album-image" />
          </div>
          <div className="text-container text-left pl-6">
            <h3 className="text-white">{albumName}</h3>
            <p className="text-white">{artist}</p>
          </div>
        </Card>
    );
  };

export default AlbumCard;
