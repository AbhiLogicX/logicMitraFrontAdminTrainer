import { createContext, useContext, useState } from "react";

const Appcontext = createContext();
const SubcatContext = ({ children }) => {
  const [subcatData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [categoryId, setcatId] = useState();
  const [courseId, setCourseId] = useState();
  const [trainerId, setTrainerId] = useState();

  return (
    <>
      <Appcontext.Provider
        value={{
          categoryId,
          setcatId,
          subcatData,
          setData,
          courseId,
          setCourseId,
          trainerId,
          setTrainerId,
          loading,
          setLoading,
          error,
          setError,
        }}
      >
        {children}
      </Appcontext.Provider>
    </>
  );
};

const UsesubcategoriesContext = () => {
  return useContext(Appcontext);
};
export { SubcatContext, UsesubcategoriesContext, Appcontext };
