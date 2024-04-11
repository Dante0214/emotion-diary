import { Outlet } from "react-router-dom";
import "./App.css";
import { createContext, useState, useEffect } from "react";
import { firebaseDB, auth } from "./firebase/firebase"; // Firebase DB 객체를 import
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
export const DiaryStateContext = createContext();

function App() {
  const [postData, setPostData] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    // 인증 상태 변화를 감지하는 리스너 설정
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        // 사용자가 로그인한 경우
        const uid = user.uid;
        const postQuery = query(
          collection(firebaseDB, "posts"),
          where("Uid", "==", uid)
        );

        // Firestore 데이터 구독 시작
        const unsubscribeData = onSnapshot(postQuery, (snapshot) => {
          const postDataArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPostData(postDataArray);
          setLoading(false);
        });

        // 데이터 구독 해제 함수를 반환
        return () => unsubscribeData();
      } else {
        // 사용자가 로그아웃한 경우
        setPostData([]);
        setLoading(false); // postData 상태를 비웁니다.
      }
    });

    // 인증 상태 구독 해제 함수를 클린업 함수로 반환
    return () => unsubscribeAuth();
  }, []);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(postData);
  return (
    <>
      <DiaryStateContext.Provider value={postData}>
        {/* <CreateAccount /> */}
        <Outlet />
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
