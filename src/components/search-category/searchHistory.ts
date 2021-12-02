import { ref, computed } from "vue";
import axios from "axios";
import apiUrl from "@/assets/js/apiUrl";
import router from "@/router";
import store from "@/store";
const userInfo = computed(() => store.state.userStore.userInfo);
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
        userList.value.push(...result.data.data);
        return result.data.data;
      })
      .catch((err) => {
        isUserLastPage.value = true;
        page.value = 1;
      });
  };
  const searchType = () => {
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
  const getSearchList = JSON.parse(
    localStorage.getItem("search_word_list") as string
  );
  const arr = getSearchList == null ? [] : getSearchList;

  const getHistory = () => {
    allList.value = [];
    userList.value = [];
    tagList.value = [];
    return new Promise((resolve) => {
      if (userInfo.value.id != undefined) {
        return axios
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
            resolve(result.data.data);
          });
      } else {
        console.log("겟서치", getSearchList);
        if (getSearchList != null) {
          getSearchList.forEach((el: { [key: string]: any }) => {
            allList.value.push(el);
            if (el.title != null) {
              tagList.value.push(el);
            } else {
              userList.value.push(el);
            }
          });
        }
      }
    });
  };
  const createHistory = (
    type: string,
    data: { [key: string]: any },
    info: { [key: string]: any }
  ) => {
    return new Promise((resolve, reject) => {
      if (userInfo.value.id != undefined) {
        axios
          .post(apiUrl.searchHistory + `/${type}`, data)
          .then((result: { [key: string]: any }) => {
            if (keyword.value.trim().length == 0) {
              getHistory().then((list) => {
                localStorage.removeItem("search_word_list");
                localStorage.setItem("search_word_list", JSON.stringify(list));
              });
            }
            resolve(result);
          });
      } else {
        const filter = arr.findIndex((el: { [key: string]: any }) => {
          return JSON.stringify(el) == JSON.stringify(info);
        });
        if (filter >= 0) {
          arr.splice(filter, 1);
        }
        arr.unshift(info);
        localStorage.setItem("search_word_list", JSON.stringify(arr));
        getHistory().then();
      }
    });
  };
  const deleteHistory = (id: number) => {
    if (userInfo.value.id != undefined) {
      axios
        .delete(apiUrl.searchHistory + `/${id}`)
        .then((result: { [key: string]: any }) => {
          console.log("삭제결과:", result);
          if (keyword.value.trim().length == 0) {
            getHistory().then((list) => {
              localStorage.removeItem("search_word_list");
              localStorage.setItem("search_word_list", JSON.stringify(list));
            });
          }
        });
    } else {
      const filter = arr.findIndex((el: { [key: string]: any }) => {
        return el.id == id;
      });
      if (filter >= 0) {
        arr.splice(filter, 1);
      }
      localStorage.setItem("search_word_list", JSON.stringify(arr));
      getHistory();
    }
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
