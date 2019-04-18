$(document).on('turbolinks:load', function(){ 
  $(function(){
    var search_list = $("#user-search-result");

    function appendUser( user ) {
      var html = `<div class="chat-group-user clearfix>
                    <p class="chat-group-user__name">${ user.name }</p>
                    <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id= ${user.id} data-user-name=${user.name}>追加</a>
                  </div>`;
                  search_list.append( html );
    }

    function appendErrMsgToHTML( msg ){
      var html = `<div class=" chat-group-user clearfix>
                  <p class="chat-group-user__name">${ msg }</p>`
                  search_list.append( html );
    }

    var member_list = $("#chat-group-users");

    function addUser(userId,userName) {
      var html = `<div id='chat-group-users'>
                    <div class='chat-group-user clearfix js-chat-member" id='${userId}'>
                      <input name="group[user_ids][]" type="hidden" value='${userId}'>
                      <p class="chat-group-user__name">${userName}</p>
                      <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove jsremove-btn">削除</a>
                  </div>`;
      member_list.append(html);
    }
    $( "#user-search-field" ).on( "keyup", function(){
      var input = $( "#user-search-field" ).val(); 
      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done( function( users ) {
        $( "#user-search-result" ).empty();
        if ( users.length !== 0 ) {
          users.forEach( function( user ){
            appendUser( user );
          });
        }
        else {
          appendErrMsgToHTML( "一致するユーザーが見つかりません" )
        }
      })
      .fail( function() {
        alert('ユーザー検索に失敗しました');
      })
    });

      $(document).on("click", ".user-search-add", function(){
        $('#chat-group-users').val();
          var userId = $(this).data('user-id');
          var userName = $(this).data('user-name');
          addUser(userId,userName);
          $(this).parent().remove();
      });

      $(document).on("click", ".user-search-remove", function(){
        $(this).parent().remove();
      });
  });
});
