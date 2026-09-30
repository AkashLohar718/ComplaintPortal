import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import API from "../../services/api";
import "./SubmitComplaint.css";

function SubmitComplaint() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    priority: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const token = localStorage.getItem("token");

    if (!token) {
      setError("Please login before submitting a complaint.");
      return;
    }

    setLoading(true);

    try {
      const response = await API.post(
        "/complaints",
        {
          title: formData.title,
          category: formData.category,
          description: formData.description,
          priority: formData.priority || "Medium",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(response.data.message);

      setFormData({
        title: "",
        category: "",
        description: "",
        priority: "",
      });

      setTimeout(() => {
        navigate("/my-complaints");
      }, 1500);

    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to submit complaint. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar />

      <main className="submit-page">

        <div className="submit-container">

          <div className="submit-header">
            <h1>Submit a Complaint</h1>

            <p>
              Provide the details below to register your complaint.
            </p>
          </div>

          <form
            className="complaint-form"
            onSubmit={handleSubmit}
          >

            {/* Complaint Title */}

            <div className="form-group">
              <label htmlFor="title">
                Complaint Title
              </label>

              <input
                type="text"
                id="title"
                placeholder="Enter complaint title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>


            {/* Category */}

            <div className="form-group">
              <label htmlFor="category">
                Category
              </label>

              <select
                id="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a category
                </option>

                <option value="Infrastructure">
                  Infrastructure
                </option>

                <option value="Cleanliness">
                  Cleanliness
                </option>

                <option value="Water Supply">
                  Water Supply
                </option>

                <option value="Electricity">
                  Electricity
                </option>

                <option value="Transport">
                  Transport
                </option>

                <option value="Other">
                  Other
                </option>
              </select>
            </div>


            {/* Description */}

            <div className="form-group">
              <label htmlFor="description">
                Description
              </label>

              <textarea
                id="description"
                rows="6"
                placeholder="Describe your complaint in detail..."
                value={formData.description}
                onChange={handleChange}
                required
              ></textarea>
            </div>


            {/* Priority */}

            <div className="form-group">
              <label htmlFor="priority">
                Priority
              </label>

              <select
                id="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select priority
                </option>

                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>
              </select>
            </div>


            {/* Messages */}

            {error && (
              <p className="form-error">
                {error}
              </p>
            )}

            {success && (
              <p className="form-success">
                {success}
              </p>
            )}


            {/* Buttons */}

            <div className="form-actions">

              <Link
                to="/dashboard"
                className="cancel-btn"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="submit-complaint-btn"
                disabled={loading}
              >
                {loading
                  ? "Submitting..."
                  : "Submit Complaint"}
              </button>

            </div>

          </form>

        </div>

      </main>
    </div>
  );
}

export default SubmitComplaint;