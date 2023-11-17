import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { SongDropdown } from "./songs-dropdown";

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

export function TableSongs({data}: { data: PremiumSong[] } ) {
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
                            <SongDropdown/>
                        </TableCell>
                    </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}
