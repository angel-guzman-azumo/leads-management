import { useState } from "react";
import { Button } from "../Button/Button";
import { DotsThreeVerticalIcon } from "../../icons/DotsThreeVerticalIcon/DotsThreeVerticalIcon";
import { UserIcon } from "../../icons/UserIcon/UserIcon";
import { DeleteIcon } from "../../icons/DeleteIcon/DeleteIcon";

export function Menu() {
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
            <Button iconRight={<DeleteIcon />} variant="ghost" className="text-deleteBtn">
              Delete
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
