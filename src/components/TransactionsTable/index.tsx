import { useContext, useState, useEffect } from "react";

import {
  Container,
  SeachContainer,
  EmptyList,

  EmptyListContainer,
} from "./styles";

import { TransactionsContext } from "../../TransactionsProvider";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
};

export function TransactionTable() {
  const { transactions, removeTransaction } = useContext(TransactionsContext);
  const [currentlyTransactions, setCurrentlyTransactions] = useState<Transaction[]>([]);
  const [isSeaching, setIsSeaching] = useState(false);


  useEffect(() => {
    setCurrentlyTransactions(transactions);
  }, [transactions]);

  //const fetchData = async () => {
  //  const response = await api.get('/transactions');
  //  setCurrentlyTransactions(response.data.transactions);
  //}

  const handleSeachTransaction = (transactionInput: string) => {
    setIsSeaching(true);
    const charactersLength = transactionInput.length;
    const transanctionSeached = transactions.filter((trasaction) => {
      return (
        trasaction.title.substring(0, charactersLength).toLowerCase() === transactionInput.toLowerCase()
      );
    });
    setCurrentlyTransactions(transanctionSeached);
  };

  const handleRemoveTransaction = (transactionToBeRemoved : Transaction) => {
    removeTransaction(transactionToBeRemoved);
  };

  return (
    <Container>
      <SeachContainer>
        <input
          type="text"
          placeholder="Procure a transação pelo título"
          onChange={(event) => handleSeachTransaction(event.target.value)}
        />
      </SeachContainer>
    
      {(currentlyTransactions.length === 0 && isSeaching) ? (
        <EmptyListContainer>
          <EmptyList />
          <p>Nenhuma transação encontrada com esse título 😔</p>
        </EmptyListContainer>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Título</th>
              <th>Valor</th>
              <th>Categoria</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {currentlyTransactions.map((transaction) => (
              <tr>
                <td>{transaction.title}</td>
                <td>
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(transaction.amount))}
                </td>
                <td>{transaction.category}</td>
                <td>
                  {new Intl.DateTimeFormat("pt-BR").format(
                    new Date(transaction.createdAt)
                  )}
                </td>
                <td>
                  <button onClick={() => handleRemoveTransaction(transaction)}>
                   
                  </button>
               
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Container>
  );
}
