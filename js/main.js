$(function(){
    const url = "http://localhost:4000";

    $.get(url, function(response,status){
        const data  = JSON.parse(response);
        console.log(data);
    });


    $(".submit_btn").on('click',function(e){
        e.preventDefault();
        var payload = {
            name: $("input[id='name']").val().trim(),
            email: $("input[id='email']").val().trim(),
            subject: $("input[id='subject']").val().trim(),
            message: $("textarea[name='message']").val().trim()
        };
        const no_of_errors = Object.values(payload).filter((value) => {
            return value === "";
        }).length;
        if(no_of_errors > 0){
            alert("There is a missing field(s) please");
        } else {
            $.ajax({
                url: url + '/addcomment',
                type: "POST",
                data: payload,
                success: (response)=>{
                    console.log(response);
                },
                error: ()=> {
                    console.log('error occured')
                }
            })
        }
       
    })
})