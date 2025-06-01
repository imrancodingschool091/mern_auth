import React, { useState } from 'react';
import axios from 'axios';

function Blog() {
  const [inputValue, setInputValue] = useState({
    title: "",
    description: "",
    content: ""
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", inputValue.title);
    formData.append("description", inputValue.description);
    formData.append("content", inputValue.content);
    if (file) {
      formData.append("image", file);
    }

    try {
      const res = await axios.post("http://localhost:3000/api/v1/blog", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Blog created successfully!");
      // Optionally clear the form
      setInputValue({ title: "", description: "", content: "" });
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Error creating blog");
    }
  };

  return (
    <>
      <h1>Create Blog</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={inputValue.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          value={inputValue.description}
          placeholder="Description"
          onChange={handleChange}
        />
        <input
          type="text"
          name="content"
          value={inputValue.content}
          placeholder="Content"
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          onChange={handleImage}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default Blog;
