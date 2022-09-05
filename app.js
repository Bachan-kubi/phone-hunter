// api - 1
const loadPhone = async(searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};
// set to dispaly at UI
const displayPhones = (phones, dataLimit) => {
  const phonesContainer = document.getElementById("phones-container");
  //clear previous search result
  phonesContainer.innerHTML = ``;
  // limit phone dispaly
  const showAll = document.getElementById('show-all')
  if(dataLimit && phones.length>10){
    phones = phones.slice(0, 10);
    showAll.classList.remove('d-none')
  }else{
    showAll.classList.add('d-none')
  }
  // display no phone
  const noPhones = document.getElementById('no-phone-msg');
  if(phones.length === 0){
    noPhones.classList.remove('d-none')
  }else{
    noPhones.classList.add('d-none');
  }
  // display all phone
  phones.forEach((phone) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.classList.add("col");
    phoneDiv.innerHTML = `
      <div class="card text-center">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h4 class="card-title">${phone.phone_name}</h4>
            <h5 class="card-title">${phone.brand}</h5>
            <button onclick="showPhoneDetails('${phone.slug}')" class = "btn btn-primary" data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
        </div>
      </div>
      `;
        phonesContainer.appendChild(phoneDiv);
  });
  toggleLoader(false);
};
const searchProcess = (dataLimit)=>{
  toggleLoader(true);
  const searchField = document.getElementById('search-field');
  const searchText= searchField.value;
  // searchField.value = ``;
  loadPhone(searchText, dataLimit);
}
// enter key handler
document.getElementById('search-field').addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    searchProcess(10);
  }
});
// search fucntion btn
document.getElementById('btn-search').addEventListener('click', ()=>{
  searchProcess(10);
});
// load spinner
const toggleLoader = isLoading=>{
  const loader = document.getElementById('loader');
  if(isLoading){
    loader.classList.remove('d-none')
  }else{
    loader.classList.add('d-none')
  }
}

// show all 
document.getElementById('btn-show-all').addEventListener('click', ()=>{
  searchProcess();
});
// load phones details function
const showPhoneDetails = async(id)=>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`
  const res = await fetch(url)
  const data = await res.json();
  displayPhoneDetails(data.data);
}
// displayPhone details api - 2
const displayPhoneDetails = (phone)=>{
  console.log(phone);
  const modalDetails = document.getElementById('phoneDetailModalLabel');
    modalDetails.innerText = phone.name;
  const phoneDetails = document.getElementById('phone-details');
  phoneDetails.innerHTML = `
    <h5>Release Date: ${phone.releaseDate? phone.releaseDate: 'No Inforamtion'}</h5> 
    <p>Storage: ${phone.mainFeatures.storage}</p> 
    <p>Bluetooth: ${phone.others? phone.others.Bluetooth: "no bluetooth"}</p>
  `;

}
// call load phone fucntion always!
loadPhone('apple');
