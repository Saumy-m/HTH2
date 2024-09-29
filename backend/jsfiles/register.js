// const reg_Form = document.getElementById('form');
// const hobbiesSelect = document.getElementById('hobbies');

/*registrationForm.addEventListener('register', (event) => {
    
    if(document.getElementById("password").value===document.getElementById("re-pass").value){
        const name= document.getElementById("name");
        const email= document.getElementById("email");
        const age= document.getElementById("age");
        const gender= document.getElementById("gender");
        const bio= document.getElementById("bio");
        const hobby_1= document.getElementById("pri_1");
        const hobby_2= document.getElementById("pri_2");
        const hobby_3= document.getElementById("pri_3");
        const pas= document.getElementById("re-pass");
        console.log("Hi");

        
    }
    else{
        reg_Form.reset()
    }

});*/

function register()
{
    let name= document.getElementById("name").value;
    let email= document.getElementById("email").value;
    let username= document.getElementById("uname").value;
    let age= document.getElementById("age").value;
    let gender= document.getElementById("gender").value;
    let bio= document.getElementById("bio").value;
    let hobby_1= document.getElementById("pri_1").value;
    let hobby_2= document.getElementById("pri_2").value;
    let hobby_3= document.getElementById("pri_3").value;
    let pas= document.getElementById("re-pass").value;
    let pass= document.getElementById("password").value;
    

    console.log("Hi works till here!")
    let newUser=new XMLHttpRequest();
    newUser.open("POST","/register")
    newUser.onreadystatechange=function(){
        if(newUser.readyState==4 && newUser.status==200)
        {
            alert(newUser.responseText);
            window.location.href=`http://localhost:3000`;

        }
        else
        {
            alert(newUser.responseText);
            //console.log(newUser.readyState)
        }
    }
    let regInfo={name,username,email,pass,pas,age,gender,bio,hobby_1,hobby_2,hobby_3}
    regInfo=JSON.stringify(regInfo);
    //console.log(regInfo)
    newUser.send(regInfo);

}
