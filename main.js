let contactList = document.querySelector(".contact-list");
let contactCard = document.querySelector(".contact-card");
let addContact = document.querySelector(".add-contact");
let submittedUsers = [];
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

function appValue(id, name, email, gender, status, parentEle) {
  let eachUser = `<p>${id}</p>
  <p>${name}</p>
  <p>${email}</p>
  <p>${gender}</p>
  <p>${status}</p>
`;
  parentEle.innerHTML = eachUser;
}

function showContactCard(e) {
  let getId = e.target.getAttribute("data-id");
  let getIdNumber = parseInt(getId);
  if (e.target.classList.contains("users")) {
    document.querySelectorAll(".users").forEach((user) => {
      user.classList.remove("active");
    });
    e.target.classList.add("active");
    contactInfo().then((users) => {
      users.data.forEach((userData) => {
        if (getIdNumber === userData.id) {
          appValue(
            userData.id,
            userData.name,
            userData.email,
            userData.gender,
            userData.status,
            contactCard
          );
        }
      });
      submittedUsers.forEach((subUser) => {
        if (getIdNumber === subUser.stId) {
          appValue(
            subUser.stId,
            subUser.stName,
            subUser.stEmail,
            subUser.stGender,
            subUser.stStatus,
            contactCard
          );
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
  let gender = document.querySelector(".gender").value;
  let status = document.querySelector(".active-state").value;
  let lists = document.createElement("p");

  lists.classList.add("users");
  let totalLength = contactList.childNodes.length + 1;

  lists.setAttribute("data-id", `${(totalLength += 1)}`);
  lists.innerText = name;
  contactList.insertBefore(lists, contactList.firstElementChild);

  let userParams = {
    stId: totalLength,
    stName: name,
    stAge: age,
    stEmail: email,
    stGender: gender,
    stStatus: status,
  };
  submittedUsers.push(userParams);
}
contactList.addEventListener("click", showContactCard);
addContact.addEventListener("submit", addNewUser);
