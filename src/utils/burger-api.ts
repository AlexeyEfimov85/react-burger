
type T = {
  type: string;
  success: string;
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
    login?: string;
  };
  isAuthChecked: string;
  data: [];
  orders: [];
  message: string;
  order: any;
}
export const baseUrl: string = "https://norma.nomoreparties.space/api";
export const checkResponse = (res: { ok: any; json: () => Promise<T>; status: any; }) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export function request(url: string, options?: object) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(checkResponse);
}
const checkReponse = (res: { ok: any; json: () => Promise<T>; status: any; }) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
  return request(`${baseUrl + "/auth/token"}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  })
};


export const fetchWithRefresh = async (url: string, options: any ) => {
  try {
    const res = await fetch(url, options);
    return await checkReponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};


