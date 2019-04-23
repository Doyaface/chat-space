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

      if($('.messages')[0]){
        var message_id = $('.messages:last').data('id');
      } else {
        var message_id = 0
      }
      var presentUrl = location.href
      var apiUrl = presentUrl.replace(/message/g, "api/message")
      last_message_id = $('.message:last').data('message_id')
      $.ajax({
        url: apiUrl,
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })

      .done(function(message){
        console.log(message)
        var insertHTML = '';
        message.forEach( function( message ){
            insertHTML += messageBuildHTML( message );
        });
        $('.messages').append(insertHTML);
          if (message.length !== 0){
            scrollToBottom();
          }
      })
      .fail(function(){

        console.log('自動更新に失敗しました。');
      });
    }
    setInterval(reloadMessages, 5000);
  })
});
