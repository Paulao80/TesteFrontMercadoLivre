import useQuery from "../../hooks/useQuery";

const Redirect = () => {
  const query = useQuery();

  const code = query.get("code");
  console.log("🚀 ~ file: index.tsx:7 ~ Redirect ~ code:", code);
  const state = query.get("state");
  console.log("🚀 ~ file: index.tsx:9 ~ Redirect ~ state:", state);

  return <div>Hello world!</div>;
};

export default Redirect;
