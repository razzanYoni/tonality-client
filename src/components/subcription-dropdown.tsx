import {DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu.tsx";
import { Button } from "@/components/ui/button.tsx";

export function SubscriptionDropdown({handler}: {handler: (accept: boolean) => void}) {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className='bg-zinc-800 border-none text-white rounded h-3 pb-5'>
          ...
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 text-white bg-black border-gray-200" style={{ position: 'absolute', left: -20 }}>
        <DropdownMenuItem onClick={() => handler(true)} className='hover:bg-zinc-800'>
          Accept
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handler(false)}>
          Reject
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}