$(document).on('turbolinks:load', function(){ 
$(function(){
function buildHTML(message){
  var imagecheck =(message.image)
                ?` <img class="message__text__image" src=${message.image}> 
                </img>`
                :"";

  var messageHtml =`<div class="message">
            <div class="message__upper-info">
              <div class="message__upper-info__talker">
                ${ message.user_name }
              </div>
              <div class="message__upper-info__date">
                ${ message.time}
              </div>
            </div>
            <div class="message_text">
              <p>
                ${ message.body}
              </p>
               ${imagecheck}
            </div>`
  return messageHtml;
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
      var html = buildHTML(messageFormData);
      $('.messages').append(html);
      $('.input-box__text').val("");
      $('.input-box__image__file').val("");
      $('.submit-btn').prop('disabled', false);
      scrollToBottom()
    })
    .fail(function(){
      alert('error')
      $('.form__submit').prop('disabled',false);
    })
  })
})
});