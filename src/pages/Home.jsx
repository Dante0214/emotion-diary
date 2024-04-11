import Header from "../components/Header";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import { useState, useContext } from "react";
import { DiaryStateContext } from "../App";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

const getMonthlyDate = (pivotDate, data) => {
  const beginTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth(),
    1,
    0,
    0,
    0
  ).getTime();
  const endTime = new Date(
    pivotDate.getFullYear(),
    pivotDate.getMonth() + 1,
    0,
    23,
    59,
    59
  ).getTime();

  return data.filter(
    (item) => beginTime <= item.createDate && item.createDate <= endTime
  );
};

const Home = () => {
  const data = useContext(DiaryStateContext);
  console.log(data);
  const nav = useNavigate();
  const [pivotDate, setPivotDate] = useState(new Date());
  const monthlyData = data ? getMonthlyDate(pivotDate, data) : [];
  const onIncreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
  };
  const onDecreaseMonth = () => {
    setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
  };
  console.log(monthlyData);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      nav("/login"); // 로그아웃 후 리다이렉트할 경로
    } catch (error) {
      console.error("로그아웃 중 에러 발생:", error);
    }
  };

  return (
    <div>
      <Header
        title={`${pivotDate.getFullYear()}년 ${pivotDate.getMonth() + 1}월`}
        leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
        rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
        logout={
          <Button text={"log out"} onClick={handleLogout} type={"NEGATIVE"} />
        }
      />
      <DiaryList data={monthlyData} />
    </div>
  );
};

export default Home;
