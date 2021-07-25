import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

// @ts-ignore
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_INIT':
      return {
        ...state,
        isLoading: true,
        isError: false
      };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case 'FETCH_FAILURE':
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

// @ts-ignore
const useDataApi = (query, initialData, doNow) => {
  const [url, setUrl] = useState(`http://localhost:3000/v1/amusinguserserv/${query}`);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });

  useEffect(() => {
    let didCancel = false;

    const fetchData = async () => {
      // @ts-ignore
      dispatch({ type: 'FETCH_INIT' });

      try {
        const result = await axios(url);

        if (!didCancel) {
          // @ts-ignore
          dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          // @ts-ignore
          dispatch({ type: 'FETCH_FAILURE' });
        }
      }
    };

    if (doNow) {
      fetchData();
    }

    return () => {
      didCancel = true;
    };
  }, [url, doNow]);

  return [state, setUrl];
};

export default useDataApi;
