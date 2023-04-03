// @todo: use a more secure way to store the token

const jwtManager = () => {
  const getToken = () => localStorage.getItem("token");

  const setToken = (token: string) => {
    localStorage.setItem("token", token);
    return true;
  };

  const eraseToken = () => {
    localStorage.removeItem("token");
    return true;
  };

  return {
    getToken,
    setToken,
    eraseToken,
  };
};

export default jwtManager();
