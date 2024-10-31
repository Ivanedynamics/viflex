export const sidebarId = "my_sidebar_app";

export const handleOpenSidebar = () => {
  const drawerCheckbox = document.getElementById(sidebarId) as HTMLInputElement;
  if (!drawerCheckbox) {
    return;
  }
  drawerCheckbox.checked = true;
};

export const handleCloseSidebar = () => {
  const drawerCheckbox = document.getElementById(sidebarId) as HTMLInputElement;
  if (!drawerCheckbox) {
    return;
  }
  drawerCheckbox.checked = false;
};
