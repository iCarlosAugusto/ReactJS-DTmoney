import { createContext, useState, useEffect, ReactNode } from "react";
import { api } from "./services/api";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface ContextProps {
  transactions: Transaction[];
  createTransaction: (transaction : TransactionInputProps) => Promise<void>;
  removeTransaction: (transactionToBeRemoved: Transaction) => void;
};

type TransactionInputProps = Omit<Transaction, 'id' | 'createdAt'>;

export const TransactionsContext = createContext<ContextProps>({} as ContextProps);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);


  useEffect(() => {
    api.get("transactions").then((response) => setTransactions(response.data.transactions));
  }, []);

  const createTransaction = async (transactionInput: TransactionInputProps) => {
    const response = await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    });

    const { transaction } = response.data;
    
    setTransactions([...transactions, transaction]);
  };

  const removeTransaction = async (transactionToBeRemoved: Transaction) => {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== transactionToBeRemoved.id);
    setTransactions(updatedTransactions);
  };

  return (
    <TransactionsContext.Provider value={{transactions, createTransaction, removeTransaction}}>
      {children}
    </TransactionsContext.Provider>
  );
}
