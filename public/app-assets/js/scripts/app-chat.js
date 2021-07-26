var socket = io("http://localhost:3000");
var no_more_get_message_call = false;
$(document).ready(function () {
   var receiver_id = localStorage.getItem("receiver_id");
   if(receiver_id != null){
      $("#"+receiver_id).click();
   }
   "use strict";

   // Sidenav
   if ($(window).width() > 900) {
      $("#chat-sidenav").removeClass("sidenav");
   }

   // Pefectscrollbar for sidebar and chat area
   if ($(".sidebar-chat").length > 0) {
      var ps_sidebar_chat = new PerfectScrollbar(".sidebar-chat", {
         theme: "dark"
      });
   }

   if ($(".chat-area").length > 0) {
      var ps_chat_area = new PerfectScrollbar(".chat-area", {
         theme: "dark"
      });
   }

   // Close other sidenav on click of any sidenav
   $(".sidenav-trigger").on("click", function () {
      if ($(window).width() < 960) {
         $(".sidenav").sidenav("close");
         $(".app-sidebar").sidenav("close");
      }
   });

   // Toggle class of sidenav
   $("#chat-sidenav").sidenav({
      onOpenStart: function () {
         $("#sidebar-list").addClass("sidebar-show");
      },
      onCloseEnd: function () {
         $("#sidebar-list").removeClass("sidebar-show");
      }
   });

   // Favorite star click
   $(".favorite i").on("click", function () {
      $(this).toggleClass("amber-text");
   });

   // For chat sidebar on small screen
   if ($(window).width() < 900) {
      $(".app-chat .sidebar-left.sidebar-fixed").removeClass("animate fadeUp animation-fast");
      $(".app-chat .sidebar-left.sidebar-fixed .sidebar").removeClass("animate fadeUp");
   }

   // chat search filter
   $("#chat_filter").on("keyup", function () {
      $('.chat-user').css('animation', 'none')
      var value = $(this).val().toLowerCase();
      if (value != "") {
         $(".sidebar-chat .chat-list .chat-user").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
         });
         var tbl_row = $(".chat-user:visible").length; //here tbl_test is table name

         //Check if table has row or not
         if (tbl_row == 0) {
            if (!$(".no-data-found").hasClass('show')) {
               $(".no-data-found").addClass('show');
            }
         }
         else {
            $(".no-data-found").removeClass('show');
         }
      }
      else {
         // if search filter box is empty
         $(".sidebar-chat .chat-list .chat-user").show();
      }
   });

   $(".chat-area").scrollTop($(".chat-area > .chats").height());
   // for rtl
   if ($("html[data-textdirection='rtl']").length > 0) {
      // Toggle class of sidenav
      $("#chat-sidenav").sidenav({
         edge: "right",
         onOpenStart: function () {
            $("#sidebar-list").addClass("sidebar-show");
         },
         onCloseEnd: function () {
            $("#sidebar-list").removeClass("sidebar-show");
         }
      });
   }
});
//append message in chat boz
var appendMessage = function(message, type=''){
   if(type == 'receiver'){
      var side_cls = 'chat-left';
   }else{
      var side_cls = 'chat-right';
   } 
   var str = '<div class="chat '+side_cls+'"><div class="chat-body"><div class="chat-text"><p>'+message+'</p></div></div></div>';  
   $('.message_box').append(str);
   $(".chat-area").scrollTop($(".chat-area > .chats").height());
}
//save message to database
var saveMessage = function(){   
   var form_data = $(".chat-input").serialize();   
   $.ajax({
      url: save_message_route,
      method: "POST",
      data: form_data,
      /*dataType:'JSON',
      contentType: false,
      cache: false,
      processData: false,*/
      success:function(response)
      {         
         if(response){
            $(".message").val("");
         }
         else{
            alert('Failt to send');
         }
      }
   });
}
// on chat message broadcast to user
socket.on('chat-message', data => {    
   appendMessage(data, 'receiver');
});
// Add message to database
var enter_chat = function(source) {
   var message = $(".message").val();   
   if (message != "") {
      $('.message').removeClass('error');
      socket.emit('send-chat-message', message);
      appendMessage(message);
      saveMessage();
   }else{
      $('.message').addClass('error');
   }
}

$(window).on("resize", function () {
   if ($(window).width() > 899) {
      $("#chat-sidenav").removeClass("sidenav");
   }

   if ($(window).width() < 900) {
      $("#chat-sidenav").addClass("sidenav");
   }
});

//function to get message from table
var getMessages = function(receiver_id){
   var index = parseInt($('#index').val());   
   $.ajax({
      url: get_messages_route,
      method: "get",
      data: { 'receiver_id' : receiver_id, 'index' : index },
      dataType:'JSON',
      async: false,
      headers: {
         'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
      },
      beforeSend: function() {
         $('.loader').removeClass('hide');
      }, 
      success:function(response)
      {  
         $('.loader').addClass('hide');         
         if(response.length > 0){
            var chat = '';
            $('.receiver_name').html();
            $('.receiver_email').html();
            $('.receiver_image').attr('src','test.png');
            $.each(response, function(key, item){
               var side_cls = 'chat-right';
               if(item.sender_id == receiver_id){
                  side_cls = 'chat-left';
               }
               chat += messageSection(item.message, side_cls);
               
            });
            if(index == 0){
               $('.message_box').html(chat);
            }else{
               setTimeout(function(){
                  $('.message_box').prepend(chat);
               },3000);
               
            }
            $('#index').val(index + response.length);            
         }else if(response.length == 0 && index == 0){
            $('.message_box').html('');
         }else{
            no_more_get_message_call = true;
         }     
      }
   }); 
}


//open a chat list for specific receiver
var openChat = function(div, user){   
   $('.chat_area').removeClass('hide');
   $('.chat_home').addClass('hide');
   var receiver_id = parseInt(user.id);
   localStorage.setItem("receiver_id", receiver_id);
   $('#receiver_id').val(receiver_id);
   var name = user.name.trim();   
   $('.receiver_name').html(name);
   $('.receiver_email').html(user.email);
   $('.receiver_image').attr('src', '#');
   $('.open_chat').removeClass('active');
   $(div).addClass('active');
   $('#index').val(0);
   getMessages(receiver_id); 
   $('.chat-area').scrollTop($('.chat-area').prop("scrollHeight"));
}
// function to create message and return
var messageSection = function(message, side){
   return '<div class="chat '+side+'">'+
               '<div class="chat-body">'+
               '<div class="chat-text">'+
               '<p>'+message+'</p>'+
               '</div>'+
               '</div>'+
               '</div>';
}
// on scroll event for chat box
jQuery(function($) {
   $('.chat-area').on('scroll', function() {      
      if($(this).scrollTop() <= 1) {            
         if(!no_more_get_message_call){
            getMessages($('#receiver_id').val());            
         }
      }
   })
});