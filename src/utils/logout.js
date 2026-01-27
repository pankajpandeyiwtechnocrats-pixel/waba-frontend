export function logout() {
  // Clear auth & app state
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  localStorage.removeItem("currentProject");

  // Redirect to login
  window.location.replace("/login");
}
