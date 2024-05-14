import React from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

const ModalWrapper = styled.div`
  .modalBg {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

const useModalSub = () => {
    /** modal opened state */
    const [modalOpened, setModalOpened] = React.useState(false);

    /** modal control func */
    const openModalSub = () => {
        setModalOpened(true);
    };
    const closeModalSub = () => {
        setModalOpened(false);
    };

    const ModalPortalSub = ({ children }) => {
        const ref = React.useRef();
        const [mounted, setMounted] = React.useState(false); // <-- mounted?

        React.useEffect(() => {
            setMounted(true);
            if (document) {
                const dom = document.querySelector("#root-modal");
                ref.current = dom;
            }
        }, []);

        if (ref.current && mounted && modalOpened) {
            return createPortal(
                <ModalWrapper>
                    <div className="modalBg" role="presentation" onClick={closeModalSub} />
                    {children}
                </ModalWrapper>,
                ref.current
            );
        }
        return null;
    };
    return {
        openModalSub,
        closeModalSub,
        ModalPortalSub,
    };
};
export { useModalSub };
