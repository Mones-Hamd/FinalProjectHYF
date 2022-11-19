import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";
import useFetch from "./useFetch";
export const useResult = () => {
  const { token } = useAuthContext();
  const [result, setResult] = useState({});
  const { eventId } = useParams();
  const onRecived = (result) => {
    setResult(result.result);
  };
  const useGetResult = useFetch(`/event/results/${eventId}`, onRecived);
  const getResult = () => {
    const options = {
      method: "GET",
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    useGetResult.performFetch(options);
  };
  return {
    getResult: {
      isLoading: useGetResult.isLoading,
      error: useGetResult.error,
      perform: getResult,
      cancel: useGetResult.cancelFetch,
      isSuccess: useGetResult.isSuccess,
    },
    result,
  };
};
