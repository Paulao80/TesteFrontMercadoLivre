import { useEffect, useState } from "react";
import useLocalStorage from "/src/hooks/useLocalStorage";
import { apiML } from "/src/apis/apiML";
import { CategoryType } from "src/types/category";
import { CurrencyType } from "src/types/currency";

const Publicacao = () => {
  const storage = useLocalStorage("accessToken");

  const [categoryes, setCategoryes] = useState<CategoryType[]>([]);
  const [currencies, setCurrencies] = useState<CurrencyType[]>([]);

  const [title, setTitle] = useState<string>();
  const [category_id, setCategory_id] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [currency_id, setCurrency_id] = useState<string>();

  useEffect(() => {
    apiML
      .get<CategoryType[]>(`/sites/MLB/categories`, {
        headers: {
          Authorization: `Bearer ${storage.value}`,
        },
      })
      .then((resp) => setCategoryes(resp.data));

    apiML
      .get<CurrencyType[]>("/currencies/", {
        headers: {
          Authorization: `Bearer ${storage.value}`,
        },
      })
      .then((resp) => setCurrencies(resp.data));
  }, []);

  return (
    <>
      <div>
        <div>Title</div>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>

      <div>
        <div>Category</div>
        <select
          onChange={(e) => setCategory_id(e.target.value)}
          value={category_id}
        >
          {categoryes.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div>Price</div>
        <input
          type="number"
          onChange={(e) => setPrice(Number(e.target.value))}
          value={price}
        />
      </div>

      <div>
        <div>Currency</div>
        <select
          onChange={(e) => setCurrency_id(e.target.value)}
          value={currency_id}
        >
          {currencies.map((item) => (
            <option key={item.id} value={item.description}>
              {item.description}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Publicacao;
