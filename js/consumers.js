let consumers = JSON.parse(localStorage.getItem("consumers"));

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
    let newConsumerId = consumers.length > 0 ? Math.max(...consumers.map(c => c.id)) + 1 : 1;
    let newConsumerName = newConsumerNameElement.value.trim();
    let newConsumer = new Consumer(newConsumerId, newConsumerName);
    consumers.push(newConsumer);
    localStorage.setItem("consumers", JSON.stringify(consumers));
    console.log(`A consumer has been added！${JSON.parse(localStorage.getItem("consumers"))[consumers.length - 1].id}`);
    newConsumerNameElement.value = "";
    renderConsumers(newConsumer);
}

function clearConsumers(){
    consumers.splice(0, consumers.length);
    localStorage.setItem("consumers", JSON.stringify(consumers));
    renderConsumers();
}

function renderConsumers(){
    consumersTable.innerHTML = ""; 
    consumersTable.appendChild(columnHeaderTemplate.content.cloneNode(true));
    consumers.forEach(consumer => {
        let newRow = template.content.cloneNode(true);
        newRow.querySelector(".consumer-id").textContent = consumer.id;
        newRow.querySelector(".consumer-name").textContent = consumer.name;
        consumersTable.appendChild(newRow);
    });
}

class Consumer{
    constructor(id, name){
        this.id = id;
        this.name = name;
    }
}