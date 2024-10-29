export function openSidebar() {
  const sidebar = document.getElementById("sidebar_app");
  if (!sidebar) return;

  sidebar.classList.remove("close");
  sidebar.classList.add("open");
}

export const closeSidebar = () => {
  const sidebar = document.getElementById("sidebar_app");
  if (!sidebar) return;
  sidebar.classList.remove("open");
  sidebar.classList.add("close");
};
