interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export default function Modal({ children, open, onClose }: ModalProps) {
  if (!open) return null;
  return (
    <>
      <dialog
        open
        className="fixed h-[6.25rem] w-[15.625rem] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-green rounded-xl shadow-image"
      >
        <div
          className="flex justify-center items-center h-full w-full"
          onClick={onClose}
        >
          <span className="font-semibold text-white">{children}</span>
        </div>
      </dialog>
    </>
  );
}
