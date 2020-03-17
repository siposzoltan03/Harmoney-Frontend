import React, {useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";
import { userToJsonLogin } from "../../utils/createjson";

import { UserContext } from "../../contexts/UserContext";
import { ModalVisibilityContext } from "../../contexts/ModalVisibilityContext";
import { LoginForm } from "../LoginForm/LoginForm";

export function LoginModal(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { logModal } = useContext(ModalVisibilityContext);
    const [loginModalIsVisible, setLoginModalIsVisible] = logModal;

    const userContext = useContext(UserContext);
    const postLogin = userContext.login;

    const closeModal = () => {
        setLoginModalIsVisible(false);
        setEmail("");
        setPassword("");
    }
    const handleSubmit = () => {
        const jsonData = userToJsonLogin(email, password)
        postLogin(jsonData);
        setLoginModalIsVisible(false);
        closeModal();
    }

    return (
        <>
            <Modal show={loginModalIsVisible}
                   onHide={closeModal}
                   {...props}
                   size="lg"
                   aria-labelledby="contained-modal-title-vcenter"
                   centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <LoginForm
                        email={email}
                        setEmail={(e) => setEmail(e.target.value)}
                        password={password}
                        setPassword={(e) => setPassword(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-light" onClick={closeModal}>
                        Cancel
                    </Button>
                    <Button variant="outline-light" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default LoginModal