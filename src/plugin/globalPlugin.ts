export default {
  install: (app: { [key: string]: any }, options: any) => {
    app.config.globalProperties.$debounce = () => {
      console.log("debounce", app, options);
      let timeout = null || 1;
      return (fnc: () => void) => {
        console.log(fnc);
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          fnc();
        }, 1000);
      };
    };
  },
};
