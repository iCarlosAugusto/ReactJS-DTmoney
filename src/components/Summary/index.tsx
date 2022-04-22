import { useContext } from "react";
import { Container, Total } from "./styles";
import income from "../../assets/income.svg";
import outcome from "../../assets/outcome.svg";

import { TransactionsContext } from "../../TransactionsProvider";

export function Summary() {
  const { transactions } = useContext(TransactionsContext);

  const summary = transactions.reduce((acc, transaction) => {
    if (transaction.type === 'deposit') {
      acc.deposits += transaction.amount;
      acc.total += transaction.amount;
    } else {
      acc.withdraws += transaction.amount;
      acc.total -= transaction.amount;
    }

    return acc;
  }, {
    deposits: 0,
    withdraws: 0,
    total: 0
  });

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={income} alt="Entradas" />
        </header>
        <strong>{summary.deposits.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</strong>
     
      </div>

      <div>
        <header>
          <p>Saídas</p>
          <img src={outcome} alt="Saídas" />
        </header>
        <strong>{summary.withdraws.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</strong>

      </div>

      <div className="hightlight-background">
        <header>
          <p>Total</p>
          <Total/>
        </header>
        <strong>{summary.total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}</strong>
      </div>
    </Container>
  );
}
