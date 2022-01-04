import * as React from 'react';
import axios from 'axios';

import { useKeycloak } from '@react-keycloak/web';

const useHttpClient = (baseUrl) => {
  const axiosInstance = React.useRef();
  const { keycloak, initialized } = useKeycloak();
  const kcToken = keycloak?.token ?? '';

  React.useEffect(() => {
    axiosInstance.current = axios.create({
        baseUrl,
      headers: {
        Authorization: initialized ? `Bearer ${kcToken}` : undefined,
      },
    });

    return () => {
      axiosInstance.current = undefined;
    };
  }, [baseUrl, initialized, kcToken]);

  return axiosInstance;
};

export default useHttpClient;