export function generateUniqueId() {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substr(2, 5);
  return `${timestamp}-${randomPart}`;
}

export class Consumer{
    constructor(id, name){
        this.id = id;
        this.name = name;
    }
}