const BASE_URL = "http://localhost:3000/api/users";

/**
 * הרשמה
 */
export const register = async (data) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    // שגיאה מהשרת
    throw new Error(result.message || "שגיאה בהרשמה");
  }

  return result;
};
