export const registrationFetch = async (
  email,
  password,
  firstName,
  lastName,
  role
) => {
  const response = await fetch("http://localhost:5000/registration", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email,
      password,
      firstName,
      lastName,
      role,
    }),
  });
  const result = await response.json();
  return result;
};
