import { Bill } from "./utils.js";

let consumers = JSON.parse(localStorage.getItem("consumers") || []);

let bills = JSON.parse(localStorage.getItem("bills") || []);

const newBillButtonElement = document.querySelector(".new-button");

newBillButtonElement.addEventListener("click", addBill);

const clearBillsButtonElement = document.querySelector(".clear-button");
clearBillsButtonElement.addEventListener("click", clearBills);

const billsTableElement = document.querySelector(".bills-table");

const billsTableHeaderElement = document.querySelector(".bills-column-header-template");

const billRowTemplateElement = document.querySelector(".bills-row-template");

const billConsumersTemplateElement = document.querySelector(".bill-consumers-template");

const consumerShareTableElement = document.querySelector(".consumers-shares-table");

const consumerShareHeaderElement = document.querySelector(".consumers-shares-column-header-template");

const consumerShareRowTemplateElement = document.querySelector(".consumers-shares-row-template");

render();

function addBill(){
    let title = document.querySelector(".new-bill-title").value.trim();
    let amount = parseFloat(document.querySelector(".new-bill-amount").value.trim());

    let newBill = new Bill(title, amount);
    if (title.trim() === "" || amount <= 0) {
        alert("Title cannot be empty and amount must be greater than zero!");
        return;
    }
    if (bills.some(bill => bill.title === title)) {
        alert("A bill with this title already exists!");
        return;
    }
    bills.push(newBill);
    localStorage.setItem("bills", JSON.stringify(bills));
    render();
}

function clearBills(){
    bills.splice(0, bills.length);
    localStorage.setItem("bills", JSON.stringify(bills));
    render();
}

function removeBill(billId){
    bills = bills.filter(bill => bill.id !== billId);
    localStorage.setItem("bills", JSON.stringify(bills));
    render();
}

function render(){
    renderBills();
    renderConsumerShares();
}

function renderBills() {
    billsTableElement.innerHTML = "";
    billsTableElement.appendChild(billsTableHeaderElement.content.cloneNode(true));
    bills.forEach(bill =>{
        let newRow = billRowTemplateElement.content.cloneNode(true);
        newRow.querySelector(".bill-title").textContent = bill.title;
        newRow.querySelector(".bill-amount").textContent = bill.amount.toFixed(2);
        consumers.forEach(consumer => {
            let billConsumersElement = billConsumersTemplateElement.content.cloneNode(true);

            billConsumersElement.querySelector(".consumer-label").textContent = consumer.name;

            let checkBoxElement = billConsumersElement.querySelector(".consumer-checkbox");

            checkBoxElement.billId = bill.id;

            checkBoxElement.consumerId = consumer.id;

            checkBoxElement.checked = bill.consumers.some(c => c.id === consumer.id);

            checkBoxElement.addEventListener('change', toggleConsumerInBill);

            checkBoxElement.addEventListener('change', renderConsumerShares);

            newRow.querySelector(".bill-consumers").appendChild(billConsumersElement);
        });
        newRow.querySelector(".remove-button").addEventListener("click", ()=>removeBill(bill.id));
        billsTableElement.appendChild(newRow);
    })
}

function renderConsumerShares() {
    consumerShareTableElement.innerHTML = "";
    consumerShareTableElement.appendChild(consumerShareHeaderElement.content.cloneNode(true));
    consumers.forEach(consumer => {
        let totalShare = 0;
        bills.forEach(bill => {
            if (bill.consumers.some(c => c.id === consumer.id)) {
                totalShare += bill.amount / bill.consumers.length;
            }
        });
        let newRow = consumerShareRowTemplateElement.content.cloneNode(true);
        newRow.querySelector(".consumer-name").textContent = consumer.name;
        newRow.querySelector(".consumer-shares").textContent = totalShare.toFixed(2);
        consumerShareTableElement.appendChild(newRow);
    });
}

function toggleConsumerInBill(e) {
    let checked = e.target.checked;
    let billId = e.target.billId;
    let consumerId = e.target.consumerId;

    if (checked) {
        addConsumerToBill(billId, consumerId);
    } else {
        removeConsumerFromBill(billId, consumerId);
    }
}

function addConsumerToBill(billId, consumerId) {
    let bill = bills.find(b => b.id === billId);
    if (!bill) {
        console.error(`Bill ${billId} not found, available bills:`, bills);
        return;
    }
    let consumer = consumers.find(c => c.id === consumerId);
    if (!consumer) {
        console.error("Consumer not found");
        return;
    }
    if (!bill.consumers.find(c => c.id === consumerId)) {
        bill.consumers.push(consumer);
        localStorage.setItem("bills", JSON.stringify(bills));
        console.log(bills);
    }
}

function removeConsumerFromBill(billId, consumerId) {
        let bill = bills.find(b => b.id === billId);
    if (!bill) {
        console.error(`Bill ${billId} not found, available bills:`, bills);
        return;
    }
    let consumer = consumers.find(c => c.id === consumerId);
    if (!consumer) {
        console.error("Consumer not found");
        return;
    }
    bill.consumers = bill.consumers.filter(c => c.id !== consumerId);
        localStorage.setItem("bills", JSON.stringify(bills));
        console.log(bills);
}