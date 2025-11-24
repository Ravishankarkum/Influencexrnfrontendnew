// EarningsTracker Component
// This component shows total earnings, monthly trends, payout history,
// and payment methods for the user. It also lets the user filter payouts
// by time period and export reports.

import React, { useState } from 'react';
import { DollarSign, TrendingUp, Calendar, Download, CreditCard, Wallet } from 'lucide-react';
import { PayoutStatus } from '../../types';

export function EarningsTracker() {
  const [selectedPeriod, setSelectedPeriod] = useState('all');
  
  const earningsData = {
    total_earned: 8450,
    pending_payouts: 1200,
    available_withdrawal: 2100,
    this_month: 1850,
    last_month: 2200,
    payouts: [
      {
        amount: 1500,
        date: '2024-07-25',
        method: 'Bank Transfer',
        status: PayoutStatus.COMPLETED,
        campaign: 'Summer Fashion Collection'
      },
      {
        amount: 800,
        date: '2024-07-20',
        method: 'PayPal',
        status: PayoutStatus.COMPLETED,
        campaign: 'Fitness Challenge Campaign'
      },
      {
        amount: 1200,
        date: '2024-07-30',
        method: 'Bank Transfer',
        status: PayoutStatus.PENDING,
        campaign: 'Tech Product Launch'
      },
      {
        amount: 600,
        date: '2024-08-01',
        method: 'PayPal',
        status: PayoutStatus.PENDING,
        campaign: 'Food Blog Partnership'
      }
    ]
  };

  const monthlyEarnings = [
    { month: 'Jan', amount: 1200 },
    { month: 'Feb', amount: 1800 },
    { month: 'Mar', amount: 2200 },
    { month: 'Apr', amount: 1600 },
    { month: 'May', amount: 2800 },
    { month: 'Jun', amount: 2400 },
    { month: 'Jul', amount: 3200 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case PayoutStatus.COMPLETED:
        return 'bg-green-100 text-green-800';
      case PayoutStatus.PENDING:
        return 'bg-yellow-100 text-yellow-800';
      case PayoutStatus.FAILED:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPayouts = earningsData.payouts.filter(payout => {
    if (selectedPeriod === 'all') return true;
    const payoutDate = new Date(payout.date);
    const now = new Date();
    
    switch (selectedPeriod) {
      case 'this_month':
        return payoutDate.getMonth() === now.getMonth() && payoutDate.getFullYear() === now.getFullYear();
      case 'last_month':
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1);
        return payoutDate.getMonth() === lastMonth.getMonth() && payoutDate.getFullYear() === lastMonth.getFullYear();
      case 'this_year':
        return payoutDate.getFullYear() === now.getFullYear();
      default:
        return true;
    }
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Earnings Tracker</h2>
          <p className="text-gray-600">Monitor your income and payout history</p>
        </div>
        <div className="flex gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Time</option>
            <option value="this_month">This Month</option>
            <option value="last_month">Last Month</option>
            <option value="this_year">This Year</option>
          </select>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all flex items-center gap-2">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-green-500">
              <DollarSign size={24} className="text-white" />
            </div>
            <span className="text-sm font-medium text-green-600">+12%</span>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Total Earned</p>
            <p className="text-2xl font-bold text-gray-900">${earningsData.total_earned.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-yellow-500">
              <Calendar size={24} className="text-white" />
            </div>
            <span className="text-sm font-medium text-yellow-600">Pending</span>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Pending Payouts</p>
            <p className="text-2xl font-bold text-gray-900">${earningsData.pending_payouts.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-blue-500">
              <Wallet size={24} className="text-white" />
            </div>
            <span className="text-sm font-medium text-blue-600">Available</span>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Available for Withdrawal</p>
            <p className="text-2xl font-bold text-gray-900">${earningsData.available_withdrawal.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 rounded-lg bg-purple-500">
              <TrendingUp size={24} className="text-white" />
            </div>
            <span className="text-sm font-medium text-purple-600">This Month</span>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Monthly Earnings</p>
            <p className="text-2xl font-bold text-gray-900">${earningsData.this_month.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Monthly Earnings Chart */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Earnings Trend</h3>
        <div className="flex items-end justify-between h-64 gap-2">
          {monthlyEarnings.map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div className="w-full bg-gray-200 rounded-t-lg relative" style={{ height: '200px' }}>
                <div
                  className="bg-gradient-to-t from-purple-500 to-blue-500 rounded-t-lg absolute bottom-0 w-full transition-all duration-500"
                  style={{ height: `${(data.amount / 3500) * 100}%` }}
                ></div>
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm font-medium text-gray-900">${(data.amount / 1000).toFixed(1)}K</div>
                <div className="text-xs text-gray-600">{data.month}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payout History */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Payout History</h3>
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all">
            Request Withdrawal
          </button>
        </div>

        <div className="space-y-4">
          {filteredPayouts.map((payout, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white rounded-lg shadow-sm">
                  <CreditCard size={20} className="text-gray-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{payout.campaign}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-gray-600">{payout.method}</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-600">{new Date(payout.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(payout.status)}`}>
                  {payout.status}
                </span>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-900">${payout.amount.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">
                    {payout.status === PayoutStatus.COMPLETED ? 'Paid' : 'Processing'}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPayouts.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign size={24} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No payouts found</h3>
            <p className="text-gray-600">Complete campaigns to start earning and receiving payouts.</p>
          </div>
        )}
      </div>

      {/* Payment Methods */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Methods</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <CreditCard size={16} className="text-blue-600" />
              </div>
              <span className="font-medium text-gray-900">Bank Transfer</span>
            </div>
            <p className="text-sm text-gray-600">Direct deposit to your bank account</p>
            <p className="text-xs text-green-600 mt-1">✓ Verified</p>
          </div>
          
          <div className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                <Wallet size={16} className="text-purple-600" />
              </div>
              <span className="font-medium text-gray-900">PayPal</span>
            </div>
            <p className="text-sm text-gray-600">Fast payments to your PayPal account</p>
            <p className="text-xs text-green-600 mt-1">✓ Verified</p>
          </div>
        </div>
      </div>
    </div>
  );
}
