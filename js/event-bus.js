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

class MockWebSocketEventBus {
  constructor(websocketCtr) {
    this.getMessages.bind(this);
    this.sendMessage.bind(this);
    
    this.messages = Observable.create();
  }

  getMessages(messageType) {
    return this.messages.pipe(
      filter(message => messageType === message.type));
  }
	
	sendMessage(messageType, data) {
	    switch(messageType) {
        case "REQUEST-SNAPSHOT":
          this.messages.next(
            JSON.stringify({
              type: "SNAPSHOT",
              data: {}
            })
          );
      }
	}
}

