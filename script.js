const menu = document.querySelector('.menu-container');
// Function 1 - getMenu() to fetch data from API and display
async function getMenu() {
    try {
        const response = await fetch('https://free-food-menus-api-production.up.railway.app/burgers');
        const data = await response.json();
        data.forEach(item => {
            menu.innerHTML += `
            <div class="card">
                <img class="image-top" src=${item.img} alt="${item.name}">
                <div class="card-body">
                    <h5 class="card-title">${item.name}</h5>
                    <p class="card-country">Country: ${item.country}</p>
                    <p class="card-text">&#36;${item.price}</p>
                    <p class="card-rating">Ratings: ${item.rate} &#9733;</p>
                <div>
            </div>`
        });
    }
    catch (e) {
        console.log(e);
    }
}
// Load menu when screen loaded
getMenu();

//Function 2: Randomly select 3 burgers and placeOrder
const orderedList = document.querySelector('.burger-lists');
async function takeOrder() {
    const response = await fetch('https://free-food-menus-api-production.up.railway.app/burgers');
    const burgers = await response.json();
    const randomBurgers = [];
    
    for(let i = 0; i < 3; i++){
        const randomIndex = Math.floor(Math.random() * burgers.length);
        randomBurgers.push(burgers[randomIndex]);
        orderedList.innerHTML += `
        <li>${burgers[randomIndex].dsc}</li>
        `
    }
    const order = {
        burgers: randomBurgers,
    }
    
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(order);
        },2500);
    })
}
// takeOrder()

// Function 3: Simulate the order preparation process
const paymentDiv = document.querySelector('.payment')
function orderPrep(){
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const orderStatus = true;
            const paidStatus = false;
            const order = {
                order_status: orderStatus,
                paid: paidStatus,
            }
            paymentDiv.innerHTML = `Please pay the bill to proceed further!!!`
            resolve(order);
        },1500)
    })
}
// orderPrep()

// Function 4: Simulate the payment process
const transaction = document.querySelector('.transaction');
const transaction2 = document.querySelector('.transaction2');
function payOrder(){
    return new Promise((resolve, reject) => {
        setTimeout(()=>{
            const orderStatus = true;
            const paidStatus = true;
            const order = {
                order_status: orderStatus,
                paid: paidStatus,
            }
            transaction.innerHTML = `Transaction Successful!!`
            transaction2.innerHTML = `Your order will be delivered soon. Thank you.`
            resolve(order);
        },1000)
    })
}

// payOrder()

// Function 5: Display a thank you message once the payment is received

function thankyouFnc(){
    alert('Thank you for your order!!')
}
const menuContainer = document.querySelector('.container');
const orderContainer = document.querySelector('.order-container');
const button = document.querySelector('.button');
const func3 = document.querySelector('.func3');
const func4 = document.querySelector('.func4');
const func5 = document.querySelector('.func5');
button.addEventListener('click',async ()=>{
    menuContainer.classList.add('hide');
    orderContainer.classList.remove('hide');
    console.log('Placing your order.......')
    func3.classList.remove('hide');
    const order = await takeOrder();
    console.log('Processing your order.......')
    func4.classList.remove('hide');
    const orderStatus = await orderPrep();
    if(orderStatus.order_status){
        console.log('Processing your payment......')
        func4.classList.remove('hide');
        func5.innerHTML = `Processing your payment...`
        const paymentStatus = await payOrder();
        if(paymentStatus.paid){
            thankyouFnc();
        }
    }
})