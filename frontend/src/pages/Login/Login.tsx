import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signUp } from "../../api/authApi";
import styles from "./Login.module.css";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Sign Up Modal State
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpName, setSignUpName] = useState("");
  const [signUpError, setSignUpError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userPic", data.user.profilePic);
      navigate("/tasks");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(signUpUsername, signUpPassword, signUpName);
      alert("Sign up successful! Please log in.");
      setShowSignUpModal(false);
    } catch (err) {
      setSignUpError("Error creating user. Please try again.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <h2>Login</h2>
      {error && <p className={styles.errorMsg}>{error}</p>}
      <form onSubmit={handleLogin} className={styles.loginForm}>
        <div>
          <label>Username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>

      <button onClick={() => setShowSignUpModal(true)}>Sign Up</button>

      {/* Sign Up Modal */}
      {showSignUpModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Create an Account</h3>
            {signUpError && <p className={styles.errorMsg}>{signUpError}</p>}
            <form onSubmit={handleSignUp}>
              <div>
                <label>Username</label>
                <input
                  value={signUpUsername}
                  onChange={(e) => setSignUpUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  value={signUpPassword}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Name</label>
                <input
                  value={signUpName}
                  onChange={(e) => setSignUpName(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Sign Up</button>
              <button type="button" onClick={() => setShowSignUpModal(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
