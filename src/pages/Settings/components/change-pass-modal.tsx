import Modal from "@/components/modal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

function ChangePassModal({ isOpen, onClose }: Props) {
  return (
    <Modal
      title="Change password"
      description="Change your account password"
      isOpen={isOpen}
      onClose={onClose}
    ></Modal>
  );
}

export default ChangePassModal;
