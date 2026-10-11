import { useState } from "react";

import { MoreVertical, Clipboard } from "lucide-react";

import { ClientRecord } from "@/types/records";

import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { toastSuccess } from "@/components/ui/toaster";

export const ActionsCell = ({ client }: { client: ClientRecord }) => {
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleCopyId = () => {
    navigator.clipboard.writeText(client.id);
    toastSuccess("Đã sao chép ID", "Mã khách hàng đã được lưu vào clipboard.");
    setOpenDropdown(false);
  };

  return (
    <DropdownMenu open={openDropdown} onOpenChange={setOpenDropdown}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreVertical className="size-4 text-muted-foreground" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleCopyId}>
          <Clipboard className="size-4" />
          <span>Copy ID</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
