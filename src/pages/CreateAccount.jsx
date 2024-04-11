import { useState } from "react";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";

const CreateAccount = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === "" || email === "" || password === "") return;
    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(credentials.user);
      // 이름 부여
      await updateProfile(credentials.user, {
        displayName: name,
      });

      alert(`${name}님 회원가입 축하드립니다`);
      nav("/");
    } catch (e) {
      if (e instanceof FirebaseError) {
        alert(e.message);
      }
    }
  };
  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  return (
    <div className="CreateAccount">
      계정 생성 페이지
      <form className="form" onSubmit={onSubmit}>
        <input
          className="input_name"
          onChange={onChange}
          type="text"
          value={name}
          name="name"
          placeholder="Username"
          required
        />
        <input
          className="input_email"
          onChange={onChange}
          type="email"
          value={email}
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="input_password"
          onChange={onChange}
          name="password"
          type="password"
          value={password}
          placeholder="Password"
          required
        />
        <Button text="제출" type="submit" />
      </form>
      <div>
        이미 계정이 있으신가요? <Link to="/login">로그인 하기 &rarr;</Link>
      </div>
    </div>
  );
};
export default CreateAccount;
