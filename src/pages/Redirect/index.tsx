import { useParams } from "react-router-dom";
const Redirect = () => {
  const params = useParams();
  console.log("🚀 ~ file: index.tsx:4 ~ Redirect ~ params:", params);

  return <></>;
};

export default Redirect;
