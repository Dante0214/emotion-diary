import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useNavigate } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import DBHandler from "../firebase/dbheandler.js";

const Edit = () => {
  const nav = useNavigate();
  const params = useParams();
  const curDiaryItem = useDiary(params.id);

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제하시겠습니까?")) {
      DBHandler.deletePost(String(params.id));

      nav("/", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 정말 수정할까요?")) {
      DBHandler.updatePostContent(params.id, input);

      nav("/", { replace: true });
    }
  };
  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로 가기"} />}
        rightChild={
          <Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />
        }
      />
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};
export default Edit;
