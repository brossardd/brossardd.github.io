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
  * @param {Object} message The message
  * @param {string} message.type The message type.
  * @param {string} message.data The message data.
  */
  sendMessage({type, data}) {
    this.target.postMessage({type, data}, '*');
  }
}

class FakeSubject {
  constructor(){
    this.subscribe = sub => {
      this.subscribtion = sub;
    };
  
    this.next = message => {
      this.subscribtion(message);
    };
  }
}

class MockWebSocketEventBus {
  constructor(websocketCtr) {
    this.messages = new FakeSubject();
    
    this.getMessages = messageType => {
      return this.messages;
    };
  
    this.sendMessage = ({type, data}) => {
      if(type === 'REQUEST-SNAPSHOT') {
        this.messages.next({type: 'SNAPSHOT', data: {}});
      };
    }
  }
}

