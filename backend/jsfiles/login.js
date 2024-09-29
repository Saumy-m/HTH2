function login()
{
    let username=document.getElementById("username").value
    let password=document.getElementById("password").value

    let returningUser=new XMLHttpRequest();
    returningUser.open("POST","/login")
    returningUser.onreadystatechange=function(){
        if(returningUser.readyState==4 && returningUser.status==200)
        {
            alert(returningUser.responseText);
            window.location.href=`http://localhost:3000`;
        }
        else
        {
            alert(returningUser.responseText);

        }
    }
    let loginInfo={username,password}
    loginInfo=JSON.stringify(loginInfo);
    returningUser.send(loginInfo);

}
