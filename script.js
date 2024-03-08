function login_form() {
    document.getElementById('Reg-div').style.display = "none";
    document.getElementById('Log-div').style.display = "flex";
    document.getElementById('passwordchange-div').style.display = "none";

}
function signup_form() {
    document.getElementById('Reg-div').style.display = "flex";
    document.getElementById('Log-div').style.display = "none";
    document.getElementById('passwordchange-div').style.display = "none";

}
function forgot_password_form() {
    document.getElementById('Reg-div').style.display = "none";
    document.getElementById('Log-div').style.display = "none";
    document.getElementById('passwordlink-div').style.display = "flex";
}
document.getElementById('form-reg').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    fetch('/User_reg', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ username: username, email: email, password: password })
    })
        .then(res => res.json())
        .then(data => window.alert(data));


})
document.getElementById('form-log').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    fetch('/User_log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ email: email, password: password })
    })
        .then(res => res.json())
        .then(data => window.alert(data));


})
document.getElementById('form-pass').addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const email = formData.get('mail');

    fetch('/change_password_link', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify({ email: email })
    })
        .then(res => res.json())
        .then(data => {
            if (data == true) {
                window.alert('Check your mail for OTP');
                document.getElementById('OTP-div').style.display = "flex";
                document.getElementById('Reg-div').style.display = "none";
                document.getElementById('Log-div').style.display = "none";
                document.getElementById('passwordchange-div').style.display = "none";
                document.getElementById('passwordlink-div').style.display = "none";
                

            }
            else {
                window.alert(data);
            }
            document.getElementById('otp-form').addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(event.target);
            
                const OTP = formData.get('otp');
            
            
            
            
                fetch('/OTP_check', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
            
                    body: JSON.stringify({ email:email,OTP: OTP })
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data == true) {
                           
                          
                            document.getElementById('OTP-div').style.display = "none";
                            document.getElementById('Reg-div').style.display = "none";
                            document.getElementById('Log-div').style.display = "none";
                            document.getElementById('passwordchange-div').style.display = "flex";
                            document.getElementById('passwordlink-div').style.display = "none";
                        }
                    });
            
            
            })
            document.getElementById('form-pass_change').addEventListener('submit', (event) => {
                event.preventDefault();
                const formData = new FormData(event.target);
                const new_pass = formData.get('new_pass');
                const confirm_password = formData.get('Confirm_pass')
                if (new_pass != confirm_password) {
                    window.alert("Password Must be Same");
                }
                else {
            
                    fetch('/change_password', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
            
                        body: JSON.stringify({ confirm_password: confirm_password,email:email})
                    })
                        .then(res => res.json())
                        .then(data => window.alert(data));
                }
                
            
            })
        });


})













