import React, { useState } from "react";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    interests: [],
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => {
        if (checked) {
          return { ...prev, interests: [...prev.interests, value] };
        } else {
          return {
            ...prev,
            interests: prev.interests.filter((interest) => interest !== value),
          };
        }
      });
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "2rem" }}>
      <h1>Newsletter Signup</h1>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="name">Name:</label>
            <br />
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label htmlFor="email">Email:</label>
            <br />
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <fieldset style={{ marginBottom: "1rem" }}>
            <legend>Select your interests:</legend>
            <label>
              <input
                type="checkbox"
                name="interests"
                value="Tech"
                checked={formData.interests.includes("Tech")}
                onChange={handleChange}
              />{" "}
              Tech
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="interests"
                value="Music"
                checked={formData.interests.includes("Music")}
                onChange={handleChange}
              />{" "}
              Music
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="interests"
                value="Travel"
                checked={formData.interests.includes("Travel")}
                onChange={handleChange}
              />{" "}
              Travel
            </label>
          </fieldset>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div>
          <h2>Thank you, {formData.name}!</h2>
          <p>Your email: {formData.email}</p>

          {formData.interests.length > 0 && (
            <>
              <p>Your interests:</p>
              <ul>
                {formData.interests.map((interest) => (
                  <li key={interest}>{interest}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
