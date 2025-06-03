import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ThankYouPage.css";

function ThankYouPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/", { replace: true });
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
      <h2 className="thankyou-header">
    <span className="orange-tick">✔</span> Submission Successful
     </h2>
        <p className="thankyou-subtext">Thank you for completing the test.</p>
        <p className="thankyou-subtext">Redirecting you to the homepage...</p>
      </div>
    </div>
  );
}

export default ThankYouPage;
