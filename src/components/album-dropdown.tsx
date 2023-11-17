import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {useNavigate, useParams} from 'react-router-dom';

export function AlbumDropdown() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { albumId } = useParams();

  console.log(dropdownOpen);

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const navigate = useNavigate();

  const handleEditAlbum = () => {
    console.log('Edit Album');
    setDropdownOpen(false);
    navigate(`/${albumId}/edit-album`);
  }

  const handleDeleteAlbum = () => {
    console.log('Delete Album');
    setDropdownOpen(false);
    navigate(`/${albumId}/delete-album`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" onClick={toggleDropdown} className='bg-zinc-800 border-none text-white rounded h-3 pb-5'>
          ...
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 text-white bg-black border-grey-200" style={{ position: 'absolute', right: -20 }}>
        <DropdownMenuItem onClick={handleEditAlbum} className='hover:bg-zinc-800'>
          Edit Album
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteAlbum}>
          Delete Album
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
