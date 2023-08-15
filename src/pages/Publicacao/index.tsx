import "./style.css";
import { useEffect, useMemo, useState } from "react";
import useLocalStorage from "/src/hooks/useLocalStorage";
import { apiML } from "/src/apis/apiML";
import { CategoryDetailType, CategoryType } from "src/types/category";
import { CurrencyType } from "src/types/currency";
import { ListingType } from "src/types/listing";
import {
  AllowedUnitsType,
  SaleTermsType,
  ValuesSaleTermsType,
} from "src/types/saleTerms";
import { PictureType } from "src/types/picture";

const Publicacao = () => {
  const storage = useLocalStorage("accessToken");

  const [categoryes, setCategoryes] = useState<CategoryType[]>([]);
  const [categoryChildrens, setCategoryChildrens] = useState<CategoryType[]>(
    []
  );
  const [currencies, setCurrencies] = useState<CurrencyType[]>([]);
  const [listingTypes, setListingTypes] = useState<ListingType[]>([]);
  const [warrantyTypes, setWarrantyTypes] = useState<ValuesSaleTermsType[]>([]);
  const [warrantyTimes, setWarrantyTimes] = useState<AllowedUnitsType[]>([]);

  const [title, setTitle] = useState<string>();
  const [category_root_id, setCategory_root_id] = useState<string>();
  const [category_id, setCategory_id] = useState<string>();
  const [price, setPrice] = useState<number>();
  const [currency_id, setCurrency_id] = useState<string>();
  const [available_quantity, setAvailable_quantity] = useState<number>();
  const [condition, setCondition] = useState<string>();
  const [listing_type_id, setListing_type_id] = useState<string>();
  const [warranty_type, setWarranty_type] = useState<string>();
  const [warranty_time_value, setWarranty_time_value] = useState<string>();
  const [warranty_time_desc, setWarranty_time_desc] = useState<string>();
  const [pictures, setPictures] = useState<PictureType[]>([
    { source: undefined },
  ]);
  const [brand, setBrand] = useState<string>();
  const [model, setModel] = useState<string>();

  const warranty_time = useMemo(
    () => `${warranty_time_value} ${warranty_time_desc}`,
    [warranty_time_value, warranty_time_desc]
  );

  const sale_terms = useMemo(
    () => [
      {
        id: "WARRANTY_TYPE",
        value_name: warranty_type,
      },
      {
        id: "WARRANTY_TIME",
        value_name: warranty_time,
      },
    ],
    [warranty_type, warranty_time]
  );

  const attributes = useMemo(
    () => [
      {
        id: "BRAND",
        value_name: brand,
      },
      {
        id: "MODEL",
        value_name: model,
      },
    ],
    [brand, model]
  );

  const formValues = useMemo(
    () => ({
      title,
      category_id,
      price,
      currency_id,
      available_quantity,
      buying_mode: "buy_it_now",
      condition,
      listing_type_id,
      sale_terms,
      pictures,
      attributes,
    }),
    [
      title,
      category_id,
      price,
      currency_id,
      available_quantity,
      condition,
      listing_type_id,
      sale_terms,
      pictures,
      attributes,
    ]
  );

  console.log("🚀 ~ file: index.tsx:81 ~ Publicacao ~ formValues:", formValues);

  async function getCategoryesRoot() {
    const resp = await apiML.get<CategoryType[]>(`/sites/MLB/categories`, {
      headers: {
        Authorization: `Bearer ${storage.value}`,
      },
    });

    setCategoryes(resp.data);
  }

  async function getCurrencies() {
    const resp = await apiML.get<CurrencyType[]>("/currencies");

    setCurrencies(resp.data);
  }

  async function getListingTypes() {
    const resp = await apiML.get<ListingType[]>("/sites/MLB/listing_types");

    setListingTypes(resp.data);
  }

  async function getSalesTerms(category_root_id: string) {
    const resp = await apiML.get<SaleTermsType[]>(
      `/categories/${category_root_id}/sale_terms`
    );

    const wtp = resp?.data?.find((v) => v.id === "WARRANTY_TYPE")?.values;
    if (wtp) setWarrantyTypes(wtp);

    const wtm = resp?.data.find((v) => v.id === "WARRANTY_TIME")?.allowed_units;
    if (wtm) setWarrantyTimes(wtm);
  }

  async function getCategoryChildrens(category_root_id: string) {
    const resp = await apiML.get<CategoryDetailType>(
      `/categories/${category_root_id}`
    );

    setCategoryChildrens(resp?.data?.children_categories);
  }

  useEffect(() => {
    Promise.all([getCategoryesRoot(), getCurrencies(), getListingTypes()]);
  }, []);

  useEffect(() => {
    if (category_root_id) {
      Promise.all([
        getSalesTerms(category_root_id),
        getCategoryChildrens(category_root_id),
      ]);
    }
  }, [category_root_id]);

  function onChangePictures(value: string, index: number) {
    setPictures((prev) => {
      prev[index] = { source: value };

      return prev;
    });
  }

  async function onSave() {
    const resp = await apiML.post("/items", formValues, {
      headers: {
        Authorization: `Bearer ${storage.value}`,
      },
    });

    console.log("🚀 ~ file: index.tsx:141 ~ onSave ~ resp:", resp);
  }

  return (
    <div className="container">
      <div className="input-ctn">
        <div>Title</div>
        <input
          className="ipt"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </div>

      <div className="input-ctn">
        <div>Category</div>
        <select
          className="ipt"
          onChange={(e) => setCategory_root_id(e.target.value)}
          value={category_root_id}
        >
          <option></option>

          {categoryes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <select
          className="ipt"
          onChange={(e) => setCategory_id(e.target.value)}
          value={category_id}
          disabled={!category_root_id}
        >
          <option></option>

          {categoryChildrens.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="input-ctn">
        <div>Price</div>
        <input
          className="ipt"
          type="number"
          onChange={(e) => setPrice(Number(e.target.value))}
          value={price}
        />
      </div>

      <div className="input-ctn">
        <div>Currency</div>
        <select
          className="ipt"
          onChange={(e) => setCurrency_id(e.target.value)}
          value={currency_id}
        >
          <option></option>
          {currencies.map((item) => (
            <option key={item.id} value={item.id}>
              {item.description}
            </option>
          ))}
        </select>
      </div>

      <div className="input-ctn">
        <div>Quantity</div>
        <input
          className="ipt"
          type="number"
          onChange={(e) => setAvailable_quantity(Number(e.target.value))}
          value={available_quantity}
        />
      </div>

      <div className="input-ctn">
        <div>Condition</div>
        <select
          className="ipt"
          onChange={(e) => setCondition(e.target.value)}
          value={condition}
        >
          <option></option>
          <option value="new">Novo</option>
          <option value="used">Usado</option>
          <option value="not_specified">Não especificado</option>
        </select>
      </div>

      <div className="input-ctn">
        <div>Listing type</div>
        <select
          className="ipt"
          onChange={(e) => setListing_type_id(e.target.value)}
          value={listing_type_id}
        >
          <option></option>
          {listingTypes.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="input-ctn">
        <div>Warranty type</div>
        <select
          className="ipt"
          onChange={(e) => setWarranty_type(e.target.value)}
          value={warranty_type}
          disabled={!category_root_id}
        >
          {warrantyTypes.map((item) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="input-ctn">
        <div>Warranty time</div>
        <div className="ipt-group">
          <input
            onChange={(e) => setWarranty_time_value(e.target.value)}
            value={warranty_time_value}
            disabled={!category_root_id}
          />

          <select
            onChange={(e) => setWarranty_time_desc(e.target.value)}
            value={warranty_time_desc}
            disabled={!category_root_id}
          >
            {warrantyTimes.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="input-ctn">
        <div>Brand</div>
        <input
          className="ipt"
          type="text"
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
        />
      </div>

      <div className="input-ctn">
        <div>Model</div>
        <input
          className="ipt"
          type="text"
          onChange={(e) => setModel(e.target.value)}
          value={model}
        />
      </div>

      <div className="input-ctn">
        <div>Pictures</div>
        {pictures.map((pic, index) => {
          const key = `key-${index}`;
          return (
            <input
              key={key}
              className="ipt"
              placeholder="Source"
              value={pic.source}
              onChange={(e) => onChangePictures(e.target.value, index)}
            />
          );
        })}
        <div>
          <button
            onClick={() => {
              setPictures((prev) => {
                const newPrev = [...prev];
                if (newPrev.length > 1) newPrev.pop();

                return newPrev;
              });
            }}
          >
            -
          </button>
          <button
            onClick={() => {
              setPictures((prev) => {
                if (prev.length < 6) return prev.concat({ source: undefined });
                return prev;
              });
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className="btn-ctn">
        <button onClick={onSave}>Save</button>
      </div>
    </div>
  );
};

export default Publicacao;
