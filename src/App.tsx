import { createServer, Model } from "miragejs"
import { useState } from "react";
import ReactModal from "react-modal";
import { Dashboard } from './components/Dashborad';
import { Header } from './components/Header';
import { NewTransactionModal } from "./components/NewTransactionModal";
import { GloboStyle } from './styles/global';
import { TransactionProvider } from "./TransactionsContexts";

createServer({
  models: {
    transaction: Model
  },

  seeds(server) {
    server.db.loadData({
      transactions: [
        {
          id: 1,
          title: 'Salário do mês',
          type: 'deposit',
          amount: '2500',
          createdAt: new Date('06-10-2022 07:45:00')
        },
        {
          id: 2,
          title: 'Aluguel',
          type: 'withdraw',
          amount: '650',
          createdAt: new Date('06-10-2022 10:32:00')
        }
      ]
    })
  },

  routes() {
    this.namespace = 'api'

    this.get('transactions', () => {
      return this.schema.all('transaction')
    })

    this.post('/transactions',(schema, request) => {
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

ReactModal.setAppElement('#root')

export function App() {
  const [isNewTransactionModalOpened, setIsNewTransactionModalOpened] = useState(false)

    function handleOpenNewTransactionModal() {
        setIsNewTransactionModalOpened(true)
    }

    function handleCloseNewTransactionModal() {
        setIsNewTransactionModalOpened(false)
    }
    
  return (
    <TransactionProvider>
      <Header 
        onOpenNewTransactionModal={handleOpenNewTransactionModal}
      />
      <Dashboard />
      <NewTransactionModal
        isOpen = {isNewTransactionModalOpened}
        onRequestClose = {handleCloseNewTransactionModal}
      />
      <GloboStyle />
    </TransactionProvider>
  );
}
