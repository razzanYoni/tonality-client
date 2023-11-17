import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {SubscriptionDropdown} from "@/components/subcription-dropdown.tsx";
import api from "@/api/api.ts";
import {Subscription} from "@/types/subscription.ts";

export function SubscriptionTable({data}: { data: Subscription[] }) {
  return (
    <Table className="text-white ml-20 w-[790px] border">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-[500px]">Album Name</TableHead>
          <TableHead className="w-[500px]">Artist</TableHead>
          <TableHead className="w-[500px]">Username</TableHead>
          <TableHead className="w-[500px]">Status</TableHead>
          <TableHead className="w-[10px]"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="text-left">
        {data.map((subscription: Subscription, index) => (
          <TableRow key={index} className="hover:bg-transparent">
            <TableCell>{subscription.albumName}</TableCell>
            <TableCell>{subscription.artist}</TableCell>
            <TableCell>{subscription.username}</TableCell>
            <TableCell>{subscription.status}</TableCell>
            <TableCell>{subscription.status == "PENDING"
              ? <SubscriptionDropdown handler={(accept) => {
                api.post(
                  "/subscription",
                  {
                      userId: subscription.userId,
                      premiumAlbumId: subscription.premiumAlbumId,
                      status: accept ? "ACTIVE" : "REJECTED"
                    },
                )
            }}/> : null}</TableCell>
          </TableRow>
        ))}
      </TableBody>

    </Table>
  )
}