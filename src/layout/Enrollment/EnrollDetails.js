import { useParams } from "react-router-dom";
import EStudentInfo from "../../components/EnrollmentDetails/EStudentinfo";
import ETrainerInfo from "../../components/EnrollmentDetails/ETrainerinfo";
import { useFetch } from "../../hooks/useFetch";
import Home from "../../Home";

const EnrollDetails = () => {
  const { id } = useParams();
  const [data, error, loading] = useFetch(`/enroll/enroll-detail?eId=${id}`);
  // console.log(data);
  return (
    <>
      <Home>
        <div className="w-[100%] text-white sm:m-3  px-3">
          <EStudentInfo student={data?.data} />
          {/* <ETrainerInfo trainer={data?.data} /> */}
        </div>
      </Home>
    </>
  );
};

export default EnrollDetails;
