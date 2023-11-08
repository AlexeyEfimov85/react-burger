export const baseUrl = 'https://norma.nomoreparties.space/api';
export const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка ${res.status}`);
    }


export const getIngredients = () => {
      fetch( `${baseUrl + '/ingredients'}`)
        .then(checkResponse)
        .then((object) => {
          return object.data;
        })
        .catch((err) => console.log(err));
      }