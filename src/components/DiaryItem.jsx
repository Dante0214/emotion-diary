import { getEmotionImage } from "../util/get-emotion-image";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import "./DiaryItem.css";

const DiaryItem = ({ id, emotionId, createDate, content }) => {
  const nav = useNavigate();
  return (
    <div className="DiaryItem">
      <div
        onClick={() => nav(`/diary/${id}`)}
        className={`img_section img_section_${emotionId}`}
      >
        <img src={getEmotionImage(emotionId)} alt="emotion" />
      </div>
      <div className="info_section" onClick={() => nav(`/diary/${id}`)}>
        <div className="created_date">
          {new Date(createDate).toLocaleDateString()}
        </div>
        <div className="content">{content}</div>
      </div>
      <div className="button_section">
        <Button onClick={() => nav(`/edit/${id}`)} text={"수정하기"} />
      </div>
    </div>
  );
};

export default DiaryItem;
