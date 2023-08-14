import { useEffect, useState } from "react";
import useLocalStorage from "/src/hooks/useLocalStorage";
import { apiML } from "/src/apis/apiML";
import { CategoryType } from "src/types/category";

const Publicacao = () => {
  const storage = useLocalStorage("accessToken");
  const [title, setTitle] = useState<string>();
  const [category, setCategory] = useState<string>();
  const [categoryes, setCategoryes] = useState<CategoryType[]>([]);

  useEffect(() => {
    apiML
      .get<CategoryType[]>(
        `/sites/MLB/domain_discovery/search?limit=1&q=outro`,
        {
          headers: {
            Authorization: `Bearer ${storage.value}`,
          },
        }
      )
      .then((resp) => {
        setCategoryes(resp.data);
      });
  }, []);

  return (
    <>
      <input
        type="text"
        placeholder="Title"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />

      <select
        placeholder="Categoria"
        onChange={(e) => setCategory(e.target.value)}
        value={category}
      >
        {categoryes.map((item) => (
          <option key={item.category_id} value={item.category_id}>
            {item.category_name}
          </option>
        ))}
      </select>
    </>
  );
};

export default Publicacao;
