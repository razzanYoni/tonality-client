import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {useNavigate, useParams} from 'react-router-dom';

export function SongDropdown({songId} : {songId : number}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { albumId } = useParams();

  console.log(dropdownOpen);

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const navigate = useNavigate();

  const toEditSong = () => {
    navigate(`/${albumId}/edit-song/${songId}`);
  }

  const handleDeleteSong = () => {
    console.log('Delete Song');
    setDropdownOpen(false);
    navigate(`/${albumId}/delete-song/${songId}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" onClick={toggleDropdown} className='bg-zinc-800 border-none text-white rounded h-3 pb-5'>
          ...
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 text-white bg-black border-gray-200" style={{ position: 'absolute', left: -20 }}>
        <DropdownMenuItem onClick={toEditSong} className='hover:bg-zinc-800'>
          Edit Song
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDeleteSong}>
          Delete Song
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
