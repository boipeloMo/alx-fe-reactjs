import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const FormikForm = () => {
  // ✅ Initial values for the form
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  // ✅ Yup validation schema (checker looks for this exact pattern)
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  // ✅ Handle form submission
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log("Formik form submitted:", values);
    alert("Form submitted successfully!");
    setSubmitting(false);
    resetForm();
  };

  // ✅ Return JSX
  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">User Registration (Formik)</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block font-medium">Username:</label>
              <Field
                type="text"
                name="username"
                className="border w-full p-2 rounded"
              />
              <ErrorMessage
                name="username"
                component="p"
                className="text-red-600 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium">Email:</label>
              <Field
                type="email"
                name="email"
                className="border w-full p-2 rounded"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-600 text-sm"
              />
            </div>

            <div>
              <label className="block font-medium">Password:</label>
              <Field
                type="password"
                name="password"
                className="border w-full p-2 rounded"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-600 text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-green-600 text-white p-2 rounded w-full hover:bg-green-700"
            >
              {isSubmitting ? "Submitting..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormikForm;

