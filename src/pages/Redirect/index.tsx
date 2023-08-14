import useQuery from "../../hooks/useQuery";
import { apiML } from "../../apis/apiML";
import { useState } from "react";
import { RespTokenType } from "src/types/respToken";
import useLocalStorage from "/src/hooks/useLocalStorage";

const Redirect = () => {
  const storage = useLocalStorage("accessToken");
  const query = useQuery();

  const clientId = import.meta.env.VITE_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

  const [accessToken, setAccessToken] = useState<string>(storage.value);

  const onClickObtemToken = async () => {
    const code = query.get("code");
    const redirectUri = location.origin + location.pathname;

    if (!code) return;
    if (!clientId) return;
    if (!clientSecret) return;

    const params = new URLSearchParams();

    params.append("grant_type", "authorization_code");
    params.append("client_id", clientId);
    params.append("client_secret", clientSecret);
    params.append("code", code);
    params.append("redirect_uri", redirectUri);

    const { data } = await apiML.post<RespTokenType>("/oauth/token", params);

    if (!data) return;

    setAccessToken(data.access_token);
    storage.updateItemStorage(data.access_token);
  };

  const onClickObtemUserTest = async () => {
    const resp = await apiML.post(
      "/users/test_user",
      {
        site_id: "MLB",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("🚀 ~ file: index.tsx:48 ~ onClickObtemUserTest ~ resp:", resp);
  };

  return (
    <>
      <div>Redirect</div>
      <div>Acess Token: {storage.value}</div>
      <button onClick={onClickObtemToken}>Obtem token</button>
      <button onClick={onClickObtemUserTest}>Obtem Usuário de teste</button>
    </>
  );
};

export default Redirect;
