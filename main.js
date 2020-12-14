let contactList = document.querySelector(".contact-list");
let contactCard = document.querySelector(".contact-card");
let addContact = document.querySelector(".add-contact");
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
    lists.setAttribute("data-id", `${user.id}`);
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
      let userFilter = users.data.filter((userData) => {
        let getId = e.target.getAttribute("data-id");
        let getIdNumber = parseInt(getId);
        if (getIdNumber === userData.id) {
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
function addNewUser(e) {
  e.preventDefault();
  let name = document.querySelector(".name").value;
  let age = document.querySelector(".age").value;
  let email = document.querySelector(".email").value;
  //   let gender = document.querySelector(".gender option").value;
  //   let activeStatus = document.querySelector(".active-state").value;
  let lists = document.createElement("p");
  lists.classList.add("users");
  //   lists.setAttribute("data-id", `${user.id}`);
  lists.innerText = name;
  contactList.appendChild(lists);
}
contactList.addEventListener("click", showContactCard);
// addContact.addEventListener("submit", addNewUser);
