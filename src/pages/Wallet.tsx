import React from 'react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownRight, Clock, RefreshCw } from 'lucide-react';

interface Transaction {
  id: number;
  type: 'incoming' | 'outgoing';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const transactions: Transaction[] = [
  {
    id: 1,
    type: 'outgoing',
    amount: 50,
    description: 'Therapy Session - Dr. Emily Chen',
    date: '2024-03-15',
    status: 'completed'
  },
  {
    id: 2,
    type: 'incoming',
    amount: 100,
    description: 'Wallet Top-up',
    date: '2024-03-10',
    status: 'completed'
  },
  {
    id: 3,
    type: 'outgoing',
    amount: 30,
    description: 'Group Session',
    date: '2024-03-05',
    status: 'completed'
  }
];

const Wallet: React.FC = () => {
  return (
    <div className="container-custom py-8">
      <div className="flex items-center mb-8">
        <WalletIcon className="h-6 w-6 mr-2 text-teal-600" />
        <h1 className="text-2xl font-bold">My Wallet</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Balance Card */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-6 rounded-xl text-white">
            <h2 className="text-lg font-medium mb-4">Available Balance</h2>
            <div className="text-3xl font-bold mb-4">$420.00</div>
            <div className="flex space-x-4">
              <button className="flex-1 bg-white text-teal-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                <ArrowUpRight className="h-5 w-5 mr-2" />
                Send
              </button>
              <button className="flex-1 bg-white text-teal-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors flex items-center justify-center">
                <ArrowDownRight className="h-5 w-5 mr-2" />
                Receive
              </button>
            </div>
          </div>

          <div className="mt-6 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-4">
              <button className="w-full btn-primary">
                Add Funds
              </button>
              <button className="w-full btn-secondary">
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Transaction History</h2>
              <button className="text-teal-600 hover:text-teal-700 flex items-center">
                <RefreshCw className="h-5 w-5 mr-1" />
                Refresh
              </button>
            </div>

            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center">
                    {transaction.type === 'incoming' ? (
                      <div className="bg-green-100 p-2 rounded-full">
                        <ArrowDownRight className="h-5 w-5 text-green-600" />
                      </div>
                    ) : (
                      <div className="bg-red-100 p-2 rounded-full">
                        <ArrowUpRight className="h-5 w-5 text-red-600" />
                      </div>
                    )}
                    <div className="ml-4">
                      <div className="font-medium">{transaction.description}</div>
                      <div className="text-sm text-gray-500">
                        {new Date(transaction.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-medium ${
                      transaction.type === 'incoming' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {transaction.type === 'incoming' ? '+' : '-'}${transaction.amount}
                    </div>
                    <div className="text-sm text-gray-500">
                      {transaction.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button className="text-teal-600 hover:text-teal-700 font-medium">
                View All Transactions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;