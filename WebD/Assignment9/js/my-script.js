$(document).ready(function() {

  $('li.expand').click(function() {
    // hide and show navigation menu
    $('li.nav').slideToggle();
  })

  //change color of horizontal rule to red when clicked on
  $('hr').click(function() {
    $(this).css('color', 'red');
  })


  $('img.footer_image').hover(function() {
    $(this).attr('src', 'images/nyu_logo_final.jpg');
  }, function() {
    $(this).attr('src', 'images/cims_banner.jpg');
  })


})
