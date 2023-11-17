import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { SongDropdown } from "./songs-dropdown";
import {useNavigate} from "react-router-dom";
import {PremiumSong} from "@/types/premium-song.ts";

export function TableSongs({data}: { data: PremiumSong[] } ) {
  const navigate = useNavigate();
  const formatDuration = (seconds: number): string => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;

      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(remainingSeconds).padStart(2, '0');

      return `${formattedMinutes}:${formattedSeconds}`;
    };

    return (
        <Table className="text-white ml-20 w-[790px] border">
            <TableHeader>
                <TableRow className="hover:bg-transparent">
                <TableHead className="w-[10px]">#</TableHead>
                <TableHead className="w-[700px]">Title</TableHead>
                <TableHead className="w-[70px]">Duration</TableHead>
                <TableHead className="w-[10px]"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="text-left">
                {data.map((song, index) => (
                    <TableRow key={song.songId} className="hover:bg-transparent">
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{song.title}</TableCell>
                        <TableCell>{formatDuration(song.duration)}</TableCell>
                        <TableCell className="">
                            <SongDropdown handler={(edit) => {
                              if (edit) {
                                navigate(`/${song.albumId}/edit-song/${song.songId}`);
                              } else {
                                navigate(`/${song.albumId}/delete-song/${song.songId}`);
                              }
                            }}/>
                        </TableCell>
                    </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}
