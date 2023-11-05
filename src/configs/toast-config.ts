import { ToastOptions, toast, Slide } from "react-toastify";
// import { Slide, Zoom, Flip, Bounce } from "react-toastify";

export const toastOptions: ToastOptions = {
  //   type: toast.TYPE.SUCCESS,
  // position: toast.POSITION.TOP_RIGHT,
  position: "top-right",
  //   icon: MyIcon,
  transition: Slide,
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
};
