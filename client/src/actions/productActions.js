import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
} from '../constants/productConstants'


// 상품 목록 조회 액션 (검색어 포함 가능)
export const listProducts = (queryString = '') => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST })

    let url = '/api/products/'
    
    if (queryString) {
      url += queryString.startsWith('?') ? queryString : `?${queryString}` // queryString이 ?로 시작하면 그대로 사용, 아니면 ?를 붙임
    }

    const { data } = await axios.get(url)

    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    })
  } 
  
  catch (error) {
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    })
  }
}


// 상품 상세 조회 액션
export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}