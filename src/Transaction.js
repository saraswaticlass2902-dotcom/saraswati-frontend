//Transaction.js

import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable'; 
import React, { useState } from "react";
import axios from "axios";
import "jspdf-autotable";
import "./Transaction.css";

function Transaction() {
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("Deposit");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(null);
  const [message, setMessage] = useState("");

  const [bankName, setBankName] = useState("");
  const [bankNumber, setBankNumber] = useState("");
  const [ifsc, setIfsc] = useState("");
  const [mobile, setMobile] = useState("");


const fetchBalance = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/transaction/balance", {
      withCredentials: true,  
    });

    setMessage("Fetching balance...");
     setTimeout(() => {
       setBalance(res.data.balance);
       setMessage("Balance fetched successfully");
     }, 2000);
     
    
  } catch (err) {
    console.error("Error fetching balance:", err);
    setMessage("Balance fetch failed");
  }
};


const fetchTransactions = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/transaction/list", {
      withCredentials: true
    });
    setTransactions(res.data);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    setMessage("Transaction fetch failed");
  }
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!amount || isNaN(amount) || amount <= 0) {
    setMessage("Please enter a valid amount");
    return;
  }

  if (type === "Withdraw" && (!bankName || !bankNumber || !ifsc || !mobile)) {
    setMessage("Please fill all bank details for withdrawal");
    return;
  }

  try {
    const res = await axios.post("http://localhost:5000/api/transaction/add", {
      amount: parseFloat(amount),
      type,
      bankName,
      bankNumber,
      ifsc,
      mobile,
    }, {
      withCredentials: true, 
    });

    setMessage(res.data.message);
    setAmount("");
    setBankName("");
    setBankNumber("");
    setIfsc("");
    setMobile("");
  } catch (err) {
    setMessage(err.response?.data?.error || "Transaction failed");
  }
};

  const downloadPDF = () => {
  const doc = new jsPDF();

  doc.text("Transaction History", 14, 10);

  const tableColumn = [
    "Date",
    "Type",
    "Amount",
    "Status",
    "Bank Name",
    "Bank Number",
    "IFSC",
    "Mobile",
  ];

  const tableRows = transactions.map((tx) => [
    new Date(tx.date).toLocaleString(),
    tx.type,
    `₹${tx.amount}`,
    tx.status,
    tx.bankName || "-",
    tx.bankNumber || "-",
    tx.ifsc || "-",
    tx.mobile || "-",
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 20,
  });

  doc.save("Transaction_History.pdf");
};

  return (
    <div className="transaction-container">
      <h2>Wallet Transaction</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="Deposit">Deposit</option>
          <option value="Withdraw">Withdraw</option>
        </select>

        {type === "Withdraw" && (
          <>
            <select value={bankName} onChange={(e) => setBankName(e.target.value)}>
              <option value="">-- Select Bank --</option>
              <option value="SBI">SBI</option>
              <option value="HDFC">HDFC</option>
              <option value="ICICI">ICICI</option>
              <option value="AXIS">AXIS</option>
            </select>

            <input
              type="text"
              placeholder="Bank Account Number"
              value={bankNumber}
              onChange={(e) => setBankNumber(e.target.value)}
            />

            <input
              type="text"
              placeholder="IFSC Code"
              value={ifsc}
              onChange={(e) => setIfsc(e.target.value)}
            />

            <input
              type="text"
              placeholder="Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </>
        )}

        <button className="buttons"type="submit">Submit</button>
      </form>

      {message && <p className="message">{message}</p>}

      <div className="action-buttons">
        <button className="buttons" onClick={fetchBalance}>Get Balance</button>
        <button className="buttons" onClick={fetchTransactions}>Get Transactions</button>
        <button className="buttons" onClick={downloadPDF}>Download Transactions</button>
      </div>

      {balance !== null && (
        <div className="balance-box">
          <h3>Current Balance: ₹{balance}</h3>
        </div>
      )}

      {transactions.length > 0 && (
        <>
          <h3>🧾 Transaction History</h3>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Bank Name</th>
                <th>Bank Number</th>
                <th>IFSC</th>
                <th>Mobile</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, i) => (
                <tr key={i}>
                  <td>{new Date(tx.date).toLocaleString()}</td>
                  <td>{tx.type}</td>
                  <td>₹{tx.amount}</td>
                  <td className={tx.status === "Success" ? "success" : "fail"}>
                    {tx.status}
                  </td>
                  <td>{tx.bankName || "-"}</td>
                  <td>{tx.bankNumber || "-"}</td>
                  <td>{tx.ifsc || "-"}</td>
                  <td>{tx.mobile || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default Transaction;


