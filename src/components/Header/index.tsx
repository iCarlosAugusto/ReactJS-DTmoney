import React, { useEffect, useState } from "react";
import logoImg from "../../assets/total.svg";
import { Container, Wrapper } from './styles';

interface HeaderProps {
  onHandleOpenModal: () => void;
};

export function Header({onHandleOpenModal} : HeaderProps) {

  return (
    <Container>
      <Wrapper>
        <img src={ logoImg } alt="dt.money" />
        <button 
          type="button"
          onClick={onHandleOpenModal}
        >
          Nova transação
        </button>
      </Wrapper>
    </Container>
  )
} 