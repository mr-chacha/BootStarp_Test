import { makeAutoObservable } from "mobx";
import axios from "axios";

class DataStore {
  data = [];

  constructor() {
    makeAutoObservable(this);
  }

  fetchData() {
    axios
      .get("http://localhost:3001/post") // 서버 주소
      .then((response) => {
        this.data = response.data;
      })
      .catch((error) => {
        console.error(error);
        // 오류 처리
      });
  }
}

const dataStore = new DataStore();
export default dataStore;
