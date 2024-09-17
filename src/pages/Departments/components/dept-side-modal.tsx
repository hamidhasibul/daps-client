import SideModal from "@/components/side-modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function DepartmentSideModal({ isOpen, onClose }: Props) {
  return (
    <>
      <SideModal
        title="Add Department"
        description="Add department to yhe system"
        isOpen={isOpen}
        onClose={onClose}
      ></SideModal>
    </>
  );
}
