import { createContext, useContext, useState } from "react";

const Appcontext = createContext();
const SubModuleContext = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({
    status: false,
    message: "",
  });
  const [moduleId, setModuleId] = useState();

  return (
    <>
      <Appcontext.Provider
        value={{
          moduleId,
          setModuleId,
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

const UseCourseContext = () => {
  return useContext(Appcontext);
};
export { SubModuleContext, UseCourseContext, Appcontext };
