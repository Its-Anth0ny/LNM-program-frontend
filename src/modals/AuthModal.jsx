import ReactModal from "react-modal";
import { AuthTab } from "../components/AuthTab";

ReactModal.setAppElement("#root");

const AuthModal = ({ isAuthModalOpen, handleAuthModal, handleAuth }) => {
    return (
        <ReactModal
            isOpen={isAuthModalOpen}
            onRequestClose={handleAuthModal}
            shouldCloseOnOverlayClick={true}
            className="max-w-[800px] w-full max-h-[600px] h-full bg-white grid grid-rows-1 grid-cols-12 rounded-lg p-2"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 hide-scrollbar backdrop-blur-lg flex items-center justify-center"
        >
            <div className="flex items-center justify-center col-span-5">
                <img src="login2.jpg" alt="" />
            </div>
            <div className="flex items-center justify-center col-span-7">
                <AuthTab
                    handleAuthModal={handleAuthModal}
                    handleAuth={handleAuth}
                />
            </div>
        </ReactModal>
    );
};

export default AuthModal;
