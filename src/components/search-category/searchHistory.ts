import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import apiUrl from "@/assets/js/apiUrl";
const keyword = ref("");
const allList = ref<{ [key: string]: any }[]>([]);
const tagList = ref<{ [key: string]: any }[]>([]);
const userList = ref<{ [key: string]: any }[]>([]);
const isTagLastPage = ref(false);
const isUserLastPage = ref(false);
export default function searchHistory() {
  const detector = ref(null);
  const loading = ref(false);
  const page = ref(1);
  const route = useRoute();
  // 태그 검색 찾기
  const tagSearch = () => {
    isTagLastPage.value = false;
    loading.value = true;
    return axios
      .get(apiUrl.tagSearch, {
        params: {
          page: page.value,
          page_size: 20,
          search: keyword.value,
        },
      })
      .then((result: { [key: string]: any }) => {
        console.log("태그검색결과:", result.data.data);
        tagList.value.push(...result.data.data);
        loading.value = false;
        return result.data.data;
      })
      .catch((err: any) => {
        console.log("태그마지막페이지다");
        isTagLastPage.value = true;
        loading.value = false;
        page.value = 1;
      });
  };
  // 유저 검색 찾기
  const userSearch = () => {
    isUserLastPage.value = false;
    return axios
      .get(apiUrl.userSearch, {
        params: {
          page: page.value,
          page_size: 20,
          search: keyword.value,
        },
      })
      .then((result: { [key: string]: any }) => {
        console.log("작가검색결과:", result.data.data);
        userList.value.push(...result.data.data);
        return result.data.data;
      })
      .catch((err: any) => {
        console.log("작가마지막페이지다");
        isUserLastPage.value = true;
        page.value = 1;
      });
  };
  const searchType = () => {
    console.log("searchType실행", keyword.value);
    if (keyword.value.trim().length > 0) {
      allList.value = [];
      userList.value = [];
      tagList.value = [];
      axios.all([tagSearch(), userSearch()]);
    } else if (keyword.value.trim().length == 0) {
      getHistory();
    }
  };
  const getHistory = () => {
    allList.value = [];
    userList.value = [];
    tagList.value = [];
    axios
      .get(apiUrl.searchHistory, {
        params: {
          page: 1,
          page_size: 15,
        },
      })
      .then((result: any) => {
        console.log("검색히스토리결과:", result);
        allList.value.push(...result.data.data);
        result.data.data.forEach((el: { [key: string]: any }) => {
          if (el.tag == null) {
            userList.value.push(el);
          } else {
            tagList.value.push(el);
          }
        });
      });
  };
  const createHistory = (type: string, data: { [key: string]: any }) => {
    axios
      .post(apiUrl.searchHistory + `/${type}`, data)
      .then((result: { [key: string]: any }) => {
        console.log("검색생성결과:", result);
        if (keyword.value.trim().length == 0) {
          getHistory();
        }
      });
  };
  const deleteHistory = (id: number) => {
    axios
      .delete(apiUrl.searchHistory + `/${id}`)
      .then((result: { [key: string]: any }) => {
        console.log("삭제결과:", result);
        if (keyword.value.trim().length == 0) {
          getHistory();
        }
      });
  };

  return {
    loading,
    isTagLastPage,
    isUserLastPage,
    detector,
    keyword,
    page,
    allList,
    userList,
    tagList,
    searchType,
    getHistory,
    createHistory,
    deleteHistory,
    tagSearch,
    userSearch,
  };
}
