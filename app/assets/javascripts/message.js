$(document).on('turbolinks:load', function(){ 
$(function(){
function buildHTML(message){
var html =`<div class="message">
            <div class="message__upper-info">
              <div class="message__upper-info__talker">
                ${ message.user_name }
              </div>
              <div class="message__upper-info__date">
                ${ message.time}
              </div>
            </div>
            <p class="message_text">
              ${ message.body}
            </p>
          </div>`;
  return html;
}
function scroll(){
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
  
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.input-box__text').val("");
      $('.submit-btn').prop('disabled', false);
      scroll()
    })
    .fail(function(){
      alert('error')
      $('.form__submit').prop('disabled',false);
    })
  })
})
});