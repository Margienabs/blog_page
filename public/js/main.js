$(function(){
    const api = "http://localhost:3000/results";
    const size = 5;
    let page = 1;
    
    fetch(api).then(function (response) {
            return response.json();
        }).then(function (json) {
            const { data: { message, success } } =  json;
            let noRecords = message.length;
            if(success){
                for(let i=0;  i < noRecords; i++){
                    let id = i + 1;
                    $("<a class='page-links' data-id="+id+">").attr("href","#").text(id).appendTo(".paging");
                }
                callGetCommentsApi(true);
                getPaginatedData();
            }
        });
        
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
                 $.each(message, function(prop, val) {
                     let dateStr = new Date(val.create_date);
                     let minutes = dateStr.getMinutes() < 10 ? '0'+dateStr.getMinutes()  : dateStr.getMinutes();
                     html +='<div class="comment-list">' +
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
                         '<a href="" class="btn-reply text-uppercase">reply</a>' +
                         '</div>' +
                     '</div>' +
                     '</div>';
                 });
                 contentArea.html(html);
         })
        }
});

