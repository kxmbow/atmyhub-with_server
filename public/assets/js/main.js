class Post{
    constructor(link,title,image,description,webSource,timePublished,basedOn){
        this.link = link;
        this.title = title;
        this.image = image;
        this.description = description;
        this.webSource = webSource;
        this.timePublished = timePublished;
        this.basedOn = basedOn;
       

    }
}



var app = new Vue ({
    el: "#new-content",
    data: {
        postList: [],
        
    }
})

var example1 = new Vue({
    el: '#example-1',
    
    data: {
        items: []   
    }
})

//=======================================
Vue.component('todo-item', {
    template: '\
      <li>\
        {{ title }}\
        <i class="material-icons todoIcons" style="width:1px; height:1px; background-color:blue" v-on:click="$emit(\'remove\')">check_circle</i>\
      </li>\
    ',
    props: ['title']
  })
  new Vue({
    el: '#todo-list',
    data: {
      newTodoText: '',
      todos: [
        
      ],
      nextTodoId: 1
    },
    methods: {
      addNewTodo: function () {
        this.todos.push({
          id: this.nextTodoId++,
          title: this.newTodoText
        })
        this.newTodoText = ''
      }
    }
});

//=======================================
$(document).ready(function(){
    
  var queryURL= "https://quotes.rest/qod"
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response){   
    $("#quote-text").text(response.contents.quotes[0].quote);
    $("#quote-author").text(response.contents.quotes[0].author);
  })
  
  function weatherDisplay(param){
    $.ajax({
      url: "https://api.openweathermap.org/data/2.5/weather?q="+param+"&units=metric"+"&appid=fc7875872eb91e2851995ee3946e5477",
      method: "GET"
    }).done(function(response){
      var weatherVal = parseInt(response.main.temp);
      $("#weatherImg").attr("src","https://openweathermap.org/img/w/"+response.weather[0].icon+".png");
      $("#weatherState").text(response.weather[0].description);
      $("#weatherForecast").text( weatherVal + "°");
      $("#city").text(param).charAt[0].toUpperCase();
    })
  }
    
    weatherDisplay("Houston")
    //=================Getting interests array=====================================
    $.ajax({
      method: "get",
      url: "/api/feed"
    }).done(function(data){
      // console.log(data)
      // data[0].interests.forEach(newsDisplay);
      $("#username").text(data[0].email)
      var user = data[0].firstname;
      var humanizedGreeting = "Good " + getGreetingTime(moment()) + ", " + user + ".";
      $("#userGreet").text(humanizedGreeting);
      weatherDisplay(data[0].city);
        
        
      // for (i=0;i<data[0].interests.length;i++){
      //   $("#toDelete").append("<li>" +data[0].interests[i]+"</li>");
      // }   
    })


    //=============================================================================
    function getGreetingTime (m) {
      var g = null; //return g
      
      if(!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.
      
      var split_afternoon = 12 //24hr time to split the afternoon
      var split_evening = 17 //24hr time to split the evening
      var currentHour = parseFloat(m.format("HH"));
      
      if(currentHour >= split_afternoon && currentHour <= split_evening) {
          g = "afternoon";
      } else if(currentHour >= split_evening) {
          g = "evening";
      } else {
          g = "morning";
      }
      
      return g;
        
        $("#dateTime").text(g);
    }
    getGreetingTime();
    var user = "James";
    var humanizedGreeting = "Good " + getGreetingTime(moment()) + ", " + user + ".";
    
    
    
    
    
    //============================================================================


    function newsDisplay(q){
      $.ajax({
        type: "GET",
        url: "https://api.cognitive.microsoft.com/bing/v7.0/news/search?q="+q,
        beforeSend: function(req) {
          req.setRequestHeader("Ocp-Apim-Subscription-Key", "9b89b39fa70f44c68b05e1bc2954fe51");
        },
        data: "{body}"
      }).done(function(res){
        console.log(res);
        alert(JSON.stringify(res));
      })
    }
    


    

  

    $("#addInput").click(function(){
      setTimeout(function(){ $("#add").val(""); }, 3000);
        
    }) 
    

    
   
  


});




