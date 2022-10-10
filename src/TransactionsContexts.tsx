import { createContext, ReactNode, useEffect, useState } from "react"
import { api } from "./components/services/api"

interface Transaction {
    id: number,
    title: string,
    amount: number,
    type: string,
    category: string,
    createdAt: string
}

interface TransactionProviderProps {
    children: ReactNode
}

export const TransactionsContexts = createContext<Transaction[]>([])

export function TransactionProvider({children}:TransactionProviderProps) {
    
    const [transactions, setTransections] = useState<Transaction[]>([])

    useEffect(() => {
        api.get('transactions')
            .then(response => setTransections(response.data.transactions)
            )
    }, [])

    return (
        <TransactionsContexts.Provider value={transactions}>
            {children}
        </TransactionsContexts.Provider>
    )
}