function comment(id,No){
    let comment=document.getElementById(id).value
    console.log(No);
    $.ajax({
        url:'/comment/'+id,
        data:{
            comment:comment,
            status:No
        },
        method:'post',
        success:(response)=>{
            console.log("enter ajax");
            if(response.status){
                let id=response.id
                console.log(response.comment);
                console.log(response.userStatus);
               let a= document.getElementById("b"+id)
               let b= document.getElementById("c"+id)
               b.innerHTML=response.userStatus
               a.value=response.comment
            }
        }
    })
}

function StatusYes(id){
    $.ajax({
        url:'/YesUpdate/'+id,
        method:'post',
        success:(response)=>{
            if(response.status){
                let a = document.getElementById("c"+id)
                a.innerHTML="YES"
            }
        }
    })
}