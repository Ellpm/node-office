const path = "http://localhost:5000/vacation/vacation";

export const addVacationFetch = async (email, startDate, finishDate) => {
  let response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
      startDate: startDate ? new Date(startDate) : Date.now(),
      finishDate: finishDate ? new Date(finishDate) : Date.now(),
    }),
  });
  let result = await response.json();
  return result;
};

export const getVacationsFetch = async (email) => {
  
  let response = await fetch(`${path}?user=${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  let result = await response.json();
  return result;
};

export const updateVacationFetch = async (
  email,
  vacation,
  startDate,
  finishDate,
  blocked
) => {
  let response = await fetch(path, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
      vacationId: vacation._id,
      startDate: startDate ? new Date(startDate) : vacation.startDate,
      finishDate: finishDate ? new Date(finishDate) : vacation.finishDate,
      blocked: blocked
    }),
  });
  let result = await response.json();
  return result;
};

export const deleteVacationFetch = async (email, vacation) => {
  console.log("vacation", vacation);

  let response = await fetch(path, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email: email,
      vacationId: vacation._id,
    }),
  });
  let result = await response.json();
  return result;
};



