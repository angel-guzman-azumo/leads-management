import { useState } from "react";
import { Button } from "../Button/Button";
import { DotsThreeVerticalIcon } from "../../icons/DotsThreeVerticalIcon/DotsThreeVerticalIcon";
import { UserIcon } from "../../icons/UserIcon/UserIcon";
import { DeleteIcon } from "../../icons/DeleteIcon/DeleteIcon";
import { Lead } from "../../types/lead";
import { useDeleteLead } from "../../services/api";

export function Menu({ lead }: { lead: Lead }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <Button onClick={toggleMenu} variant="ghost" className="px-0">
        <DotsThreeVerticalIcon />
      </Button>
      {isOpen && (
        <div className="absolute left-11 top-0 w-menu h-menu rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div
            className="px-[9px] py-[7px] flex flex-col justify-between"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <Button iconRight={<UserIcon />}>Mark as contacted</Button>
            <DeleteButton lead={lead} onCompleted={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}

function DeleteButton({ lead, onCompleted }: { lead: Lead; onCompleted?: () => void }) {
  const deleteLeadMutation = useDeleteLead(lead._id);

  return (
    <Button
      iconRight={<DeleteIcon />}
      variant="ghost"
      className="text-deleteBtn"
      onClick={() => deleteLeadMutation.mutate(undefined, { onSettled: () => onCompleted?.() })}
      loading={deleteLeadMutation.isPending}
    >
      Delete
    </Button>
  );
}
