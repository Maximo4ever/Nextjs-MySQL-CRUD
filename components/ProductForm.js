import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0,
  });
  const router = useRouter();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (router.query.id) {
      console.log("updating...");
      const res = await axios.put("/api/products/" + router.query.id, product);
      console.log(res);
    } else {
      await axios.post("/api/products", product);
    }
    router.push("/");
  };

  const handleChange = ({ target: { name, value } }) => {
    setProduct({ ...product, [name]: value });
  };

  useEffect(() => {
    const getProduct = async (id) => {
      const { data } = await axios.get("/api/products/" + id);
      setProduct({
        name: data.name,
        description: data.description,
        price: data.price,
      });
    };

    if (router.query?.id) {
      getProduct(router.query.id);
    }
  }, [router.query.id]);

  return (
    <div className="w-full max-w-xs">
      <form
        method="POST"
        action="/api/products"
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded px-8 pt-6 pb-8 mb-4"
      >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={product.name}
          className="shadow border rounded py-2 px-3 text-gray-700"
        />

        <label htmlFor="price">Price:</label>
        <input
          type="text"
          name="price"
          onChange={handleChange}
          value={product.price}
          className="shadow border rounded py-2 px-3 text-gray-700"
        />

        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          rows="2"
          onChange={handleChange}
          value={product.description}
          className="shadow border rounded py-2 px-3 text-gray-700"
        ></textarea>

        <button className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white">
          {router.query.id ? "Update product" : "Save product"}
        </button>
      </form>
    </div>
  );
}
