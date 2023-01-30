const account1 = {
  owner: "RK Jena",
  username: "rk",
  mobno: "11111",
  accNumber: "1234567890123",
  ifscCode: "IFSC00000",
  movements: [200.1, 450.3, -400, 3000, -650, -130, 70, 1300],
  password: 1111,
  login: false,
};

const account2 = {
  owner: "NM Mittal",
  username: "nmm",
  mobno: "22222",
  accNumber: "1234567756312",
  ifscCode: "IFSC00000",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  password: 2222,
  login: false,
};

let accounts = [account1, account2];
// Login setup

let username = document.getElementById("username");
let password = document.getElementById("password");
let loginBtn = document.getElementById("login-btn");
let warnning = document.getElementById("warnning");
let login = document.getElementById("login-page");
let mobileTransferBtn = document.getElementById("mobile");
let accTransferBtn = document.getElementById("account");
let numInput = document.getElementById("mobile-transfer");
let accInput = document.getElementById("account-transfer");
let ownerName = document.getElementById("user-name");
let availableBal = document.getElementById("avaiBal");
let logoutBtn = document.getElementById("logout");
let accNo = document.getElementById("acc-no");
let accShowBtn = document.getElementById("show-acc-no");
let sendBtn = document.getElementById("send");
let phoneNo = document.getElementById("phone-no");
let trfAmount = document.getElementById("amount");
let accNumber = document.getElementById("accnumber");
let ifscCode = document.getElementById("ifsc");
let errorMsg = document.getElementById("error--msg");

mobileTransferBtn.addEventListener("click", numTransfer);
accTransferBtn.addEventListener("click", accTransfer);
loginBtn.addEventListener("click", successLogin);
accShowBtn.addEventListener("click", showAccNumber);
sendBtn.addEventListener("click", send);
logoutBtn.addEventListener("click", logout);

let loginAccount;
function successLogin() {
  loginAccount = accounts.find((acc) => {
    return acc.username === username.value && acc.password === +password.value;
  });
  if (loginAccount) {
    app.classList.remove("none");
    login.classList.add("none");
  } else {
    warnning.classList.remove("none");
  }
  //animation
  app.classList.add("flip-in-ver-right");
  //   show ownerName
  ownerName.innerText = loginAccount.owner;
  //displayAvailable Account balance
  displayBalance(loginAccount.movements);
  //show acc number
  accNo.innerText = loginAccount.accNumber.slice(1, 8) + "XXXXX";
}

function numTransfer() {
  numInput.classList.remove("none");
  accInput.classList.add("none");
  accTransferBtn.classList.remove("active");
  mobileTransferBtn.classList.add("active");
  ifscCode.value = "";
}
function accTransfer() {
  accInput.classList.remove("none");
  numInput.classList.add("none");
  mobileTransferBtn.classList.remove("active");
  accTransferBtn.classList.add("active");
  console.log("HI");
  phoneNo.value = "";
}

function displayBalance(movements) {
  let bal = movements.reduce((acc, mov) => acc + mov, 0);
  availableBal.innerText = `${"₹" + " " + bal}`;
}

function showAccNumber() {
  accNo.innerText = loginAccount.accNumber;
}
function validateInput() {
  if (phoneNo.value && trfAmount.value > 0) {
    let user = accounts.find((acc) => acc.mobno == phoneNo.value);
    !user
      ? errorMsg.classList.remove("none")
      : user.movements.push(+trfAmount.value);
    loginAccount.movements.push(-trfAmount.value);
  } else if (accNumber.value && ifscCode.value && trfAmount.value > 0) {
    let user = accounts.find((acc) => acc.accNumber == accNumber.value);
    !user
      ? errorMsg.classList.remove("none")
      : user.movements.push(+trfAmount.value);
    loginAccount.movements.push(-trfAmount.value);
  } else {
    errorMsg.classList.remove("none");
  }
}

function makeInputBlank() {
  trfAmount.value = null;
  phoneNo.value = null;
  ifscCode.value = null;
  accNumber.value = null;
}
function send() {
  validateInput();
  makeInputBlank();
  setTimeout(() => errorMsg.classList.add("none"), 2000);
  displayBalance(loginAccount.movements);
  errorMsg.classList.add("flip-diagonal-2-tl");
}

function logout() {
  login.classList.remove("none");
  app.classList.add("none");
}
