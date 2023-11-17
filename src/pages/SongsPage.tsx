import { useEffect, useState } from 'react';
import cover from '../assets/images/default-cover.jpg'
import { TableSongs } from '@/components/songs-table';
import { AlbumDropdown } from '@/components/album-dropdown';
import { useNavigate, useParams } from 'react-router-dom';
import api from "@/api/api.ts";

interface PremiumSong {
  songId: number;
  albumId: number;
  title: string;
  artist: string;
  songNumber: number;
  discNumber:number;
  duration:number;
  audioFilename: string;
}

const SongsPage = () => {
  const { albumId } = useParams<{ albumId: string }>();
  const [songsData, setSongsData] = useState<PremiumSong[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(
          `/premium-album/${albumId}`);
        console.log(response);

        setSongsData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(true)
      }
    };

    fetchData();
  }, []);

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

  const totalDuration = calculateTotalDuration(songsData);

  const countSong = songsData.length;

  const navigate = useNavigate();

  const toAddSong = () => {
    navigate('/1/add-song');
  }
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
            <div className='absolute right-64 top-7'>
                <AlbumDropdown/>
            </div>
        </div>
        <div className='mt-[10px] mb-[80px] justify-start w-[900px]'>
            <button onClick={toAddSong} className="bg-white hover:bg-gray-300 mt-[30px] mb-[30px] px-4 py-2 rounded absolute right-64">
            Add Song
            </button>
        </div>
        <div>
          {
            loading ? <div className="text-white">Loading . . .</div> : <TableSongs data={songsData} />
          }
        </div>
    </div>
  );
};

export default SongsPage;
