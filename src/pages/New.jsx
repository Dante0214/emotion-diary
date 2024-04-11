import Header from "../components/Header";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Editor from "../components/Editor";
import DBHandler from "../firebase/dbheandler.js";
import { auth } from "../firebase/firebase.js";
const New = () => {
  const nav = useNavigate();
  const onSubmit = (input) => {
    DBHandler.writePost(input); // 예시 값);
    nav("/", { replace: true });
  };

  return (
    <div>
      <Header
        title={"새 일기 쓰기"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
      />

      <Editor onSubmit={onSubmit} />
    </div>
  );
};
export default New;
