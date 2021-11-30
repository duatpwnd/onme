import { ref, computed } from "vue";
import axios from "axios";
import apiUrl from "@/assets/js/apiUrl";
import router from "@/router";
import store from "@/store";
const userInfo = computed(() => store.state.userStore.userInfo);
const keyword = ref("");
const allList = ref([]);
const tagList = ref([]);
const userList = ref([]);
const isTagLastPage = ref(false);
const isUserLastPage = ref(false);
export default function searchHistory() {
  const detector = ref(null);
  const loading = ref(false);
  const page = ref(1);
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
      .then((result) => {
        console.log("태그검색결과:", result.data.data);
        tagList.value.push(...result.data.data);
        loading.value = false;
        return result.data.data;
      })
      .catch((err) => {
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
      .then((result) => {
        console.log("작가검색결과:", result.data.data);
        userList.value.push(...result.data.data);
        return result.data.data;
      })
      .catch((err) => {
        console.log("작가마지막페이지다");
        isUserLastPage.value = true;
        page.value = 1;
      });
  };
  const searchType = () => {
    console.log("searchType실행", keyword.value);
    router.push({
      query: {},
    });
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
    if (userInfo.value.id != undefined) {
      axios
        .get(apiUrl.searchHistory, {
          params: {
            page: 1,
            page_size: 15,
          },
        })
        .then((result) => {
          console.log("검색히스토리결과:", result);
          allList.value.push(...result.data.data);
          result.data.data.forEach((el) => {
            if (el.tag == null) {
              userList.value.push(el);
            } else {
              tagList.value.push(el);
            }
          });
        });
    }
  };
  const createHistory = (type, data) => {
    if (userInfo.value.id != undefined) {
      axios.post(apiUrl.searchHistory + `/${type}`, data).then((result) => {
        console.log("검색생성결과:", result);
        if (keyword.value.trim().length == 0) {
          getHistory();
        }
      });
    }
  };
  const deleteHistory = (id) => {
    axios.delete(apiUrl.searchHistory + `/${id}`).then((result) => {
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
