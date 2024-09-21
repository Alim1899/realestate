export const getListing = async (setListing, id) => {
  await fetch(
    `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
        accept: "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((data) => setListing(data));
};
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
};

export const deleteListing = async (id) => {
  try {
    const response = await fetch(
      `https://api.real-estate-manager.redberryinternship.ge/api/real-estates/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting listing:", error);
  }
};
