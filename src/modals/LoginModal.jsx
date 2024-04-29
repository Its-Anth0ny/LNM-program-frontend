import ReactModal from "react-modal";
import Login from "../components/Login";
import "../utils/App.css";

ReactModal.setAppElement("#root");

const LoginModal = ({ isLoginOpen, handleCloseLogin, handleAuth }) => {
    // console.log(isLoginOpen);
    return (
        <ReactModal
            isOpen={isLoginOpen}
            onRequestClose={handleCloseLogin}
            shouldCloseOnOverlayClick={true}
            className="login-modal"
            overlayClassName="overlay"
        >
            <Login
                handleCloseLogin={handleCloseLogin}
                handleAuth={handleAuth}
            />
        </ReactModal>
    );
};

export default LoginModal;
