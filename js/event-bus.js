const { Observable, Subject, fromEvent, pipe } = rxjs;
const { postMessage, filter, map } = rxjs.operators;

/** @description Reactive event bus used to send and receive PostMessages.
*/  
class PostMessageEventBus {
  
  /** @description The constructor
  * @param {window} origin The window listening the incoming messages
  * @param {window} target The target window for sent messages
  */ 
  constructor(origin, target) {
    this.getMessages.bind(this);
    this.sendMessage.bind(this);
      
    this.messages = fromEvent(origin, 'message').pipe(
      map(event => event.data));
    this.target = target;
  }
 
  /** @description Returns an observable of the incoming messages listened by the origin window.
  * The messages can be filtered if the messageType is not null or "*".
  * @param {string} messageType The message type used to filter the incoming messages
  * @return {Observable} An observable of the incoming messages.
  */
  getMessages(messageType) {
    if(!messageType || messageType === '*'){
      return this.messages;
    }
    return this.messages.pipe(
        filter(data => data.type === messageType));
  }
 
  /** @description Send a PostMessage to the target window.
  * @param {string} messageType The message type
  * @param {string} message The message to send 
  */
  sendMessage(messageType, message) {
    this.target.postMessage({
      type: messageType,
      message: message
    }, '*');
  }
}

class FakeSubject {
  constructor(){
    this.subscribe.bind(this);
    this.next.bind(this);
  }
  subscribe(sub) {
    this.subscribtion = sub;
  }
  
  next(message){
    this.subscribtion(message);
  }
}

class MockWebSocketEventBus {
  constructor(websocketCtr) {
    this.getMessages.bind(this);
    this.sendMessage.bind(this);
    
    this.messages = new FakeSubject();
  }

  getMessages(messageType) {
    return this.messages;
  }
  
  sendMessage(messageType, message) {
    switch(messageType) {
      case 'REQUEST-SNAPSHOT':
        this.messages.next(
          {
            type: "SNAPSHOT",
            message: {}
          });
    }
  }
}

