import Modal from "@/components/modal";
import { Button } from "@/components/ui/button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
};

function AlertModal({ isOpen, onClose, onConfirm, loading }: Props) {
  return (
    <>
      <Modal
        title="Are you sure?"
        description="This action can not be undone"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="flex items-center justify-end w-full space-x-2 pt-6">
          <Button variant={"outline"} onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            disabled={loading}
            variant={"destructive"}
            onClick={onConfirm}
          >
            Continue
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default AlertModal;
