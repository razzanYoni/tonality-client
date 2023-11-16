// Stores access token in session storage
const storeAccessToken = (accessToken: string): void => {
  sessionStorage.setItem("accessToken", accessToken);
};

// Removes access token from session storage
const removeAccessToken = (): void => {
  sessionStorage.removeItem("accessToken");
}

export { storeAccessToken, removeAccessToken }