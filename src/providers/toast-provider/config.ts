import { ToastOptions, toast, Slide } from "react-toastify";
// import { Slide, Zoom, Flip, Bounce } from "react-toastify";

export const toastOptions: ToastOptions = {
  //   type: toast.TYPE.SUCCESS,
  position: toast.POSITION.TOP_RIGHT,
  //   icon: MyIcon,
  transition: Slide,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};
