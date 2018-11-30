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
    this.target = target;
    
    /**
    * Creates the messages observable.
    */
    this.messages = fromEvent(origin, 'message').pipe(
      map(event => event.data));
    
    /** @description Returns an observable of the incoming messages listened by the origin window.
    * The messages can be filtered if the messageType is not null.
    * @param {string} messageTypeRegex The message type regex used to filter the incoming messages
    * @return {Observable} An observable of the incoming messages.
    */
    this.getMessages = messageTypeRegex => {
      if(!messageTypeRegex){
        messageTypeRegex = '/*/g';
      }
      return this.messages.pipe(
          filter(data => data.type.match(messageType)));
    };
    
    /** @description Send a PostMessage to the target window.
    * @param {Object} message The message
    * @param {string} message.type The message type.
    * @param {string} message.data The message data.
    */
    this.sendMessage = ({type, data}) => {
      this.target.postMessage({type, data}, '*');
    };
  }
}

const {webSocket} = rxjs.webSocket;

/** @description Reactive event bus used to send and receive messages via
* websockets.
*/ 
class WebSocketEventBus {
 
  /** @description The constructor
  * @param {Object} websocketCtr The websocket constructor
  */ 
  constructor(websocketCtr) {
    this.subject = webSocket({websocketCtr});
    
    /** @description Returns an observable of the incoming messages.
    * The messages can be filtered if the messageType is not null or "*".
    * @param {string} messageTypeRegex The message type regex used to filter the incoming messages
    * @return {Observable} An observable of the incoming messages.
    */
    this.getMessages = messageTypeRegex => {
      if(!messageTypeRegex) {
        messageType = '/*/g';
      }
      return this.subject.multiplex(
        () => JSON.stringify({subscribe: messageType}),
        () => JSON.stringify({unsubscribe: messageType}),
        message => message.type.match(messageType));
    };

   /** @description Send a message.
    * @param {Object} message The message
    * @param {string} message.type The message type.
    * @param {string} message.data The message data.
    */
    this.sendMessage = ({type, data}) => {
      this.subject.next({type, data});
    };
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
      }
    };
  }
}

