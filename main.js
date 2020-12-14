let contactList = document.querySelector(".contact-list");
let contactCard = document.querySelector(".contact-card");

async function contactInfo() {
  try {
    const response = await fetch("https://gorest.co.in/public-api/users/");
    const users = await response.json();
    return users;
  } catch {
    console.log(Error("Not Found"));
  }
}
contactInfo().then((users) => {
  users.data.forEach((user) => {
    let contactName = user.name;
    let lists = document.createElement("p");
    lists.classList.add("users");
    lists.innerText = contactName;
    contactList.appendChild(lists);
  });
});

function showContactCard(e) {
  if (e.target.classList.contains("users")) {
    document.querySelectorAll(".users").forEach((user) => {
      user.classList.remove("active");
    });
    e.target.classList.add("active");
    contactInfo().then((users) => {
      users.data.forEach((userData) => {
        if (e.target.innerText === userData.name) {
          let eachUser = `<p>${userData.id}</p>
                            <p>${userData.name}</p>
                            <p>${userData.email}</p>
                            <p>${userData.gender}</p>
                            <p>${userData.status}</p>
          `;
          contactCard.innerHTML = eachUser;
        }
      });
    });
  }
}
contactList.addEventListener("click", showContactCard);
