//weather api
let city = document.getElementById('city');
let temp = document.getElementById('temp');
let image  = document.getElementById('icon');
let description = document.getElementById('description');

function weather(){ 
  let url = "https://api.openweathermap.org/data/2.5/weather?q=yangon&appid=91d87356e76b33f17e538f88124e3720&units=metric";
  fetch(url)
  .then((res) => res.json())
  .then((data) => {
    city.innerHTML = data.name;
    description.innerHTML = data.weather[0].description;
    //set icon
    let img = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    temp.innerHTML = `Temp : ${data.main.temp}°C`;
    let icon = document.createElement('img');
    icon.setAttribute('src',img);
    image.append(icon);
  })
  .catch((error) => console.log(`404 error `))
}
weather()


//clock
function updateTime() {
  let currentTime = new Date();
  let hours = currentTime.getHours();
  let minutes = currentTime.getMinutes();
  let day = currentTime.getUTCDate();
  let month = currentTime.getUTCMonth() + 1;
  let year = currentTime.getUTCFullYear();
  let timeUnits;
  //set minutes
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  //set timeUnits
  if (hours < 12) {
    timeUnits = "AM";
  } else if (hours >= 12) {
    timeUnits = "PM";
  }
  let clock = `${hours} : ${minutes} ${timeUnits}`;
  let date = `${day}/${month}/${year}`;
  document.getElementById("clock").innerHTML = `${clock}`;
  document.getElementById("date").innerHTML = `${date}`;
}
setInterval(updateTime)

//quote api goes here !
fetch('https://goquotes-api.herokuapp.com/api/v1/random?count=1')
.then(res => res.json())
.then(data => {
  console.log(data)
  let text = data.quotes[0].text;
  let author = data.quotes[0].author;
  document.querySelector('#text').innerHTML = text;
  document.querySelector('#author').innerHTML = author;
})

//calender iframe
document.getElementById('button').addEventListener('click',
function addIframe(){  
  let calendar = document.getElementById('calendar');
//  calendar.setAttribute('id','calendar');
  let iframe = document.createElement('iframe');
  iframe.setAttribute(
    "src",
    "https://calendar.google.com/calendar/embed?height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;ctz=Asia%2FYangon&amp;src=a3lhd3NpdHRod2UxOEBnbWFpbC5jb20&amp;src=YWRkcmVzc2Jvb2sjY29udGFjdHNAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&amp;color=%23039BE5&amp;color=%2333B679"
  );
  iframe.setAttribute('style','border:solid 1px #777');
  iframe.setAttribute('style',"border-radius: 10px");
  iframe.setAttribute('width','100%');
  iframe.setAttribute('height','300');
  iframe.setAttribute('frameborder','1');
  iframe.setAttribute('scrolling','no');
  iframe.setAttribute('id','iframe');
  calendar.append(iframe);
  console.log(calendar)
})
//Todo list
let arr = [];

document.getElementById('todo').addEventListener('submit', addTodo)
let ul = document.getElementById('list');
//Get input value and append it to an object
function addTodo(e) {
  e.preventDefault();
  
  let input = document.getElementById('userInput').value;
  if(input !== ''){
   
    const todo = {
      id: new Date(),
      data: input
    }
    arr.push(todo)
    document.getElementById("userInput").value = "";
    addToLocalStorage(arr)  
  }
}
function getFromLocalStorage() {
  let reference = localStorage.getItem('Todo')
  //  console.log(reference)
  if(reference){
    todos = JSON.parse(reference);
  }
  renderTodos(todos)
  console.log(todos)
}
getFromLocalStorage();

function addToLocalStorage(todos) {
  localStorage.setItem("Todo", JSON.stringify(todos));
  renderTodos(todos);
}

function renderTodos(todos){
  // clear everything inside <ul> with class=todo-items
  ul.innerHTML = "";

  // run through each item inside todos
  todos.forEach(function (item) {

    const li = document.createElement("li");
    li.setAttribute("class", "item");
    li.innerHTML = `${item.data}`
    
    ul.append(li);
  });
}
