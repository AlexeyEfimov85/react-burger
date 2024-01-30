import { baseUrl, request } from "../../utils/burger-api";
export const GET_INGREDIENTS = 'GET_INGREDIENTS';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export function getIngredientsAction() {
    // Воспользуемся первым аргументом из усилителя redux-thunk — dispatch
  return function(dispatch: (arg0: { type: string; ingredients?: any; }) => void) {
        // Проставим флаг в хранилище о том, что мы начали выполнять запрос
        // Это нужно, чтоб отрисовать в интерфейсе лоадер или заблокировать 
        // ввод на время выполнения запроса
    dispatch({
      type: GET_INGREDIENTS
    })
        // Запрашиваем данные у сервера
    request(`${baseUrl + '/ingredients'}`)
    .then ((object)=> {
        dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: object.data
          })
    })
    .catch( err => {
            // На основание данных в сторе об ошибке можно строить логику открытия дополнительных попапов
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        })
  }
} 

