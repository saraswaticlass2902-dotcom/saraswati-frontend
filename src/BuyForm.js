// import React, { useState } from "react";
// import axios from "axios";
// import "./BuyForm.css";

// function BuyForm({ house, onClose }) {
//   const [buyerName, setBuyerName] = useState("");
//   const [buyerEmail, setBuyerEmail] = useState("");
//   const [buyerPhone, setBuyerPhone] = useState("");
//   const [buyerAddress, setBuyerAddress] = useState("");
//   const [idProof, setIdProof] = useState(null);

//   const [paymentMode, setPaymentMode] = useState("Credit Card");
//   const [transactionId, setTransactionId] = useState("");
//   const [amount, setAmount] = useState(house.rent);
//   const [paymentReceipt, setPaymentReceipt] = useState(null);

//   const [loading, setLoading] = useState(false);
//   const [successMessage, setSuccessMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!buyerName || !buyerEmail || !buyerPhone || !transactionId) {
//       alert("Please fill all required fields");
//       return;
//     }

//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("houseId", house._id);
//       formData.append("title", house.title);
//       formData.append("rent", house.rent);
//       formData.append("buyerName", buyerName);
//       formData.append("buyerEmail", buyerEmail);
//       formData.append("buyerPhone", buyerPhone);
//       formData.append("buyerAddress", buyerAddress);
//       formData.append("paymentMode", paymentMode);
//       formData.append("transactionId", transactionId);
//       formData.append("amount", amount);

//       if (idProof) formData.append("idProof", idProof);
//       if (paymentReceipt) formData.append("paymentReceipt", paymentReceipt);

//       await axios.post(
//         "http://localhost:5000/api/purchases/add",
//         formData,
//         { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } }
//       );

//       setSuccessMessage("✅ Purchase and payment successful!");
//       setLoading(false);

//       setTimeout(() => {
//         setSuccessMessage("");
//         onClose();
//       }, 2000);
//     } catch (err) {
//       console.error(err.response?.data || err.message);
//       alert("❌ Purchase failed!");
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="buyform-overlay">
//       <div className="buyform-container">
//         <h2>Buy {house.title}</h2>
        
//         <form onSubmit={handleSubmit}>
//           <label>Name*</label>
//           <input type="text" value={buyerName} onChange={(e) => setBuyerName(e.target.value)} />

//           <label>Email*</label>
//           <input type="email" value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)} />

//           <label>Phone*</label>
//           <input type="text" value={buyerPhone} onChange={(e) => setBuyerPhone(e.target.value)} />

//           <label>Address</label>
//           <input type="text" value={buyerAddress} onChange={(e) => setBuyerAddress(e.target.value)} />

//           <label>ID Proof (PDF/JPG/PNG)</label>
//           <input type="file" onChange={(e) => setIdProof(e.target.files[0])} />

//           <label>Payment Mode*</label>
//           <select value={paymentMode} onChange={(e) => setPaymentMode(e.target.value)}>
//             <option>Credit Card</option>
//             <option>Debit Card</option>
//             <option>UPI</option>
//             <option>Net Banking</option>
//             <option>Cash</option>
//           </select>

//           <label>Transaction ID*</label>
//           <input type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />

//           <label>Amount*</label>
//           <input type="number" value={amount} readOnly />

//           <label>Payment Receipt (PDF/JPG/PNG)</label>
//           <input type="file" onChange={(e) => setPaymentReceipt(e.target.files[0])} />

//           <button type="submit" disabled={loading}>{loading ? "Processing..." : "Confirm Buy"}</button>
//           <button type="button" className="close-btn" onClick={onClose}>Cancel</button>
//         </form>

//         {successMessage && <p className="success-message">{successMessage}</p>}
//       </div>
//     </div>
//   );
// }

// export default BuyForm;

import React, { useState } from "react";
import axios from "axios";
import "./BuyForm.css";

function BuyForm({ house, onClose }) {
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerAddress, setBuyerAddress] = useState("");
  const [idProof, setIdProof] = useState(null);
  const [paymentMode, setPaymentMode] = useState("Credit Card");
  const [transactionId, setTransactionId] = useState("");
  const [amount, setAmount] = useState(house.rent);
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!buyerName || !buyerEmail || !buyerPhone || !transactionId) {
      alert("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("houseId", house._id);
      formData.append("title", house.title);
      formData.append("rent", house.rent);
      formData.append("buyerName", buyerName);
      formData.append("buyerEmail", buyerEmail);
      formData.append("buyerPhone", buyerPhone);
      formData.append("buyerAddress", buyerAddress);
      formData.append("paymentMode", paymentMode);
      formData.append("transactionId", transactionId);
      formData.append("amount", amount);
      if (idProof) formData.append("idProof", idProof);
      if (paymentReceipt) formData.append("paymentReceipt", paymentReceipt);

      await axios.post("http://localhost:5000/api/purchases/add", formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" }
      });

      setSuccessMessage("✅ Purchase submitted! Waiting for admin approval.");
      setLoading(false);

      setTimeout(() => {
        setSuccessMessage("");
        onClose();
      }, 3000);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("❌ Purchase submission failed!");
      setLoading(false);
    }
  };

  return (
    <div className="buyform-overlay">
      <div className="buyform-container">
        <h2>Buy {house.title}</h2>
        <form onSubmit={handleSubmit}>
          <label>Name*</label>
          <input type="text" value={buyerName} onChange={e => setBuyerName(e.target.value)} />

          <label>Email*</label>
          <input type="email" value={buyerEmail} onChange={e => setBuyerEmail(e.target.value)} />

          <label>Phone*</label>
          <input type="text" value={buyerPhone} onChange={e => setBuyerPhone(e.target.value)} />

          <label>Address</label>
          <input type="text" value={buyerAddress} onChange={e => setBuyerAddress(e.target.value)} />

          <label>ID Proof (PDF/JPG/PNG)</label>
          <input type="file" onChange={e => setIdProof(e.target.files[0])} />

          <label>Payment Mode*</label>
          <select value={paymentMode} onChange={e => setPaymentMode(e.target.value)}>
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>UPI</option>
            <option>Net Banking</option>
            <option>Cash</option>
          </select>

          <label>Transaction ID*</label>
          <input type="text" value={transactionId} onChange={e => setTransactionId(e.target.value)} />

          <label>Amount*</label>
          <input type="number" value={amount} readOnly />

          <label>Payment Receipt (PDF/JPG/PNG)</label>
          <input type="file" onChange={e => setPaymentReceipt(e.target.files[0])} />

          <button type="submit" disabled={loading}>{loading ? "Processing..." : "Submit Buy"}</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>

        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    </div>
  );
}

export default BuyForm;
