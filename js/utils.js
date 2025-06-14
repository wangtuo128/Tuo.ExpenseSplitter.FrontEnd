export class Consumer{
    constructor(name){
        this.id = generateUniqueId();
        this.name = name;
        this.shares = [];
    }
}

export class Bill{ 
    constructor(title, amount){
        this.id = generateUniqueId();
        this.title = title;
        this.consumers = [];
        this.amount = amount;
    }
}

function generateUniqueId() {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substr(2, 5);
  return `${timestamp}-${randomPart}`;
}