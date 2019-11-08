$(function(){
    const api = "http://localhost:3000/results";
    const size = 6;
    let page = 1;
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
    fetch("http://localhost:3000/getCount").then(function (response) {
            return response.json();
        }).then(function (json) {
            let noRecords = json.length;
                for(let i=0;  i < noRecords; i++){
                    let id = i + 1;
                    $("<a class='page-links' data-id="+id+">").attr("href","#").text(id).appendTo(".paging");
                }
                // $('#pagination-demo').pagination({
                //     items: noRecords,
                //     itemsOnPage: size,
                //     cssStyle: 'dark-theme'
                // });
                callGetCommentsApi(true);
                getPaginatedData(); 
            // }
        });
        replyToThisComment();
        searchPost();
        listPopularPosts();
        
        
        function getPaginatedData(){
            $(document).on("click", ".page-links", function(e){
                e.preventDefault();
                let dataId = $(this).attr("data-id");
                callGetCommentsApi(false, dataId);
            })
        }

        function callGetCommentsApi(showFirstPage, pageId){
            if(showFirstPage){
                page = 1;
            }
            else {
                page = pageId;
            }
            $.get(api + "?pageNo="+page+"&size="+size, function(response){
                const { data: { message } } = response;
                 let html = '';
                 let contentArea = $(".comments-area").empty();
                 let hiddens = [];
                 $.each(message, function(index, val) {
                     let dateStr = new Date(val.create_date);
                     if(!(typeof val.hidden === "undefined")){
                         if(!(val.hidden == "")){
                             hiddens.push(val.hidden);
                         }
                     }

                     let minutes = dateStr.getMinutes() < 10 ? '0'+dateStr.getMinutes()  : dateStr.getMinutes();
                     html +='<div class="comment-list" data-parent="'+ val._id +'">' +
                           '<div class="single-comment justify-content-between d-flex">' +
                           '<div class="user justify-content-between d-flex">' +
                           '<div class="thumb">' +
                           '<img src="img/blog/c5.jpg" alt="">' +
                           '</div>' +
                           '<div class="desc">' +
                                 '<h5><a href="#"> '+ val.name +'</a></h5>' +
                                 '<p class="date">' + months[dateStr.getMonth()] + ' ' + dateStr.getDate() + ',' + dateStr.getFullYear()  + ' at ' + dateStr.getHours() + ':' + minutes + '' + '</p>' +
                                 '<p class="comment">' + val.message +
                                 '</p>' +
                             '</div>' +
                         '</div>' +
                         '<div class="reply-btn">' +
                         '<a href="#" class="btn-reply text-uppercase" data-hidden="' + val.hidden + '" data-identifier="' + val._id + '">reply</a>' +
                         '</div>' +
                     '</div>' +
                     '</div>';
                 });
                 contentArea.html(html);
                 let nestedPost;
                 let allParents = contentArea.find('.comment-list');
                 $.each( allParents, function(index,value){
                    let parent = $(this);
                    let parentId = $(this).attr('data-parent');
                    $.each( hiddens, function(index,val){
                        if( val === parentId){
                            nestedPost = contentArea.find('[data-hidden="' + val +'"]').parents('div.comment-list');
                            nestedPost.addClass("left-padding");
                            nestedPost.find("a.btn-reply").remove();
                            nestedPost.appendTo(parent);
                        }
                    })

                 })
         })
        }

        function replyToThisComment(){
            $(document).on("click", ".btn-reply",function(e){
                e.preventDefault();
                parentId = $(this).attr("data-identifier");
                $("input[type='hidden']").val(parentId);
                window.scrollTo(0, 800);
            })
        }

        function searchPost(){
            $(document).on("click", ".search-button",function(e){
                let inputValue = ($(document).find(".search-field").val()).trim('');
                $(document).find(".search-field").val("");
                if(inputValue.length){
                    $.ajax({
                        type: "POST",
                        url: "/search",
                        data: {
                            "searchTerm": inputValue
                        },
                        dataType: 'json',
                        success: function(response){
                           let html ='';
                           if(response.length > 0 ){
                            $.each( response, function(index,value){
                                let dateStr = new Date(value.create_date);
                                let minutes = dateStr.getMinutes() < 10 ? '0'+dateStr.getMinutes()  : dateStr.getMinutes();
                                html += '<div class="comment-list">' +
                                        '<div class="single-comment justify-content-between d-flex">' +
                                        '<div class="user justify-content-between d-flex">'+
                                        '<div class="thumb">' +
                                        '<img src="img/blog/c1.jpg" alt="">' + 
                                        '</div>' +
                                        '<div class="desc">' +
                                            '<h5><a href="#">' +value.name+'</a></h5>' +
                                            '<p class="date">'+months[dateStr.getMonth()] + ' ' + dateStr.getDate() + ',' + dateStr.getFullYear()  + ' at ' + dateStr.getHours() + ':' + minutes + '' +'</p>'+
                                            '<p class="comment"> '+ value.subject +'</p>'+
                                                '</div>'+
                                            '</div>' +
                                        '</div>' +
                                    '</div>'
                               });
                           } else {
                               html += "<div>No records matching the search term were found!</div>"
                           }
                           
                           $(document).find('.search-results').html(html);
                        }
                    })
                } else {
                    alert("Please type a word to search for in the database")
                }
            })
        }
        function listPopularPosts(){
            fetch("http://localhost:3000/records").then(function (response) {
            return response.json();
            }).then(function (results) {
               let popularIds = [];
               let popItems = [];
               results.forEach(function(value, index){
                   if(typeof value.hidden !== "undefined") {
                       if(value.hidden !==''){
                        !popularIds.includes(value.hidden) && popularIds.push(value.hidden);
                       }
                   }
                   
               })
               results.forEach(function(value,index){
                   popularIds.forEach(function(valueId){
                       if(valueId === value._id){
                           popItems.push(value);
                       }
                   })
               })
               let container = $(document).find(".pop-items-container");
               if(popItems && popItems.length > 0){
                   let html = '';
                   container.empty();
                $.each(popItems, function(index, value){
                    let dateStr = new Date(value.create_date);
                    let hours = dateStr.getHours();
                    let minutes = dateStr.getMinutes() < 10 ? '0'+dateStr.getMinutes()  : dateStr.getMinutes();
                    html += '<div class="media post_item">' +
                            '<img src="img/blog/popular-post/post1.jpg" alt="post">' +
                            '<div class="media-body">' +
                            '<a href="blog-details.html"><h3>' + value.subject + '</h3></a>' +
                            '<p> Posted at ' + hours + ':' + minutes + '' + '</p>' +
                            '</div>' +
                            '</div>';
                })
                container.html(html);
               }
               else {
                container.html("<p>There are currently no popular posts</p>")
               }
               
            });
        }
});

