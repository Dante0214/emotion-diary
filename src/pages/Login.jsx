import { useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { Link, useNavigate } from "react-router-dom";
import { FirebaseError } from "firebase/app";
import Button from "../components/Button";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    setError("");
    if (isLoading || email === "" || password === "") return;
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        setError(e.message);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={onSubmit}>
        <input
          ref={emailRef}
          name="email"
          placeholder="Email"
          type="email"
          required
        />
        <input
          ref={passwordRef}
          name="password"
          placeholder="password"
          type="password"
          required
        />
        <Button type="submit" text="Log In" />
      </form>
      <div>
        계정이 없으신가요? <Link to="/createaccount">계정 만들기 &rarr;</Link>
      </div>
    </div>
  );
};

export default Login;
