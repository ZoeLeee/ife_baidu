class AsyncRequest {
  constructor(methods, url, callback, propsData) {
    this.http = AsyncRequest.getXHR();
    this.http.open(methods, url);
    this.http.onreadystatechange = () => {
      if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        if (callback)
          callback();
      }
    }
    this.http.send(propsData || null);
  }
  static getXHR() {
    var xmlhttp;
    if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
      xmlhttp = new XMLHttpRequest();
    }
    else {// code for IE6, IE5
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
  }
}

class Observer {
  constructor() {
    this.fns = new Set();
  }
  subcribe(fn) {
    this.fns.add(fn);
  }
  unsubcribe(fn) {
    this.fns.delete(fn);
  }
  fire(o) {
    this.fns.forEach(fn => fn(o));
  }
}

class Quene {
  constructor() {
    this.quene = [];
    this.onCompelete = new Observer();
    this.onFilure = new Observer();
    this.onFlush = new Observer();
    this.retryCount = 3;
    this.currentRetry = 0;
    this.paused = false;
    this.timeout = 5000;
    this.conn = null;
    this.timer = null;
  }
  flush() {
    if (!this.queue.length > 0) {
      return;
    }

    if (this.paused) {
      this.paused = false;
      return;
    }
    this.currentRetry++;

    this.timer = setTimeout(() => {
      this.conn.abort();
      if (this.currentRetry == this.retryCount) {
        this.onFailure.fire();
        this.currentRetry = 0;
      } else {
        this.flush();
      }
    }, this.timeout);

    var callback = (o) => {
      clearTimeout(this.timer);
      this.currentRetry = 0;
      this.queue.shift();
      this.onFlush.fire(o.responseText);
      if (this.queue.length == 0) {
        this.onComplete.fire();
        return;
      }
      // recursive call to flush
      this.flush();
    }
    this.conn = new AsyncRequest(
      this.queue[0]['method'],
      this.queue[0]['uri'],
      callback,
      this.queue[0]['params']
    ).http;
  }
  setRetryCount(){
    this.retryCount = count;
  }
  setTimeout(){
    this.timeout = time;
  }
  
}