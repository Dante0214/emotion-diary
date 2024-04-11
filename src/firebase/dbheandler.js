import {
  collection,
  deleteDoc,
  doc,
  addDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { firebaseDB } from "./firebase";

// collection(db, 'collectionPath') 가 접근하고자 하는 db 와 컬렉션의 주소를 가짐
// REST API 를 기준으로 하자면, URI 의 역할을 하는 것.

const DBHandler = {
  async readPost() {
    const querySnapshot = await getDocs(collection(firebaseDB, "/posts"));
    const postData = [];
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      postData.push({ id: doc.id, ...doc.data() });
    });
    return postData;
  },
  async writePost(data) {
    const docRef = await addDoc(collection(firebaseDB, "/posts"), {
      // id: data.id,
      createDate: data.createDate.getTime(),
      emotionId: data.emotionId,
      content: data.content,
      Uid: data.Uid,
    });
    const postData = {
      ...docRef,
      id: docRef.id,
    };
  },
  async updatePostContent(id, data) {
    updateDoc(doc(firebaseDB, `posts/${id}`), {
      id: id,
      createDate: data.createDate.getTime(),
      emotionId: data.emotionId,
      content: data.content,
    });
  },
  async deletePost(id) {
    await deleteDoc(doc(firebaseDB, "posts", id));
  },
};

export default DBHandler;
