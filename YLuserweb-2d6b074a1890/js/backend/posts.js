// var server_url = "https://api.youthleague.co/api/";
// var node_server = "https://youthleague.co:2048/";
var server_url = "http://139.59.139.239/ylbackend/api/";
var node_server = "http://139.59.139.239:2048/";


var allWaves = [];
var pushes = [];
 var thumbnail = new Image();
 var canvas = null;

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
    var user = getCookie("id");
    if (user != "") {

    } else {
        window.location.href="index.html"
    }
}

function dataURItoBlob(dataURI) {
    dataURI = dataURI.src;
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    var byteString = atob(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    // write the ArrayBuffer to a blob, and you're done
    var blob = new Blob([ab], {type: mimeString});
    console.log(blob);
    return blob;

    // Old code
    // var bb = new BlobBuilder();
    // bb.append(ab);
    // return bb.getBlob(mimeString);
}

function handleVideoSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render video files as thumbnails.
    for (var i = 0; i < files.length; i++) {
        var f = files[i];
        // Only process video files.
        if (!f.type.match('video.*')) {
            continue;
        }
        createVideoCanvas(f);
    }
 }

function createVideoCanvas(f){
    console.log("Converting canvas to image");
  var vid = document.createElement('video');
  vid.src = window.URL.createObjectURL(f);
  canvas = document.createElement('canvas');
  canvas.width  = 663.5;
  canvas.height = 350;
  vid.addEventListener('loadeddata', function() {
      canvas.getContext("2d").drawImage(vid, 0, 0, 663.5, 350);
    }, false);
  window.URL.revokeObjectURL(f);
  console.log(canvas);
    return canvas;
 }

 document.getElementById('video').addEventListener('change', handleVideoSelect, true);

$(function(){

//****************Get categories********************************
	checkCookie();
    var siteCats;
    var uploadUrl=node_server;
    var type;
    var checkCover = false;
    var id = getCookie('id');
    var username = getCookie("user");
    var modalPop = $('.post-cats');
    var MainsCategories=[];

    $.ajax({
    	url:server_url+"get-categories.php",
        data: {
            //post data to the server
            'id' : id
        },
        cache: false,
        method: "post",
        async: false,
        success: function(response){
            //make use of the response
            //console.log(response);
            siteCats = JSON.parse(response);
            var numCats = siteCats.length;
            //alert(numCats);
            for (var i = 0; i < numCats; i++) {
                var item = $('<a href="#" data-category-id="'+siteCats[i].category_id+'" class="cat-item">'+ siteCats[i].name +'</a><br />');
                $(modalPop).append(item);
                var obj={};
                    obj.id=siteCats[i].category_id;
                    obj.name=siteCats[i].name;

                MainsCategories.push(obj);
            }
        }
    }).fail(function(data){
        console.log("Could not get site categories");
    });

    //This part changes header in main
    if(window.location.toString().indexOf("mainf.html")>=0){
        // alert("in main")
        var a = window.location.toString();
        if (a.indexOf("=")>=0) {
            var cat_id=a.substring(a.indexOf("=")+1);
            if(cat_id.length<3){
                for(var j=0; j<MainsCategories.length ; j++){

                    if(MainsCategories[j].id==cat_id){
                        var elementPos=j;
                        break;
                    }
                }
                $(".page-header-title-middle h1").html(MainsCategories[elementPos].name+"<span>.</span>");
            }



        }

    }
//Upload Modal
    $('#add-cat').click(function(e){
        e.preventDefault();
        // console.log(e);

        $('#uploadModal .post-cats').toggle(200);
    });

    $('.post-cats a').click(function(e){
        e.preventDefault();
        // console.log(e);
        $(this).toggleClass('chosenCat');
    });

    //picture
    $('input[id="image"]').change(function(e){
        e.preventDefault();
        var file = $(this).val().split('\\').pop();

        if(file.length > 0){
            //reset other inputs
            $('.file-list').empty();
            $('input[id="video"]').val('');
            $('input[id="sound"]').val('');
            $('input[id="cover_file"]').val('');

            $('.cover_file').hide(100);
            $('.file-list').append('<p><strong>image: </strong>' + file + '<a class="fa fa-times"></a></p>');
            $('.file-list').show(100);
        }
        type = "image";
    });

    //video
    $('input[id="video"]').change(function(e){
        e.preventDefault();
        var file = $(this).val().split('\\').pop();

        if(file.length > 0){
            //reset other inputs
            $('.file-list').empty();
            $('input[id="image"]').val('');
            $('input[id="sound"]').val('');
            $('input[id="cover_file"]').val('');

            $('.cover_file').hide(100);
            $('.file-list').append('<p><strong>video: </strong>' + file + '<a class="fa fa-times"></a></p>');
            $('.file-list').show(100);
        }
        type = "video";
    });

    //music
    $('input[id="sound"]').change(function(e){
        e.preventDefault();
        var file = $(this).val().split('\\').pop();

        if(file.length > 0){
            $('.file-list').empty();
            $('input[id="image"]').val('');
            $('input[id="video"]').val('');
            $('input[id="cover_file"]').val('');

            $('.cover_file').show(100);
            $('.file-list').append('<p><strong>sound: </strong>' + file + '<a class="fa fa-times"></a></p>');
            $('.file-list').show(100);
            //reset other inputs
        }
        else{
            $('.cover_file').hide(100);
        }
        type = "audio";
    });

    //cover image
    $('input[id="cover_file"]').change(function(e){
        e.preventDefault();
        var file = $(this).val().split('\\').pop();

        if(file.length > 0){
            $('.file-list').append('<p><strong>cover: </strong>' + file + '<a class="fa fa-times"></a></p>');

        }
        checkCover = true;
    });

    //removing files
    $(document).on('click', '.fa-times',function(){
        var parent = $(this).parent();

        var fileType = parent.find('strong').html();
        /*if ($('.file-list').childNodes.length > 0()) {
            $(this).hide(100);
        }*/
        //alert(fileType);

        switch(fileType) {
            case "image: ":
                $('input[id="image"]').val('');
                break;
            case "video: ":
                $('input[id="video"]').val('');
                break;
            case "sound: ":
                $('input[id="sound"]').val('');
                break;
            default:
                $('input[id="cover_file"]').val('');
        }

        parent.remove();
        if($(".file-list").children().length = 0)
        {
            $(".file-list").css("display","none");
        }
    });


//****************Create post********************************
    $('#upload-image').submit(function(e){
         e.preventDefault();
    });
    $('#upload-video').submit(function(e){
         e.preventDefault();
    });
    $('#upload-music').submit(function(e){
         e.preventDefault();
    });

	$('#uploadModal button#btn-submit').click(function(e){
		e.preventDefault();
		var path_media="";
		var path_cover="";
		var category_data=[];
		var form3 = $('form.text-form');
		var formDatai = new FormData($("#upload-image")[0]);
		var formDatam = new FormData($("#upload-music")[0]);
		var formDatav = new FormData($("#upload-video")[0]);
		var formData2 = new FormData($("#post-cover")[0]);
		var formData3 = $(form3).serializeArray();
		formDatai.append('folder','uploads');
		formDatav.append('folder','uploads');
		formData2.append('folder', 'uploads');

		$(this).addClass("btn-loading");

		$(".chosenCat").each(function(){
			console.log($(this).data('category-id'));
			category_data.push($(this).data('category-id'));
		});

        if(category_data.length === 0){
            $("#error").text("Please select at least one category");
            $("#error").show(250).delay(5000).fadeOut();
            $(this).removeClass("btn-loading");
            return
        }

		if(type=="image"){
            console.log("image");
            uploadUrl=node_server + "api/upload/image";
			$.ajax({
				url:uploadUrl,
				data: formDatai,
				type: "POST",
				contentType: false,
	            processData: false,
				success:function(response){
					console.log(response);
                    var data = JSON.parse(response);
					if(data.status === "success"){
						path_media = data.image;
                        console.log(path_media);
					}else{
						console.log("Something went wrong.");
                        $("#error").text("Could not upload image");
                        $("#error").show(250).delay(5000).fadeOut();
                        $(this).removeClass("btn-loading");
						return;
					}
				},
				error: function(XMLHttpRequest, error){
					console.log("not done");
					console.debug(XMLHttpRequest);
					console.debug(error);
					console.log('unable to create post.');
					return;
				},
				async: false
			});
		}
		if(type=="video"){
            console.log("video");
            uploadUrl=node_server + "api/upload/video";
			$.ajax({
				url:uploadUrl,
				data: formDatav,
				type: "POST",
				contentType: false,
	            processData: false,
				success:function(response){
					console.log(response);
                    var data = JSON.parse(response);
					if(data.status === "success"){
						path_media = data.video;
                        path_cover = data.thumbnail;
					}else{
						console.log("Please upload file");
                        $("#error").text("Could not upload video");
                        $("#error").show(250).delay(5000).fadeOut();
                        $(this).removeClass("btn-loading");
						return;
					}
				},
				error: function(XMLHttpRequest, error){
					console.log("not done");
					console.debug(XMLHttpRequest);
					console.debug(error);
					console.log('ggggg');
					return;
				},
				async: false
			});
		}
		if(type=="audio"){
            console.log("audio");
            uploadUrl=node_server + "api/upload/audio";
			$.ajax({
				url:uploadUrl,
				data: formDatam,
				type: "POST",
				contentType: false,
	            processData: false,
				success:function(response){
                    var data = JSON.parse(response);
					if(data.status === "success"){
						path_media = data.audio;
                        if( document.getElementById("cover_file").files.length != 0){
                            uploadUrl=node_server + "api/upload/thumbnail";
                            console.log("cover");
                            $.ajax({
                                url:uploadUrl,
                                data: formData2,
                                type: "POST",
                                contentType: false,
                                processData: false,
                                success:function(response){
                                    var data = JSON.parse(response);
                                    if(data.status === "success"){
                                        path_cover = data.thumbnail;
                                        console.log(path_cover);
                                    }else{
                                        console.log("Please upload file");
                                        return;
                                    }
                                },
                                error: function(XMLHttpRequest, error){
                                    console.log("not done");
                                    console.debug(XMLHttpRequest);
                                    console.debug(error);
                                    console.log('ggggg');
                                    return;
                                },
                                async: false
                            });
                        }else{
                            path_cover = "";
                        }
                        console.log(path_media);
					}else{
						console.log("Please upload file");
                        $("#error").text("Could not upload audio");
                        $("#error").show(250).delay(5000).fadeOut();
                        $(this).removeClass("btn-loading");
						return;
					}
				},
				error: function(XMLHttpRequest, error){
					console.log("not done");
					console.debug(XMLHttpRequest);
					console.debug(error);
					console.log('ggggg');
					return;
				},
				async: false
			});
		}


		/*if(checkCover===true || canvas !== null){
		        if(canvas !== null){
		            thumbnail.src = canvas.toDataURL();
		            var blob = dataURItoBlob(thumbnail);
                    formData2 = new FormData(document.forms[0]);
		            formData2.append('file',blob,"thumbnail.png");
		        }
				try{
					$.ajax({
						url:uploadUrl,
						data: formData2,
						type: "POST",
						contentType: false,
						processData: false,
						success: function(response){
							console.log(response);
							if(response != "No upload"){
								path_cover = response.trim();
							}else{
								console.log("Please upload file");
								return;
							}
							thumbnail = null;
						},
						error: function(XMLHttpRequest, error){
							console.log("not done");
							console.debug(XMLHttpRequest);
							console.log(error);
							return;
						},
						async: false
					});
				}catch(e){
					console.log(e);
				}
		}*/

		if (path_media) {
 		//alert(path_media)
		    $(this).addClass("btn-loading");
		    var self=this;
			$.ajax({
				url:server_url+"create-post.php",
				data:{
					"id": id,
					"title": document.getElementById("title").value,
					"description":document.getElementById("text").value,
					"status": "post",
					"type": type,
					"media_url": path_media,
					"cover_image": path_cover,
					"location": "",
					"categories": category_data
				},
				type: "POST",
				success: function(response){
				    //alert(response)
					if(response.trim() == "true"){
						//console.log("Got my response");
            		    $(self).removeClass("btn-loading");

					// window.location.href="mainf.html";
    					window.location.reload();
					}else{
						console.log("Something went wrong");
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown){
					console.log('error');
					console.log(XMLHttpRequest);
				}
			});
		}else{
            $("#error").text("Please select a file to upload");
            $("#error").show(250).delay(5000).fadeOut();  
            $(this).removeClass("btn-loading"); 
        }




	});

//****************Delete Post********************************
    $(document).on('click', '.blog-item .del-Post', function(e){
        e.preventDefault();
        var parent = $(this).parents('.blog-item');
        //alert(parent.text());
        //alert('are you sure you want to delete this event?');

        $.ajax({
        	url: server_url+"archive-post.php",
        	data: {
        		//post data to the server
        		"id": getCookie('id'),
                "post_id": $(parent).attr('data-post-id')
        	},
        	cache: false,
        	method: "post",
        	success: function(response){
        		//make use of the response
        		$(parent).hide(500);
        	}
        });
    });

//****************Edit Post********************************
    $(document).on('click', '.dropdown .edit-Post', function(){
        //alert('edit post');
        var descrip = $(this).parents('.blog-item-body').find('p').text();
        var title = $(this).parents('.blog-item-title-wrapper').find('.blog-item-title h1').text();
        $('#edit-post-title').val(title).focus();
        $('#edit-post-text').val(descrip);

        var postID = $(this).parents('.blog-item').attr('data-post-id');
        $('#submit-post-edit').attr('data-post-id', postID);
        $('#edit-post-title').focus();
    });

    $(document).on('click', '#submit-post-edit', function(e){
        e.preventDefault();
        var $me = $(this);
        $(this).addClass("btn-loading");

        var postID = $(this).attr('data-post-id');
        var newTitle = $('#edit-post-title').val();
        var newDescrip = $('#edit-post-text').val();

        //alert(postID + ', ' + newTitle + ', ' + newDescrip);

        $.ajax({
        	url: server_url+"update-post.php",
        	data: {
        		//post data to the server
        		"id": getCookie('id'),
                "post_id": postID,
                "title": newTitle,
                "description": newDescrip
        	},
        	cache: false,
        	method: "post",
        	success: function(response){
        		//make use of the response
                $($me).removeClass("btn-loading");
                console.log(response);
                $('#editPostModal').modal('hide');
                //console.log('updated post ' + postID + 'updated successfully');
                window.location.reload();
        	}
        });
    });
});
