export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const token = localStorage.getItem("token");

  const res = await fetch("http://localhost:3000/api/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`, // אם רוצים הגנה
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "שגיאה בהעלאה");
  }

  return data.url;
};
