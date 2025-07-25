interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
}

export default function Modal({ children, open, onClose }: ModalProps) {
  if (!open) return null;
  return (
    <dialog
      open
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark-green rounded-xl shadow-image"
    >
      <div>
        <span>{children}</span>
      </div>
      <div className="mt-4 text-center">
        <button type="button" onClick={onClose}>
          확인
        </button>
      </div>
    </dialog>
  );
}

//

// 시용 방법 - 모달창 띄울 페이지에 삽입
{
  /* <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
  장바구니에서 삭제되었습니다.
</Modal>; */
}

// 누르면 띄울 버튼에 onClick 삽입
/* onClick={() => setModalOpen(true)} */

// 모달 띄우는 코드
/* const [modalOpen, setModalOpen] = useState(false);
const dropdownRef = useRef<HTMLDivElement>(null);
// 바깥 아무곳이나 클릭 시 드롭다운 닫아짐
useEffect(() => {
  function handleClickOutside(event: MouseEvent) {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) //클릭한 요소가 드롭다운 내부가 아니면 닫도록
    ) {
      setModalOpen(false);
    }
  }
  document.addEventListener('mousedown', handleClickOutside); //document에 마우스 클릭 이벤트 등록
}, []); */
