import axios from "axios";

export default function ProductForm() {
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const response = await axios.post("/api/products", {
      name: "product 1",
      description: "Some description",
      price: 1000,
    });
    console.log(response);
  };

  return (
    <form method="POST" action="/api/products" onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" name="name" />
      <label htmlFor="price">Price:</label>
      <input type="text" name="price" />
      <label htmlFor="description">Description:</label>
      <textarea name="description" rows="2"></textarea>

      <button>Save product</button>
    </form>
  );
}
