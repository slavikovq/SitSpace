import Swal from "sweetalert2";

export const alert = (icon, title) => {
  const Alert = Swal.mixin({
    toast: true,
    position: "top-end",
    timer: 4000,
    color: "black",
    showConfirmButton: false,
    timerProgressBar: true,
  });
  Alert.fire({
    icon: icon,
    title: title,
  });
}