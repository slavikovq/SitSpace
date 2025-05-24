export const getAllReviews = async () => {
  const req = await fetch("http://localhost:3000/review", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const data = await req.json();

  return {
    status: req.status,
    message: data.message,
    payload: data.payload,
  };
};

export const getReviewById = async (id) => {
  const req = await fetch(`http://localhost:3000/review/${id}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const data = await req.json();

  return {
    status: req.status,
    message: data.message,
    payload: data.payload,
  };
};

export const getUserReview = async () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const req = await fetch("http://localhost:3000/review/user", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  const data = await req.json();

  return {
    status: req.status,
    message: data.message,
    payload: data.payload,
  };
};

export const createReview = async (formData) => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const req = await fetch("http://localhost:3000/review/", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formData),
  });

  const data = await req.json();

  return {
    status: req.status,
    message: data.message,
    payload: data.payload,
  };
};

export const updateReview = async (id, formData) => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const req = await fetch(`http://localhost:3000/review/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "PUT",
    body: JSON.stringify(formData),
  });

  const data = await req.json();

  return {
    status: req.status,
    message: data.message,
    payload: data.payload,
  };
};

export const deleteReview = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const req = await fetch(`http://localhost:3000/review/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });

  const data = await req.json();

  return {
    status: req.status,
    message: data.message,
    payload: data.payload,
  };
};
