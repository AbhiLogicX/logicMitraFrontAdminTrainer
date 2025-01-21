import axios from "axios";
import { toast } from "react-toastify";

import swal from "sweetalert";
function useDelete(url) {
  const Delete = async (id, reloadData) => {
    try {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await axios.delete(`${url}${id}`).then((res) => {
            if (res.status === 200) {
              toast.success(res?.data?.message || "Deleted Successfully");
              reloadData(false);
            }
          });
        } else {
          swal("", { icon: "success" });
        }
      });
    } catch (error) {
      swal({
        icon: "error",
        title: "Oops...",
        text: "An error occurred while deleting the data",
      });
    }
  };

  return [Delete];
}
export { useDelete };
