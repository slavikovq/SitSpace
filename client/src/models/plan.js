export const getAllUserPlans = async () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const req = await fetch("http://localhost:3000/plan", {
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

export const getUserPlanById = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const req = await fetch(`http://localhost:3000/plan/${id}`, {
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


export const createPlan = async (formData) => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const req = await fetch("http://localhost:3000/plan/", {
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

export const updatePlan= async (id, formData) => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const req = await fetch(`http://localhost:3000/plan/${id}`, {
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

export const deletePlan = async (id) => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const req = await fetch(`http://localhost:3000/plan/${id}`, {
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
