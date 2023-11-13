import React from 'react';
// import { useParams } from 'react-router-dom';
import cover from '../assets/images/default-cover.jpg'
import { TableSongs } from '@/components/songs-table';

const SongsPage: React.FC = () => {
//   const { albumId } = useParams<{ albumId: string }>();

  const songs = [
    { id: 1, title: 'Song 1', duration: 150 },
    { id: 2, title: 'Song 2', duration: 255 },
    { id: 3, title: 'Song 3', duration: 165 },
    { id: 4, title: 'Song 4', duration: 300 },
    { id: 5, title: 'Song 5', duration: 190 },
    { id: 6, title: 'Song 6', duration: 280 },
    { id: 7, title: 'Song 7', duration: 200 },
    { id: 8, title: 'Song 8', duration: 240 },
    { id: 9, title: 'Song 9', duration: 232 },
    { id: 10, title: 'Song 10', duration: 150 },
  ];

  const calculateTotalDuration = (songsArray: Array<{ duration: number }>): string => {
    const totalSeconds = songsArray.reduce((total, song) => total + song.duration, 0);
    const totalMinutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;

    const formattedMinutes = String(totalMinutes);
    const formattedSeconds = remainingSeconds < 10 ? String(remainingSeconds) : String(remainingSeconds).padStart(2, '0');

    if (remainingSeconds == 0) {
        return `${formattedMinutes} minutes`;
    } else {
        return `${formattedMinutes} minutes ${formattedSeconds} seconds`;
    }
  };

  const totalDuration = calculateTotalDuration(songs);

  const countSong = songs.length;

  return (
    <div className='mt-2 w-800 flex flex-col items-center '>
        <div className='flex items-end w-[760px]'>
            <img src={cover} alt="" className="w-[270px]"/>
            <div className='text-white text-left ml-5'>
                <div className='text-5xl'>Title</div>
                <div>Singer</div>
                <div>Year</div>
                <div>{countSong} songs</div>
                <div>{totalDuration}</div>
            </div>
            <div>
                // dsini
            </div>
        </div>
        <div className='mt-[10px] mb-[80px] justify-start w-[900px]'>
            <button className="bg-white hover:bg-gray-300 mt-[30px] mb-[30px] px-4 py-2 rounded absolute right-64">
            Add Song
            </button>
        </div>
        <div>
            <TableSongs data={songs} />
        </div>
    </div>
  );
};

export default SongsPage;
