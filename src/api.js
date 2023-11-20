export default class Api {
  constructor(url) {
    this.url = url;
  }

  async dataApi() {
    let datas = {};
    let loading = true;
    try {
      const response = await fetch(this.url);
      const dataJson = await response.json();
      datas = dataJson.products;
      loading = false;
      // console.log("desde api:",data);
    } catch (error) {
      console.error("Error fetching data:", error);
      loading = false;
    }
    return { datas, loading };
  }
}
// export default (async (url) => {
//   const datas = await fetch(url);
//   const dataJson = await datas.json();
//   const datos = dataJson.products;
//   return { datos };
// })();
