$(document).on('turbolinks:load', function(){

  function buildHTML(message){
    var content = message.content ? `${message.content} ` : ''
    var image = message.image.url ? `<img src='${message.image.url}'> ` : ''

    var html = `<div class = "message" data-id=${message.id}>
                  <div class = "upper-message">
                    <div class = "upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class = "upper-message__date">
                      ${message.date}
                    </div>
                  </div>
                  <p class = "lower-message__content">
                    ${content}
                    ${image}
                  </p>
                </div>`
    return html;
  }
  //メッセージのスクロール
  function scroll(){
    $(".messages").animate({scrollTop:$('.messages')[0].scrollHeight});
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
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
      scroll();
      $('form')[0].reset();
      $(".form__submit").removeAttr("disabled");
    })
    .fail(function(){
      alert('error');
    })
  })
})
