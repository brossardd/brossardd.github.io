const { Observable, Subject, fromEvent, pipe } = rxjs;
const { postMessage, filter, map } = rxjs.operators;
const { webSocket } = rxjs.webSocket;

/** @description Reactive event bus used to send and receive PostMessages.*/  
class PostMessageEventBus {
  
  /** @description The constructor
  * @param {window} origin The window listening the incoming messages
  * @param {window} target The target window for sent messages
  */ 
  constructor(origin, target) {
    /** Binds the methods*/
    this.getMessages = this.getMessages.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    
    this.target = target;
    
    /** Creates the messages observable.*/
    this.messages$ = fromEvent(origin, 'message').pipe(
      map(event => event.data));
  }
  
  /** @description Returns an observable of the incoming messages listened by the origin window.
  * The messages can be filtered if the messageType is not null.
  * @param {string} messageType The message type regex used to filter the incoming messages
  * @return {Observable} An observable of the incoming messages.
  */
  getMessages (messageType){
    if(!messageType){
      return this.messages$;
    }
    return this.messages$.pipe(
        filter(data => data.type.match(messageType)));
  }
  
  /** @description Send a PostMessage to the target window.
  * @param {Object} message The message
  * @param {string} message.type The message type.
  * @param {string} message.data The message data.
  */
  sendMessage({type, data}){
    this.target.postMessage({type, data}, '*');
  }
}

/** @description Reactive event bus used to send and receive messages via
* websockets.*/ 
class WebSocketEventBus {
 
  /** @description The constructor
  * @param {string} url The websocket url
  */ 
  constructor(url) {
    /** Binds the methods*/
    this.getMessages = this.getMessages.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    
    /** Creates the messages web socket observable.*/
    this.subject$ = webSocket(url);
  }
  
  /** @description Returns an observable of the incoming messages.
  * The messages can be filtered if the messageTypeRegex is not null.
  * @param {string} messageType The message type regex used to filter the incoming messages
  * @return {Observable} An observable of the incoming messages.
  */
  getMessages(messageType){
    if(!messageType) {
      return this.subject$;
    }
    return this.subject$.multiplex(
      () => JSON.stringify({subscribe: messageType}),
      () => JSON.stringify({unsubscribe: messageType}),
      message => message.type.match(messageType));
  }

  /** @description Send a message.
  * @param {Object} message The message
  * @param {string} message.type The message type.
  * @param {string} message.data The message data.
  */
  sendMessage({type, data}){
    this.subject$.next({type, data});
  }
}

/** @description Reactive event bus used to send and receive messages via
* websockets at server side.
*/ 
class ServerWebSocketEventBus {
 
  /** @description The constructor
  * @param {Object} server The http server
  */ 
  constructor(server) {
    // Initialise Socket.IO and wrap in observable
    const io$ = Observable.of(io(http));
    
    // Stream of connections
    const connections$ = io$.switchMap(io => {
      return Observable.fromEvent(io, 'connection')
        .map(client => ({ io, client }));
      });
    
    // Stream of disconnections
    const disconnections$ = connection$
      .mergeMap(({ client }) => {
        return Observable.fromEvent(client, 'disconnect')
          .map(() => client)
      });
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
    
    this.getMessages = messageTypeRegex => {
      return this.messages;
    };
  
    this.sendMessage = ({type, data}) => {
      if(type === 'REQUEST-SNAPSHOT') {
        this.messages.next({type: 'SNAPSHOT', data: {}});
      }
    };
  }
}

