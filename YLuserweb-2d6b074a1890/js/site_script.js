var server_url = "http://139.59.139.239/ylbackend/api/";
//var urlLink = "https://youthleague.co/";
//var server_url = "http://localhost/ylbackend/api/";
//var urlLink = "file:///home/james/Desktop/Projects/yluserweb/";

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var user = getCookie("id");
    if (user !== "") {

    } else {
        window.location.href="index.html";
    }
}


//Functionality
$(document).ready(function(){
     $(this).scrollTop(0);
     $('html,body').scrollTop(0);
//Smooth Page Down
    $('.page-header-title-middle a').on('click', function(e){
        e.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top -110
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        //window.location.hash = hash;
      });
    });

//Notification
    $(".navbar-notification.notification.dropdown").on('hide.bs.dropdown',function() {
        // body...
        $("#nav").css({"overflow":"hidden"});
    })
    $(".navbar-notification.notification.dropdown").on('show.bs.dropdown',function() {
        // body...
        $("#nav").css({"overflow":"visible"});
    })
//Search
    $('#search').on('click focus active hover', function(){

         if($(this).val().length>1){
            $('#nav').css('overflow', 'visible');
            $('.searchList').show(500);
         }
    });

    $('#search').on('blur', function(){
        $('.searchList').hide(500);
        $('#nav').css('overflow', 'hidden');
    });

    $('#search').on('focus', function(){
    });
    $(document).on('click', function (e) {
        if($(e.target).is('#search') || $("#search").has(e.target).length !== 0) {
        } else {
            $('.searchList').hide(500);
        }
    });
    $(document).on('keyup', '#search',function(){
        //alert('keyup');
        if($(this).val().length>1){
            $('.searchList').show(500);
            liveHint($(this).val());
        }else{
            $('.searchList').hide(500);
        }
    });
    $('#nav .search-button').click(function(e){
        e.preventDefault();
        var search_data = $('#search').val();
        //alert('search');
        // alert('search for ' + search_data);
        var loc = "http://localhost/search.html?=" + search_data;
        //window.open(loc);
        //window.location.replace("http://www.w3schools.com");
        //location.href = 'https://www.youthleague.co/search.html';// + search_data;

        window.open('http://localhost/search.html?=' + search_data, '_self');
    });
//star rating
    $('.star').click(function(){
        //alert('me');
        $(this).siblings().removeClass('fa-star fiveStar').addClass('fa-star-o');
        $(this).removeClass('fa-star-o fiveStar').addClass('fa-star');
        $sibs = $(this).nextAll();
        $sibs.removeClass('fa-star-o').addClass('fa-star');

        if($sibs.length === 4)
        {
            $(this).addClass('fiveStar');
            $sibs.addClass('fiveStar');
        }
    });
//Profile Page
    $(".yl-heading-tabs .yl-heading-tabs-list a").on('click',function() {
        // alert($(".tab-content .active").attr("id"))
        var id=$(this).attr("href");
        $(".yl-heading-tabs-list .active").attr("class","");
        $(".tab-content .active").attr("class","container tab-pane");
        $(""+id).attr("class","container tab-pane active");

        $(this).parent().attr("class","active");

    });

    $('.tablinks').click(function(){
        //alert('next tab');
        $('.tablinks').removeClass('active');
        $(this).addClass('active');
    });

    $(function(){
    	$('#nav').addClass('fadeInDown');
    });
//password recovery
});

$(".input-field").each(function () {
    var $this = $(this);
    if ($this.val().length) {
        $this.parent().addClass("input--filled")
    }
    $this.on("focus", function () {
        $this.parent().addClass("input--filled");
    });
    $this.on("blur", function () {
        if (!$this.val().length) {
            $this.parent().removeClass("input--filled")
        }
    })
});

function liveHint(stringLookUp) {
    //alert('Searching ' + stringLookUp);
    $.post(server_url+"search-users.php", {
        id : getCookie('id'),
        search : stringLookUp
    }, function (data) {
    	var get = JSON.parse(data);
    	if(get.length>0){
        	var names = get.firstname;
            $('.searchList').html('');
        	for(var a of get){
                $('.searchList').append('<div class="userSearchResults"><a class="btn" href="http://localhost/view_profile.html?='+a.username+'"><p>@'+a.username+'</p></a></div>');
        	}
    	}else{
    	    $('.searchList').html('<p style="text-align:center;"><i style="margin:auto;">No results</i></p>');
    	}
    });
}
