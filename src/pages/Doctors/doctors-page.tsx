import PageHeading from "@/components/page-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import DoctorModal from "./components/doctor-modal";

type Props = {};

export default function DoctorsPage({}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  function handleOpen() {
    setIsOpen(true);
  }
  function handleClose() {
    setIsOpen(false);
  }
  return (
    <main>
      <DoctorModal isOpen={isOpen} onClose={handleClose} />
      <div className="max-w-screen-2xl p-4 md:p-10">
        <div className="flex justify-between items-center mb-10">
          <PageHeading title="Doctors" />
          <Input
            type="search"
            className="w-1/2"
            placeholder="Search..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          />
          <Button
            className="flex justify-between items-center gap-2"
            variant={"main"}
            onClick={handleOpen}
          >
            <Plus /> Doctor
          </Button>
        </div>
      </div>
    </main>
  );
}
