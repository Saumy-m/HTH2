const reg_Form = document.getElementById('form');
const hobbiesSelect = document.getElementById('hobbies');

registrationForm.addEventListener('register', (event) => {
    
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
        
    }
    else{
        reg_Form.reset()
    }

});