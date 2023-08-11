import useQuery from "../../hooks/useQuery";
import { apiML } from "../../apis/apiML";

const Redirect = () => {
  const query = useQuery();
  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  const onClick = async () => {
    const code = query.get("code");

    if (!code) return;
    if (!clientId) return;
    if (!clientSecret) return;

    const params = new URLSearchParams();

    params.append("grant_type", "authorization_code");
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("code", code);
    params.append("redirect_uri", location.href);

    const resp = await apiML.post("/oauth/token", params);
    console.log("🚀 ~ file: index.tsx:25 ~ onClick ~ resp:", resp);
  };

  return (
    <>
      <div>Redirect</div>
      <button onClick={onClick}>Obtem token</button>
    </>
  );
};

export default Redirect;
