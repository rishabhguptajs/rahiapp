'use client'
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { v4 as uuidv4 } from "uuid";
import {
  PlusCircle,
  DollarSign,
  Users,
  FileText,
  RefreshCw,
  Share2,
  Trash2,
} from "lucide-react";
import Link from 'next/link'
import Footer from "../../components/Footer";

/**
 * @page ParticipantList
 * @description Renders a list of participants with their balances and a remove button.
 * @param {Array} participants - The list of participants.
 * @param {Function} removeParticipant - Function to remove a participant.
 */
const ParticipantList = ({ participants, removeParticipant }) => (
  <ul className="space-y-2">
    {participants.map((p) => (
      <li
        key={p.id}
        className="flex justify-between items-center bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <span className="font-medium text-sm sm:text-base">{p.name}</span>
        <div className="flex items-center space-x-2 sm:space-x-3">
          <span
            className={`font-semibold text-sm sm:text-base ${
              p.balance >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            ${p.balance.toFixed(2)}
          </span>
          <button
            onClick={() => removeParticipant(p.id)}
            className="text-gray-400 hover:text-red-500 transition-colors duration-300"
          >
            <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
        </div>
      </li>
    ))}
  </ul>
);

/**
 * @component ExpenseForm
 * @description Renders a form to add a new expense.
 * @param {Array} participants - The list of participants.
 * @param {Object} newExpense - The current state of the new expense.
 * @param {Function} setNewExpense - Function to update the new expense state.
 * @param {Function} addExpense - Function to add the new expense.
 * @param {Function} toggleParticipantSelection - Function to toggle participant selection for splitting the expense.
 */
const ExpenseForm = ({
  participants,
  newExpense,
  setNewExpense,
  addExpense,
  toggleParticipantSelection,
}) => (
  <div className="space-y-3 sm:space-y-4">
    <select
      value={newExpense.paidBy}
      onChange={(e) => setNewExpense({ ...newExpense, paidBy: e.target.value })}
      className="w-full border border-gray-300 rounded-lg p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
    >
      <option value="">Who paid?</option>
      {participants.map((p) => (
        <option key={p.id} value={p.id}>
          {p.name}
        </option>
      ))}
    </select>
    <div className="flex flex-col sm:flex-row gap-3 sm:space-x-4">
      <input
        type="number"
        value={newExpense.amount}
        onChange={(e) =>
          setNewExpense({ ...newExpense, amount: e.target.value })
        }
        className="w-full sm:flex-1 border border-gray-300 rounded-lg p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="Amount"
      />
      <input
        type="text"
        value={newExpense.description}
        onChange={(e) =>
          setNewExpense({ ...newExpense, description: e.target.value })
        }
        className="w-full sm:flex-1 border border-gray-300 rounded-lg p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
        placeholder="Description"
      />
    </div>
    <div>
      <p className="mb-2 font-semibold text-gray-700 text-sm sm:text-base">Split Among:</p>
      <div className="flex flex-wrap gap-2">
        {participants.map((p) => (
          <button
            key={p.id}
            onClick={() => toggleParticipantSelection(p.id)}
            className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
              newExpense.splitAmong.includes(p.id)
                ? "bg-orange-500 text-white"
                : "bg-gray-200 text-gray-700"
            } transition duration-300 hover:shadow-md`}
          >
            {p.name}
          </button>
        ))}
      </div>
    </div>
    <button
      onClick={addExpense}
      className="w-full bg-orange-500 text-white px-4 py-2 rounded-lg text-sm sm:text-base hover:bg-orange-600 transition duration-300 shadow-md hover:shadow-lg"
    >
      Add Expense
    </button>
  </div>
);

/**
 * @component ExpenseList
 * @description Renders a list of expenses with details.
 * @param {Array} expenses - The list of expenses.
 * @param {Array} participants - The list of participants.
 */
const ExpenseList = ({ expenses, participants }) => (
  <ul className="space-y-3">
    {expenses.map((e) => (
      <li
        key={e.id}
        className="bg-white p-3 sm:p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
      >
        <div className="flex justify-between items-start">
          <div>
            <div className="font-semibold text-base sm:text-lg">{e.description}</div>
            <div className="text-xs sm:text-sm text-gray-600">
              {participants.find((p) => p.id === e.paidBy)?.name} paid
            </div>
          </div>
          <div className="text-lg sm:text-xl font-bold text-orange-500">
            ${e.amount.toFixed(2)}
          </div>
        </div>
        <div className="mt-2 text-xs sm:text-sm text-gray-600">
          Split: ${e.splitAmount.toFixed(2)} each among{" "}
          {e.splitAmong
            .map((id) => participants.find((p) => p.id === id)?.name)
            .join(", ")}
        </div>
      </li>
    ))}
  </ul>
);

/**
 * @component BillSplitting
 * @description Main component for managing participants and expenses in a trip.
 */
const BillSplitting = () => {
  const [participants, setParticipants] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [newParticipant, setNewParticipant] = useState("");
  const [newExpense, setNewExpense] = useState({
    paidBy: "",
    amount: "",
    description: "",
    splitAmong: [],
  });
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState("");

  useEffect(() => {
    setSessionId(uuidv4());
  }, []);

  const addParticipant = () => {
    if (newParticipant.trim()) {
      setParticipants([
        ...participants,
        { id: uuidv4(), name: newParticipant.trim(), balance: 0 },
      ]);
      setNewParticipant("");
    }
  };

  const removeParticipant = (id) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  const addExpense = () => {
    if (
      newExpense.paidBy &&
      newExpense.amount &&
      newExpense.description &&
      newExpense.splitAmong.length > 0
    ) {
      const amount = parseFloat(newExpense.amount);
      const splitAmount = amount / newExpense.splitAmong.length;

      const updatedParticipants = participants.map((p) => {
        if (p.id === newExpense.paidBy) {
          return { ...p, balance: p.balance + amount };
        } else if (newExpense.splitAmong.includes(p.id)) {
          return { ...p, balance: p.balance - splitAmount };
        }
        return p;
      });

      setExpenses([
        ...expenses,
        { ...newExpense, id: uuidv4(), amount, splitAmount },
      ]);
      setParticipants(updatedParticipants);
      setNewExpense({
        paidBy: "",
        amount: "",
        description: "",
        splitAmong: [],
      });
      setError("");
    } else {
      setError("Please fill in all fields correctly.");
    }
  };

  const settleDebt = (from, to) => {
    const fromParticipant = participants.find((p) => p.id === from);
    const toParticipant = participants.find((p) => p.id === to);
    const amount = Math.min(
      Math.abs(fromParticipant.balance),
      toParticipant.balance
    );

    const updatedParticipants = participants.map((p) => {
      if (p.id === from) {
        return { ...p, balance: p.balance + amount };
      } else if (p.id === to) {
        return { ...p, balance: p.balance - amount };
      }
      return p;
    });

    setParticipants(updatedParticipants);

    const settlementExpense = {
      id: uuidv4(),
      paidBy: from,
      amount: amount,
      description: `Debt settlement: ${fromParticipant.name} to ${toParticipant.name}`,
      splitAmong: [from, to],
      splitAmount: amount,
    };
    setExpenses([...expenses, settlementExpense]);
  };

  const toggleParticipantSelection = (participantId) => {
    setNewExpense((prev) => ({
      ...prev,
      splitAmong: prev.splitAmong.includes(participantId)
        ? prev.splitAmong.filter((id) => id !== participantId)
        : [...prev.splitAmong, participantId],
    }));
  };

  const resetAll = () => {
    setParticipants([]);
    setExpenses([]);
    setNewParticipant("");
    setNewExpense({ paidBy: "", amount: "", description: "", splitAmong: [] });
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100">
      <Header />
      <div className="py-6 sm:py-10 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-orange-600">
            Trip Expense Splitter
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
            <div className="lg:col-span-1 bg-white p-4 sm:p-6 rounded-xl shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-orange-600 flex items-center">
                <Users className="mr-2" /> Participants
              </h2>
              <div className="flex mb-4">
                <input
                  type="text"
                  value={newParticipant}
                  onChange={(e) => setNewParticipant(e.target.value)}
                  className="flex-grow border border-gray-300 rounded-l-lg p-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Enter participant name"
                />
                <button
                  onClick={addParticipant}
                  className="bg-orange-500 text-white px-3 sm:px-4 py-2 rounded-r-lg hover:bg-orange-600 transition duration-300"
                >
                  <PlusCircle size={18} className="sm:w-5 sm:h-5" />
                </button>
              </div>
              <ParticipantList
                participants={participants}
                removeParticipant={removeParticipant}
              />
            </div>

            <div className="lg:col-span-2 bg-white p-4 sm:p-6 rounded-xl shadow-lg">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-orange-600 flex items-center">
                <DollarSign className="mr-2" /> Add Expense
              </h2>
              <ExpenseForm
                participants={participants}
                newExpense={newExpense}
                setNewExpense={setNewExpense}
                addExpense={addExpense}
                toggleParticipantSelection={toggleParticipantSelection}
              />
              {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
            </div>
          </div>

          <div className="mt-4 sm:mt-8 bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-orange-600 flex items-center">
              <FileText className="mr-2" /> Expenses
            </h2>
            <ExpenseList expenses={expenses} participants={participants} />
          </div>

          <div className="mt-4 sm:mt-8 bg-white p-4 sm:p-6 rounded-xl shadow-lg">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-orange-500 flex items-center">
              <RefreshCw className="mr-2" /> Settle Debts
            </h2>
            <div className="space-y-4">
              {participants
                .filter((p) => p.balance < 0)
                .map((debtor) => (
                  <div key={debtor.id} className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                    <h3 className="font-semibold text-base sm:text-lg mb-2">
                      {debtor.name} owes:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {participants
                        .filter((p) => p.balance > 0)
                        .map((creditor) => (
                          <button
                            key={`${debtor.id}-${creditor.id}`}
                            onClick={() => settleDebt(debtor.id, creditor.id)}
                            className="bg-orange-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-orange-700 transition duration-300 shadow-md hover:shadow-lg"
                          >
                            $
                            {Math.min(
                              Math.abs(debtor.balance),
                              creditor.balance
                            ).toFixed(2)}{" "}
                            to {creditor.name}
                          </button>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-4 sm:mt-8 flex flex-col sm:flex-row justify-between gap-4">
            <button
              onClick={resetAll}
              className="w-full sm:w-auto bg-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-red-600 transition duration-300 shadow-md hover:shadow-lg"
            >
              Reset All
            </button>
            <Link
              href="/bill/login"
              className="w-full sm:w-auto bg-indigo-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base hover:bg-indigo-600 transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
            >
              <Share2 className="mr-2"/> Share Session
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BillSplitting;
