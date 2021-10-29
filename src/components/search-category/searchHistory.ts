import { getCurrentInstance, ref } from "vue";
const keyword = ref("");
const tagPage = ref(1);
const userPage = ref(1);
const allList = ref<{ [key: string]: any }[]>([]);
const tagList = ref<{ [key: string]: any }[]>([]);
const userList = ref<{ [key: string]: any }[]>([]);
const detector = ref(null);
const scrollDetectFlag = ref(false);
export default function searchHistory() {
  const globalProperties =
    getCurrentInstance()?.appContext.config.globalProperties;
  const axios = globalProperties?.axios;
  const apiUrl = globalProperties?.apiUrl;
  const emitter = globalProperties?.emitter;
  // 스크롤 감지
  const scrollDetect = () => {
    const selector = detector.value as unknown as HTMLElement;
    if (selector.clientHeight + selector.scrollTop >= selector.scrollHeight) {
      console.log("바닥감지");
      tagPage.value += 1;
      tagSearch().catch((err: any) => {
        console.log("태그추가검색에러:", err);
        tagPage.value = 1;
        selector.removeEventListener("scroll", scrollDetect);
      });
    }
  };
  // const selector = detector.value as unknown as HTMLElement;
  // selector.addEventListener("scroll", scrollDetect);

  // 태그 검색 찾기
  const tagSearch = () => {
    console.log("태그검색호출", tagPage.value, keyword.value);
    return axios
      .get(apiUrl.tagSearch, {
        params: {
          page: tagPage.value,
          page_size: 20,
          search: keyword.value,
        },
      })
      .then((result: { [key: string]: any }) => {
        console.log("태그검색결과:", result.data.data);
        tagList.value.push(...result.data.data);
        return result.data.data;
      });
  };
  // 유저 검색 찾기
  const userSearch = () => {
    console.log("작가검색호출");
    return axios
      .get(apiUrl.userSearch, {
        params: {
          page: userPage.value,
          page_size: 20,
          search: keyword.value,
        },
      })
      .then((result: { [key: string]: any }) => {
        console.log("작가검색결과:", result.data.data);
        userList.value.push(...result.data.data);
        return result.data.data;
      });
  };
  const searchType = () => {
    console.log("검색타입시작", keyword.value, keyword);
    if (keyword.value.trim().length > 0) {
      allList.value = [];
      userList.value = [];
      tagList.value = [];
      axios.all([tagSearch(), userSearch()]).then(
        axios.spread((...response: any) => {
          console.log("검색결과:", response);
          tagList.value.push(...response[0]);
          userList.value.push(...response[1]);
        })
      );
    } else if (keyword.value.trim().length == 0) {
      getHistory();
    }
  };
  const getHistory = () => {
    allList.value = [];
    userList.value = [];
    tagList.value = [];
    axios.get(apiUrl.searchHistory).then((result: any) => {
      console.log("검색히스토리결과:", result);
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
    detector,
    keyword,
    tagPage,
    userPage,
    allList,
    userList,
    tagList,
    searchType,
    getHistory,
    createHistory,
    deleteHistory,
    tagSearch,
    userSearch,
    scrollDetect,
  };
}
