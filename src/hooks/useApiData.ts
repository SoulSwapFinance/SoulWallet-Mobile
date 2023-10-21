import React, { useContext } from "react"
import { ApiDataContext } from "services/api/apiDataProvider"

const useApiData = () => {
  // @ts-ignore
  const [apiData, dispatchApiData] = useContext(ApiDataContext);

  return { apiData, dispatchApiData };
};

export default useApiData;