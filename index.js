const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  displayPhones(phones, isShowAll);
  console.log(phones);
};

const displayPhones = (phones, isShowAll) => {
  const phoneConatiner = document.getElementById("phone-container");
  //clear phone container;
  phoneConatiner.textContent = "";
  const showAllContainer = document.getElementById("showAllContainer");
  // show all button if more than 9;

  if (phones.length > 10 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }
  // show only 9 phones if not showAll;
  if (!isShowAll) {
    phones = phones.slice(0, 9);
  }
  phones.forEach((phone) => {
    //   1 create a div
    const phoneCard = document.createElement("div");

    phoneCard.classList = `card  bg-gray-100 shadow-xl`;
    phoneCard.innerHTML = `
      <figure class="px-10 pt-10">
      <img
        src="${phone.image}"
        alt="Shoes"
        class="rounded-xl"
      />
    </figure>
    <div class="card-body items-center text-center">
      <h2 class="card-title">${phone.phone_name}</h2>
      <p>${phone.slug}</p>
      <div class="card-actions">
        <button onClick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
      </div>
    </div>
      `;

    phoneConatiner.appendChild(phoneCard);
    // console.log(phoneConatiner);
  });
  toggleLoadingSpinner(false);
};

// show one by one item onClick handleShow Details

const handleShowDetails = async (id) => {
  console.log("click ", id);
  // load single phone data

  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  console.log(data);
};

//  input handleSearch searchField
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const searchField = document.getElementById("searchField");
  const searchText = searchField.value;
  console.log(searchText);
  loadPhone(searchText, isShowAll);
};

// toggleLoadingSpinner

const toggleLoadingSpinner = (isLoading) => {
  const LoadingSpinner = document.getElementById("LoadingSpinner");
  if (isLoading) {
    LoadingSpinner.classList.remove("hidden");
  } else {
    LoadingSpinner.classList.add("hidden");
  }
};

//  set up handleShowAll btn
const handleShowAll = () => {
  handleSearch(true);
};
