const { Observable, Subject, fromEvent, pipe } = rxjs;
const { postMessage, filter, map } = rxjs.operators;

class PostMessageEventBus {
  
  constructor(origin, target) {
    this.getMessages.bind(this);
    this.sendMessage.bind(this);
      
    this.messages = fromEvent(origin, 'message');
    this.target = target;
  }
 
  getMessages(messageType) {
    return this.messages
      .pipe(
        map(message => JSON.parse(message.data)),
        filter(messageData => messageData.type === messageType)
    );
  }
 
  sendMessage(messageType, data) {
    console.log('Send message' )
    this.target.postMessage(JSON.stringify({
      type: messageType,
      data: data
    }), '*');
  }
}



