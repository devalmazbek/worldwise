import { useContext, createContext, useReducer, useEffect } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  error: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: false,
      };

    case "logout":
      return { ...state, isAuthenticated: false, error: false };

    case "error":
      return { ...state, error: true };

    default:
      throw new Error("Unknown action type");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    console.log(email, password);
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    } else {
      dispatch({ type: "error" });
    }
    localStorage.setItem("user", JSON.stringify(FAKE_USER));
  }

  function logout() {
    dispatch({ type: "logout" });
    localStorage.removeItem("user");
  }

  useEffect(function () {
    if (localStorage.getItem("user")) {
      dispatch({ type: "login", payload: localStorage.getItem("user") });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("AuthContext is outside of AuthProvide");
  }
  return context;
}

export { AuthProvider, useAuth };
