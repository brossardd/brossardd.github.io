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
      
    this.messages = fromEvent(origin, 'message');
    this.target = target;
  }
 
  /** @description Returns an observable of the incoming messages listened by the origin window.
  * The messages can be filtered if the messageType is not null or "*".
  * @param {string} messageType The message type used to filter the incoming messages
  * @return {Observable} An observable of the incoming messages.
  */
  getMessages(messageType) {
    if(!messageType || messageType === '*'){
      return this.messages
    }
    return this.messages
      .pipe(
        map(event => event.data),
        filter(message => message.type === messageType)
    );
  }
 
  /** @description Send a PostMessage to the target window.
  * @param {string} messageType The message type
  * @param {string} messageType The message data 
  */
  sendMessage(messageType, data) {
    this.target.postMessage({
      type: messageType,
      data: data
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
  
  sendMessage(messageType, data) {
    switch(messageType) {
      case 'REQUEST-SNAPSHOT':
        this.messages.next(
          {
            type: "SNAPSHOT",
            data: {}
          });
    }
  }
}

