// var server_url = "https://api.youthleague.co/api/";
var server_url = "http://139.59.139.239/ylbackend/api/";

window.onload = loadIndex;

function loadIndex() {
	if(getCookie("user_atname") == ""){
		getPosts();
	}
}

function getPosts()
{
	//alert('get posts');
	//alert(document.cookie);
	$.post("ylbackend/api/getposts.php", {
        	//post data to the server
	    },
	    function(response){
	    	//alert(response);
	    	var myObj = JSON.parse(response);
	    	var numPosts = myObj.length;
	    	var html ="";

	    	var image,authorInfo,bottom;

	    	for (var i = 0; i < numPosts; i++) {
	    		//alert(myObj[i].id);
	    		image='<a class="blog-media animsition-link" href="blog_post.html"><img class="parallax-img img-responsive" src="'+myObj[i].url+'" alt="" data-center="transform: translate3d(0px, -50%, 0px)" data-top-bottom="transform: translate3d(0px, -10%, 0px)" data-bottom-top="transform: translate3d(0px, -90%, 0px)"></a>';
	    		authorInfo='<div class="blog-item-detail row"><div class="col-sm-9"><a href="#"><i class="fa fa-user"></i> '+myObj[i].atname+'</a><i class="fa fa-folder-open"></i> <a href="#" class="no-padding-right">category 1 </a>,<a href="#"> category 2</a><a href="#"><i class="fa fa-comment"></i> comments</a><span class="icon-map-pin"></span></div><div class="col-sm-3 text-right padding-top-xs-15"><a href="blog_post.html" class="btn-blog-more animsition-link"><span>view post</span><i class="btn-icon ci-icon-uniE8BE"></i></a></div></div>';
	    		bottom='<div class="row blog-item-title-wrapper"><div class="blog-item-title col-sm-6"><h1 class=" font-second">'+myObj[i].title+'</h1><span class="post-date">date posted</span></div><div class="col-sm-6 blog-item-body"><p class="post-text">'+myObj[i].description+'</p></div></div>';
	    		html+='<div class="blog-item">'+image+authorInfo+bottom+'</div>';

	    	}
	    	$(".section .container .row .col-sm-9").html(html);
        /*<div class="blog-item">
            <!-- Blog-item Header & Media-->
            <a class="blog-media animsition-link" href="blog_post.html">
                <img class="parallax-img img-responsive" src="images/art1.jpg" alt="" data-center="transform: translate3d(0px, -50%, 0px)" data-top-bottom="transform: translate3d(0px, -10%, 0px)" data-bottom-top="transform: translate3d(0px, -90%, 0px)">
            </a>
            <!-- Date, Author, Categories, Comments -->
            <div class="blog-item-detail row">
                <div class="col-sm-9">
                    <a href="#"><i class="fa fa-user"></i> user name</a>
                    <i class="fa fa-folder-open"></i> <a href="#" class="no-padding-right">cartegory 1 </a>,<a href="#"> cartegory 2</a>
                    <a href="#"><i class="fa fa-comment"></i> comments</a>
                    <span class="icon-map-pin"></span>
                </div>
                <div class="col-sm-3 text-right padding-top-xs-15">
                    <a href="blog_post.html" class="btn-blog-more animsition-link"><span>view post</span><i class="btn-icon ci-icon-uniE8BE"></i></a>
                </div>
            </div>
            <div class="row blog-item-title-wrapper">
                <div class="blog-item-title col-sm-6">
                    <h1 class=" font-second">title of <span>art</span> piece</h1>
                    <span class="post-date">date posted</span>
                </div>
                <!-- Text Intro -->
                <div class="col-sm-6 blog-item-body">
                    <p class="post-text">
                        Text about art piece.
                    </p>
                </div>
            </div>
        </div>*/

	    	/*var postElem = document.getElementsByClassName('blog-item')[0];
	    	var canvas = document.getElementsByClassName('blog-item')[0];
	    	for (var i = 0; i < numPosts; i++) {
	    		//create new post element
	    		var newPost = postElem.cloneNode(true);

	    		//define new post
				var postkids = postElem.children;
				postkids[0].children.src = myObj[i].url;//change image
				//alert(myObj[i].url);
				//change user name
				var links = postkids[1].getElementsByTagName('a');
				//var user = links[0].innerHTML;
				var user = links[0].getElementsByClassName('fa-user')[0];
				links[0].innerHTML = user + myObj[i].atname;

				postkids[2].getElementsByTagName('h1')[0].innerHTML = myObj[i].title //chance title
				postkids[2].getElementsByTagName('p')[0].innerHTML = myObj[i].description;//change text;

				//add post to canvas
				canvas.parentElement.parentElement.append(postElem);
	    	}*/

	    }
	);
}

function getPost()
{
	$.ajax({
		url: server_url+"getpost.php",
		data: {
			//post data to the server
			id: 1
		},
		cache: false,
		method: "post",
		success: function(response){
			//create Object with data
			var myObj = JSON.parse(response);
			alert(myObj.length);

			//get post structure
			var postElem = document.getElementsByClassName('blog-item')[0].cloneNode(true);

			//get elements to change
			//alert(postElem.children.length);
			var postkids = postElem.children;
			postkids[0].children.src = myObj[0].url;//change image
			//change user name
			var links = postkids[1].getElementsByTagName('a');
			var user = links[0].innerHTML;
			links[0].innerHTML = user + myObj[0].atname;

			postkids[2].getElementsByTagName('h1')[0].innerHTML = myObj[0].title //chance title
			postkids[2].getElementsByTagName('p')[0].innerHTML = myObj[0].description;//change text;

			//alert('show post');
			document.getElementsByClassName('blog-item')[0].parentElement.parentElement.append(postElem);
		}
	});
}

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
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}
