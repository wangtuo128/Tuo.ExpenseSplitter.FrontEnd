import { Consumer } from "./utils.js";

let consumers = JSON.parse(localStorage.getItem("consumers") || []);

let newButtonElement = document.querySelector(".new-button");

let clearButtonElement = document.querySelector(".clear-button");

let consumersTable = document.querySelector(".consumers-table");

const newConsumerNameElement = document.querySelector(".new-consumer-name");

const template = document.querySelector('.consumers-row-template');

const columnHeaderTemplate = document.querySelector(".consumers-column-header-template");

newButtonElement.addEventListener("click", addConsumer);

clearButtonElement.addEventListener("click", clearConsumers);

renderConsumers();

function addConsumer(){
    let newConsumerName = newConsumerNameElement.value.trim();

    if (newConsumerName === "") {
        alert("Consumer name cannot be empty!");
        return;
    }
    let newConsumer = new Consumer(newConsumerName);
    consumers.push(newConsumer);
    localStorage.setItem("consumers", JSON.stringify(consumers));
    newConsumerNameElement.value = "";
    renderConsumers(newConsumer);
}

function clearConsumers(){
    consumers.splice(0, consumers.length);
    localStorage.setItem("consumers", JSON.stringify(consumers));
    renderConsumers();
}

function removeConsumer(consumerId){
    consumers = consumers.filter(consumer => consumer.id !== consumerId);
    localStorage.setItem("consumers", JSON.stringify(consumers));
    renderConsumers();
}

function renderConsumers(){
    consumersTable.innerHTML = ""; 
    consumersTable.appendChild(columnHeaderTemplate.content.cloneNode(true));
    consumers.forEach(consumer => {
        let newRow = template.content.cloneNode(true);
        newRow.querySelector(".consumer-name").textContent = consumer.name;
        newRow.querySelector(".remove-button").consumerId = consumer.id;
        newRow.querySelector(".remove-button").addEventListener("click", () => removeConsumer(consumer.id));
        consumersTable.appendChild(newRow);
    });
}