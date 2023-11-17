import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";

export function SongDropdown({handler} : {handler: (edit : boolean) => void}) {


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className='bg-zinc-800 border-none text-white rounded h-3 pb-5'>
          ...
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 text-white bg-black border-gray-200" style={{ position: 'absolute', left: -20 }}>
        <DropdownMenuItem onClick={() => handler(true)} className='hover:bg-zinc-800'>
          Edit Song
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handler(false)}>
          Delete Song
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
