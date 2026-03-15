// ── Point directly to Spring Boot — no proxy needed ───
const BASE_URL = "http://localhost:8080/api";

// ── AUTH ──────────────────────────────────────────────
export const registerUser = async (formData) => {

  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    body: formData
  });

  if (!res.ok) throw new Error(`Register failed: ${res.status}`);
  return res.text();
};

export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  return res.json();
};

export const getCaptcha = async () => {
  const res = await fetch(`${BASE_URL}/auth/captcha`);
  if (!res.ok) throw new Error(`Captcha failed: ${res.status}`);
  return res.text();
};

// ── TENDER ────────────────────────────────────────────

// FormData — DO NOT set Content-Type, browser sets multipart boundary automatically
export const saveTender = async (formData) => {
  const response = await fetch('http://localhost:8080/api/tender/save', {
    method: 'POST',
    body: formData, // formData already contains the files and text
    // DO NOT ADD HEADERS HERE
  });
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Server Error');
  }
  return response.text();
};
// ${await res.text()}

export const getAllTenders = async () => {
  const res = await fetch(`${BASE_URL}/tender/all`);
  if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
  return res.json();
};

// Update uses @RequestBody Tender (JSON), not multipart
export const updateTender = async (id, tender) => {
  const res = await fetch(`${BASE_URL}/tender/update/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(tender),
  });
  if (!res.ok) throw new Error(`Update failed: ${res.status}`);
  return res.json();
};

export const deleteTender = async (id) => {
  const res = await fetch(`${BASE_URL}/tender/delete/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Delete failed: ${res.status}`);
  return res.text();
};

// ── REPORT ────────────────────────────────────────────
export const exportExcel = () => {
  window.open(`${BASE_URL}/report/export`, "_blank");
};