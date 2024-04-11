import { useParams, useNavigate } from "react-router-dom";
import { getStringedDate } from "../util/get-stringed-data";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
const Diary = () => {
  const nav = useNavigate();
  const params = useParams();
  const curDiaryItem = useDiary(params.id);

  if (!curDiaryItem) {
    return <div>로딩중...!</div>;
  }

  const { createDate, emotionId, content } = curDiaryItem;
  const title = getStringedDate(new Date(createDate));

  return (
    <div>
      <Header
        title={title}
        leftChild={<Button text={"< 뒤로 가기"} onClick={() => nav(-1)} />}
        rightChild={
          <Button text={"수정하기"} onClick={() => nav(`/edit/${params.id}`)} />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diary;
