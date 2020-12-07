export const login = (credentials) => {
  localStorage.setItem("jwtToken", credentials.token);

  return {
    type: "LOGIN",
    payload: credentials,
  };
};

export const logout = () => {
  localStorage.removeItem("jwtToken");
  return {
    type: "LOGOUT",
  };
};

export const allMerchants = (yourMerchants) => {
  return {
    type: "ALL_MERCHANTS",
    payload: yourMerchants,
  };
};
