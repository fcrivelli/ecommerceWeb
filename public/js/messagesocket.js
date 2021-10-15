var socket = io('http://localhost:8080'); 
socket.on('messages', function(data) { 
  console.log(data);
  renderMessages(data);
});

function renderMessages (data) { 
  var html = data.map(function(elem, index) { 
    return(`<div>
            <strong style="color: blue;">${elem.username}</strong>
            <strong style="color: brown;">${elem.date}</strong> : 
            <em style="color: green;">${elem.text}</em> </div>`);
  }).join(" "); 
  document.getElementById('messages').innerHTML = html; 
}

function showTime(){
    myDate = new Date();
    day = myDate.getDate();
    month = myDate.getMonth();
    year = myDate.getFullYear();
    hours = myDate.getHours();
    minutes = myDate.getMinutes();
    seconds = myDate.getSeconds();
    if (hours < 10) hours = 0 + hours;
    if (minutes < 10) minutes = "0" + minutes;
    if (seconds < 10) seconds = "0" + seconds;
    return (day + "/" + month + "/" + year + " " + hours+ ":" +minutes+ ":" +seconds);
}

function addMessage(e) { 
  var message = { 
    username: document.getElementById('username').value, 
    text: document.getElementById('texto').value,
    date: showTime()
  }; 
  socket.emit('new-message', message); return false; 
}
