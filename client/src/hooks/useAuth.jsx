import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import useFetch from "../hooks/useFetch";

export const useAuth = () => {
  const context = useAuthContext();

  const navigate = useNavigate();

  const REGISTER_ROUTE = "/user/register";
  const LOGIN_ROUTE = "/user/login";

  const onReceived = (result) => {
    const token = result.token.replace("Bearer ", "");
    var user = jwt_decode(token);
    context.update(token, user);
    navigate("/homePage");
  };

  const useRegister = useFetch(REGISTER_ROUTE, onReceived);

  const useLogin = useFetch(LOGIN_ROUTE, onReceived);

  const register = ({ username, email, password }) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        username,
        password,
      }),
    };
    useRegister.performFetch(options);
  };

  const login = ({ email, password }) => {
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    };
    useLogin.performFetch(options);
  };

  const logout = () => {
    context.update(null, null);
    navigate("/");
  };

  return {
    login: {
      isLoading: useLogin.isLoading,
      error: useLogin.error,
      performLogin: login,
      cancel: useLogin.cancelFetch,
    },
    register: {
      isLoading: useRegister.isLoading,
      error: useRegister.error,
      performRegister: register,
      cancel: useRegister.cancelFetch,
    },
    user: context.user,
    token: context.token,
    logout,
  };
};
