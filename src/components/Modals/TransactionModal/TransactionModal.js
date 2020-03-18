import React, { useState, useContext } from "react";
import { Modal, Button } from "react-bootstrap";

import { transactionToJson } from "../../../utils/createjson";
import TransactionForm from "../../Forms/TransactionForm/TransactionForm";
import { ModalVisibilityContext } from "../../../contexts/ModalVisibilityContext";
import { TransactionContext } from "../../../contexts/TransactionContext";

export default function TransactionModal(props) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("Single");

  const { transactionModal, transactionModalType } = useContext(ModalVisibilityContext);
  const [transactionModalIsVisible, setTransactionModalIsVisible] = transactionModal;
  const transactionType = transactionModalType[0];

  const transactionContext = useContext(TransactionContext);
  const postTransaction = transactionContext.postTransaction;

  const saveChanges = () => {
    const titleIsValid = validTitle();
    const dateIsValid = validDate();
    const amountIsValid = validAmount();
    let submittable = titleIsValid && dateIsValid && amountIsValid;
    if (submittable) {
      const jsonData = transactionToJson(title, date, parseInt(amount), frequency, transactionType);
      postTransaction(jsonData);
      closeModal();
    }
  };

  const closeModal = () => {
    setTransactionModalIsVisible(false);
    setTitle("");
    setDate(new Date());
    setAmount("");
    setFrequency("Single");
  }

  const validateTitle = (e) => {
    setTitle(e.target.value);
    validTitle();
  }

  const validTitle = () => {
    const currentTitle = document.querySelector("#formBasicTitle").value;
    const notification = document.querySelector("#error-title");
    if (currentTitle.length === 0) {
      notification.textContent = "This field is required";
      return false;
    }
    if (currentTitle.length > 30) {
      notification.textContent = "The title can't be longer than 30 characters";
      return false;
    }
    notification.textContent = "";
    return true;
  }

  const validDate = () => {
    const currentDate = date;
    const thisYear = new Date().getFullYear();
    const notification = document.querySelector("#error-date");
    if (currentDate == null) {
      setDate(new Date());
      notification.textContent = "Invalid date has been set to current date";
      return true;
    }
    const currentYear = date.getFullYear();
    if (currentYear > thisYear + 10) {
      notification.textContent = `You shouldn't plan ${currentYear - thisYear} years ahead`;
      return false;
    }
    notification.textContent = "";
    return true;
  }

  const validateAmount = (e) => {
    setAmount(e.target.value);
    validAmount();
  }

  const validAmount = () => {
    const inputAmount = document.querySelector("#formBasicAmount").value;
    const currentAmount = parseInt(inputAmount);
    const currentAmountFloat = parseFloat(inputAmount)
    const notification = document.querySelector("#error-amount");
    const pattern = "^\\d+$";
    if (currentAmountFloat === 0 || inputAmount.length === 0) {
      console.log(inputAmount);
      notification.textContent = "This field is required";
      return false
    }
    if (!inputAmount.match(pattern) || (currentAmountFloat > 0 && currentAmountFloat < 1)) {
      notification.textContent = "This field must be an integer";
      return false
    }
    if (currentAmount > 2147483647) {
      notification.textContent = "The amount can't be higher than 2147483647";
      return false
    }
    notification.textContent = "";
    return true
  }


  return (
    <>
      <Modal show={transactionModalIsVisible} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {transactionType === "Income" ?
              "Add new Income" :
              "Add new Expenditure"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TransactionForm
            title={title}
            setTitle={validateTitle}
            date={date}
            setDate={setDate}
            amount={amount}
            setAmount={validateAmount}
            frequency={frequency}
            setFrequency={(e) => setFrequency(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-light" onClick={closeModal}>
            Close
          </Button>
          <Button variant="outline-light" onClick={saveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
