$(function(){
    const api = "http://localhost:3000/results";
    const size = 12;
    let page = 1;
    
    fetch(api).then(function (response) {
            return response.json();
        }).then(function (json) {
            const { data: { message, success } } =  json;
            let noRecords = message.length;
            console.log(noRecords);
            if(success){
                for(let i=0;  i < noRecords; i++){
                    let id = i + 1;
                    $("<a class='page-links' data-id="+id+">").attr("href","#").text(id).appendTo(".paging");
                }
                callGetCommentsApi(true);
                getPaginatedData(); 
            }
        });
        replyToThisComment();
        
        
        function getPaginatedData(){
            $(document).on("click", ".page-links", function(e){
                e.preventDefault();
                let dataId = $(this).attr("data-id");
                callGetCommentsApi(false, dataId);
            })
        }

        function callGetCommentsApi(showFirstPage, pageId){
            var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
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

                //  hiddens.forEach( value => {
                //     if(!(typeof value === "undefined" || value === "")){
                //         nestedPost = contentArea.find('[data-hidden="' + value +'"]').parents('div.comment-list');
                //         allParents = contentArea.find('.comment-list');
                //         console.log(allParents);
                        
                    
                        
                //     }
                //  })
                 // nestedPost.addClass("left-padding");
                // nestedPost.find("a.btn-reply").remove();
                // $(nestedPost).insertAfter(nestedParent);
         })
        }

        function replyToThisComment(){
            $(document).on("click", ".btn-reply",function(e){
                e.preventDefault();
                parentId = $(this).attr("data-identifier");
                $("input[type='hidden']").val(parentId);
                window.scrollTo(0, 800);
            })
            
            //console.log($(document).find(".comment-list"));
        }
});

