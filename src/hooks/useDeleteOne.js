import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
const useDeleteOne = (url) => {
  const navigate = useNavigate();

  const Delete = async (id, redirectUrl) => {
    try {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        //console.log("willDelete", willDelete);
        if (willDelete) {
          await axios.delete(`${url}${id}`).then((res) => {
            if (res.status === 200) {
              toast.success(res?.data?.message || "Deleted Successfully");
              navigate(redirectUrl);
            }
          });
        } else {
          swal("", { icon: "success" });
        }
      });
      // const res = await axios.delete(`${url}${id}`);

      // if (res.status === 200) {
      //   swal({
      //     title: "Are you sure?",
      //     text: "you want to delete this !",
      //     icon: "warning",
      //     buttons: true,
      //     dangerMode: true,
      //   });

      //

      //   //   //  setTimeout(() => {
      //   //   //   window.location.reload()
      //   //   //  }, 2000);
      // }
    } catch (error) {
      swal({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while deleting the data",
      });
    }
  };

  return { Delete };
};
export { useDeleteOne };
