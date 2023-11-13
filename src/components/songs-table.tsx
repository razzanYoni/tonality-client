import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";

interface TableSongsProps {
    data: Array<{ id: number; title: string; duration: number }>;
  }

export function TableSongs( { data }: TableSongsProps ) {
    const formatDuration = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        return `${formattedMinutes}:${formattedSeconds}`;
      };

    return (
        <Table className="text-white ml-20">
            <TableHeader>
                <TableRow>
                <TableHead className="w-[10px]">#</TableHead>
                <TableHead className="w-[800px]">Title</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead className="text-right"></TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="text-left">
                {data.map((song, index) => (
                    <TableRow key={song.id}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{song.title}</TableCell>
                        <TableCell>{formatDuration(song.duration)}</TableCell>
                        <TableCell className="text-right"></TableCell>
                    </TableRow>
            ))}
        </TableBody>
        </Table>
    )
}
