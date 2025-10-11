import { useState } from "react";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!username.trim()) newErrors.username = "Username is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!password.trim()) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);

    // Mock API call simulation
    console.log("User registered:", { username, email, password });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">User Registration (Controlled)</h2>
      {submitted && <p className="text-green-600">Form submitted successfully!</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border w-full p-2 rounded"
          />
          {errors.username && <p className="text-red-600 text-sm">{errors.username}</p>}
        </div>

        <div>
          <label className="block font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border w-full p-2 rounded"
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email}</p>}
        </div>

        <div>
          <label className="block font-medium">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border w-full p-2 rounded"
          />
          {errors.password && <p className="text-red-600 text-sm">{errors.password}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 w-full"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
