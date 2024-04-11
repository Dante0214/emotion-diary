import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/firebase";

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const nav = useNavigate();
  useEffect(() => {
    // 사용자 상태 변경 리스너 설정

    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user); // 사용자 상태 업데이트
      if (!user) {
        nav("/login");
      }
    });

    // 컴포넌트 언마운트 시 리스너 해제
    return () => unsubscribe();
  }, [auth.currentUser]);

  // 사용자 로그인 상태를 확인하여 적절한 라우팅 처리
  if (user === null) {
    // 사용자 상태를 아직 확인하지 못한 경우 로딩 중 표시
    return <div>Loading...</div>;
  } else if (!user) {
    // 사용자가 로그인하지 않은 경우 로그인 페이지로 리디렉션
    return nav("/login");
  } else {
    // 사용자가 로그인한 경우 보호된 컨텐츠를 렌더링
    return <>{children}</>;
  }
};

export default ProtectedRoute;
