import { useUI } from "@contexts/ui.context";
import Modal from "./modal";
import LoginForm from "@components/auth/login-form";
import SignUpForm from "@components/auth/sign-up-form";
import ProductPopup from "@components/product/product-popup";
import ForgetPasswordForm from "@components/auth/forget-password-form";


const ManagedModal = () => {
    const { displayModal, closeModal, modalView } = useUI();
    return (
        <Modal open={displayModal} onClose={closeModal}>
            {modalView === "LOGIN_VIEW" && <LoginForm/>}
            {modalView === "SIGN_UP_VIEW" && <SignUpForm/>}
            {modalView === "FORGET_PASSWORD" && <ForgetPasswordForm />}
            {modalView === "PRODUCT_VIEW" && <ProductPopup />}
            {modalView === "NEWSLETTER_VIEW"}
        </Modal>
    );
};

export default ManagedModal;