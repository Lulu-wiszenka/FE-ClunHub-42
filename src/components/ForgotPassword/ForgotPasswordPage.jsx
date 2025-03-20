import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ForgotPasswordPage.module.css";
import clanHubLogo from "../../assets/images/Logo2.png";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Email is required");
      return;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setIsSubmitting(true);
    // Здесь ДОБАВИТЬ отправить запрос на сервер для восстановления пароля
    setTimeout(() => {
      setIsSubmitting(false);
      navigate("/login"); // Перенаправление после отправки кода
    }, 2000);
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <img src={clanHubLogo} alt="ClanHub Logo" className={styles.logo} />
        </div>
        
        <h2 className={styles.title}>Recover password</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your e-mail"
            className={styles.input}
            disabled={isSubmitting}
          />
          {error && <span className={styles.error}>{error}</span>}
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send code"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;