import styled from "styled-components";
import { HiXMark } from "react-icons/hi2";

import { createPortal } from "react-dom";
import React, {
  cloneElement,
  createContext,
  useContext,
  useState,
} from "react";
import { useOutsideClick } from "../hooks/useOutsideClick";

const ModalContext = createContext({
  openName: "",
  close: () => {},
  open: (name: string) => {
    console.log(`Opening modal with name: ${name}`);
  },
});

const Modal = ({ children }: { children: React.ReactNode }) => {
  const [openName, setOpenName] = useState("");

  const close = () => setOpenName("");
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
};



function Open({ children, opens: opensWindowName }: { children: React.ReactNode; opens: string }) {
  const { open } = useContext(ModalContext);

  if (!React.isValidElement(children)) {
    console.error("Open component expects a valid ReactElement as its child.");
    return null;
  }

  return cloneElement(children as React.ReactElement<{ onClick: () => void }>, { onClick: () => open(opensWindowName) });
}

// é interessante usar o createPortal para renderizar o modal fora do componente pai e evitar conflitos de estilos
function Window({ children, name }: { children: React.ReactElement<{ onCloseModal: () => void }>; name: string }) {
  const { openName, close } = useContext(ModalContext);
  //const ref = useOutsideClick(close);
  const ref = useOutsideClick(close) as React.RefObject<HTMLDivElement>;

 
  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <h1 className="text-3xl  text-center font-bold m-4 pt-4">Add New Cabin</h1>
        <Button onClick={close}>
          <HiXMark />
        </Button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;



const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
