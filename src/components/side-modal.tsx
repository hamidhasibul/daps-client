import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ReactNode } from "react";

type Props = {
  title: string;
  description: string;
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
};

function SideModal({ title, description, children, isOpen, onClose }: Props) {
  function onChange(open: boolean) {
    if (!open) {
      onClose();
    }
  }
  return (
    <>
      <Sheet open={isOpen} onOpenChange={onChange}>
        <SheetContent className="sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <div className="">{children}</div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default SideModal;
