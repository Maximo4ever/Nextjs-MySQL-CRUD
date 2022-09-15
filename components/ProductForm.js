import { useState } from "react";
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
    const response = await axios.post("/api/products", product);
    console.log(response);
    router.push("/");
  };

  const handleChange = ({ target: { name, value } }) => {
    setProduct({ ...product, [name]: value });
  };

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
          className="shadow border rounded py-2 px-3 text-gray-700"
        />

        <label htmlFor="price">Price:</label>
        <input
          type="text"
          name="price"
          onChange={handleChange}
          className="shadow border rounded py-2 px-3 text-gray-700"
        />

        <label htmlFor="description">Description:</label>
        <textarea
          name="description"
          rows="2"
          onChange={handleChange}
          className="shadow border rounded py-2 px-3 text-gray-700"
        ></textarea>

        <button className="bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded text-white">
          Save product
        </button>
      </form>
    </div>
  );
}
