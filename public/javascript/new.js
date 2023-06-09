const newFormHandler = async function (event) {
    event.preventDefault();

    const token =localStorage.getItem("token");
    await fetch(`/api/post`, {
        method: "POST",
        body: JSON.stringify({
            title,
            body
        }),
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`
        }
    });

    document.location.replace("/dashboard");

};

document
    .querySelector("#new-post-form")
    .addEventListener("submit", newFormHandler);