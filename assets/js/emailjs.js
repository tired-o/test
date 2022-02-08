$(document).ready(function(){
    emailjs.init("user_dmHqqN6WDBgv1boKxRzr1");
    console.log("emailjsinit");
    $("form").submit(function(e){
        e.preventDefault();

        let thisForm = this;

        thisForm.querySelector('.loading').classList.add('d-block');
        thisForm.querySelector('.error-message').classList.remove('d-block');
        thisForm.querySelector('.sent-message').classList.remove('d-block');

        var templateParams = {
            name: $('input[name=name]').val(),
            email: $('input[name=email]').val(),
            subject: $('input[name=subject]').val(),
            message: $('textarea[name=message]').val()
        };
        console.log(templateParams);
        
        if(validateEmail(templateParams) == false){
            console.log('error:' + 'invalid email');
            displayError(thisForm, 'You have entered an invalid email address');
        } else {
            emailjs.send('service_siwqpe3', 'template_cjnu5ye', templateParams)
            .then(function(response){
                console.log('response.text:' + response.text);
                return response.text;
            }, function(error){
                throw new Error(response);
            })
            .then(function(data){
                thisForm.querySelector('.loading').classList.remove('d-block');
                if(data == 'OK'){
                    console.log('data:' + data);
                    thisForm.querySelector('.sent-message').classList.add('d-block');
                    thisForm.reset(); 
                } else {
                    throw new Error(response);
                }
            })
            .catch(function(error){
                console.log('error:' + error);
                displayError(thisForm, error);
            });
        }
    });
});

function validateEmail(templateParams){
    var format = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(templateParams.email.match(format)){
        return true;
    } else {
        // alert("You have entered an invalid email address");
        $("#email").focus();
        return false;
    }
}

function displayError(thisForm, error){
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
}