
import React from 'react';
import './Service.css';

function Service() {
  const services = [
    {
      title: "Mutual Funds",
      desc: "Invest in top-rated mutual funds for long-term wealth creation."
    },
    {
      title: "SIP Plans",
      desc: "Start monthly SIPs with as low as ₹500 and build your portfolio."
    },
    {
      title: "Fixed Deposits",
      desc: "Guaranteed returns with our high-interest fixed deposit options."
    },
    {
      title: "Retirement Planning",
      desc: "Plan your retirement with customized pension plans and NPS options."
    },
    {
      title: "Tax Saving Schemes",
      desc: "Save tax under 80C with ELSS and other tax-saving instruments."
    }
  ];

  return (
    <div className="service-container">
      <h2>Our Investment Services</h2>
      <div className="service-grid">                     
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.desc}</p>
            <button>Know More</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Service;







