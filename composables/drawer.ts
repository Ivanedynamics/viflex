const drawerId = "my_drawer_app";

export const handleOpenCart = () => {
  const drawerCheckbox = document.getElementById(drawerId) as HTMLInputElement;
  if (!drawerCheckbox) {
    return;
  }
  drawerCheckbox.checked = true;
};

export const handleCloseCart = () => {
  const drawerCheckbox = document.getElementById(drawerId) as HTMLInputElement;
  if (!drawerCheckbox) {
    return;
  }
  drawerCheckbox.checked = false;
};
