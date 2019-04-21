$(document).on('turbolinks:load', function(){ 
  $(function(){
    function messageBuildHTML(message){
      var imagecheck =(message.image)
                    ?` <img class="message__text__image" src=${message.image}> 
                    </img>`
                    :"";
      var messageHTML =`<div class="message" data-message_id="${message.id}">
                <div class="message__upper-info">
                  <div class="message__upper-info__talker">
                    ${ message.user_name }
                  </div>
                  <div class="message__upper-info__date">
                    ${ message.time }
                  </div>
                </div>
                <div class="message_text">
                  <p>
                    ${ message.body }
                  </p>
                  ${imagecheck}
                </div>`
      return messageHTML;
    }

    function scrollToBottom(){
      $('.messages').animate({scrollTop:$('.messages')[0].scrollHeight});
    }

    $('#new_message').on('submit',function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
    
      .done(function(messageFormData){
        var html = messageBuildHTML(messageFormData);
        $('.messages').append(html);
        $('form').get(0).reset()
        $('.submit-btn').prop('disabled', false);
        scrollToBottom()
      })
      .fail(function(){
        alert('エラー')
        $('.form__submit').prop('disabled',false);
      })
    })
    
    var reloadMessages = function(){
      last_message_id = $('.message:last').data('message_id')
      console.log(last_message_id)
      $.ajax({
        url: '/groups/:group_id/api/messages',
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })

      .done(function(messaages){
        var insertHTML = '';
        messaages.forEach( function( message ){
            insertHTML += messageBuildHTML( message );
        });
        $('.messages').append(insertHTML);
        scrollToBottom()
      })
      .fail(function(){
        console.log('error');
      });
    }
    setInterval(reloadMessages, 5000);
  })
});
