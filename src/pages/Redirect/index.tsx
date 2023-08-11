import { useParams } from "react-router-dom";

const Redirect = () => {
  const { code, state } = useParams();
  console.log("🚀 ~ file: index.tsx:5 ~ Redirect ~ code:", code);
  console.log("🚀 ~ file: index.tsx:5 ~ Redirect ~ state:", state);

  return <div>Hello world!</div>;
};

export default Redirect;
