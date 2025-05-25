export const registerUser = async (formData) => {
  const req = await fetch("http://localhost:3000/user/register", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formData),
  });
  const data = await req.json();

  if (req.status === 201) {
    localStorage.setItem("token", data.token);
  }

  return {
    status: req.status,
    message: data.message,
    payload: data.payload,
    token: data.token,
  };
};

export const loginUser = async (formData) => {
  const req = await fetch("http://localhost:3000/user/login", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(formData),
  });
  const data = await req.json();

  if (req.status === 200) {
    localStorage.setItem("token", data.token);
  }

  return {
    status: req.status,
    message: data.message,
    payload: data.payload,
    token: data.token,
  };
};

export const getUser = async () => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const req = await fetch("http://localhost:3000/user", {
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

export const getUserById = async (id) => {
  const req = await fetch(`http://localhost:3000/user/${id}`, {
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

export const updateUser = async (formData) => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  console.log(formData)

  const form = new FormData();
  for(const key in formData){
    if(formData[key] !== undefined && formData[key] !== null) form.append(key, formData[key]);
  }

  console.log(form)

  const req = await fetch(`http://localhost:3000/user/update`, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json"
    },
    method: "PUT",
    body: form,
  });
  const data = await req.json();

  return {
    status: req.status,
    message: data.message,
    payload: data.payload,
  };
};

export const verifyUserPassword = async (password) => {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const req = await fetch("http://localhost:3000/user/verifyPassword", {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ password: password }),
  });
  const data = await req.json();

  return {
    status: req.status,
    message: data.message,
    payload: data.payload,
  };
};