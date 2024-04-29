import ReactModal from "react-modal";
import Signup from "../components/Signup";
import "../utils/App.css";

ReactModal.setAppElement("#root");

const SignupModal = ({ isSignupOpen, handleCloseSignup }) => {
    // console.log(isSignupOpen);
    return (
        <ReactModal
            isOpen={isSignupOpen}
            onRequestClose={handleCloseSignup}
            shouldCloseOnOverlayClick={true}
            className="signup-modal"
            overlayClassName="overlay"
        >
            <Signup handleCloseSignup={handleCloseSignup} />
        </ReactModal>
    );
};

export default SignupModal;
