import React, { useState } from 'react';
import {FormState} from "@/types/premium-album-form.ts";

const initialFormState: FormState = {
  albumName: '',
  releaseDate: '',
  genre: '',
  artist: '',
  coverFile: null,
};

const EditAlbum: React.FC = () => {
  const [formData, setFormData] = useState<FormState>(initialFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setFormData((prevData) => ({ ...prevData, coverFile: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here, e.g., send data to server
    console.log('Form data submitted:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="albumName">Album Name:</label>
        <input
          type="text"
          id="albumName"
          name="albumName"
          value={formData.albumName}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="releaseDate">Release Date:</label>
        <input
          type="text"
          id="releaseDate"
          name="releaseDate"
          value={formData.releaseDate}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="genre">Genre:</label>
        <input
          type="text"
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="artist">Artist:</label>
        <input
          type="text"
          id="artist"
          name="artist"
          value={formData.artist}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="coverFile">Cover File:</label>
        <input
          type="file"
          id="coverFile"
          name="coverFile"
          onChange={handleFileChange}
          accept="image/*" // Specify the accepted file types, adjust as needed
          required
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default EditAlbum;
