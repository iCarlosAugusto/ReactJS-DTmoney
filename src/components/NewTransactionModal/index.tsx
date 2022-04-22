import { useState, useContext } from "react";

import Modal from "react-modal";
import { useForm, SubmitHandler } from "react-hook-form";

import { TransactionsContext } from "../../TransactionsProvider";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

import { Form, TransactionTypeContainer, RadioBox, ErrorMessage } from "./styles";

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
};

type DataFormProps = {
  title: string;
  category: string;
  amountInput: number;
};

export function NewTransactionModal({ isOpen, onRequestClose }: ModalProps) {
  const { register, handleSubmit, reset, formState: { errors }} = useForm<DataFormProps>();
  const { createTransaction } = useContext(TransactionsContext);
  const [type, setType] = useState("deposit");

  const handleCreateNewTransaction: SubmitHandler<DataFormProps> = async (dataForm) => {
    const { title, category, amountInput } = dataForm;
    const amount = Number(amountInput);
    await createTransaction({ title, type, category, amount });
    setType("deposit");
    reset();
    onRequestClose();
  };

  const handleCloseModal = () => {
    onRequestClose();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
      ariaHideApp={false}
    >
      <button
        type="button"
        onClick={handleCloseModal}
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Form onSubmit={handleSubmit(handleCreateNewTransaction)}>
        <h2>Cadastrar transação</h2>

        <input
          {...register("title", { required: true })}
          type="text"
          placeholder="Título"
        />

        <ErrorMessage>{errors.title && "Por favor, insira algum título."}</ErrorMessage>

        <input
          {...register("amountInput", { required: true })}
          type="number"
          placeholder="Valor"
        />
        {errors.amountInput && <ErrorMessage>Por favor, insira algum valor.</ErrorMessage>}

        <input
          {...register("category", { required: true })}
          type="text"
          placeholder="Categoria"
        />
        {errors.category && <ErrorMessage>Por favor, escolha uma categoria.</ErrorMessage>}

        <TransactionTypeContainer>
          <RadioBox
            type="button"
            onClick={() => setType("deposit")}
            isActive={type === "deposit"}
            activeColor="green"
          >
            <img src={incomeImg} alt="Entrada" />
            <span>Entrada</span>
          </RadioBox>
          <RadioBox
            type="button"
            onClick={() => setType("withdraw")}
            isActive={type === "withdraw"}
            activeColor="red"
          >
            <img src={outcomeImg} alt="Saída" />
            <span>Saída</span>
          </RadioBox>
        </TransactionTypeContainer>

        <button type="submit">
          Cadastrar
        </button>
      </Form>
    </Modal>
  );
}
