
function submitData(){

    // Variables
    let name = document.getElementById("name-input");
    let email = document.getElementById("email-input");
    let phoneNumber = document.getElementById("phone-input");
    let subject = document.getElementById("subject-input");
    let message = document.getElementById("message-input");

    // Validation
    if( !name.value ) return alert("Name should be filled");
    if(!email.value ) return alert("Email should be filled");
    if(!phoneNumber.value) return alert("Phone number should be filled");
    if(!subject.value) return alert("Subject should be filled");
    if (!message.value) return alert("Message should be filled");

    // Open Mail
    const targetEmail = "darren0208.dc@gmail.com"
    const url = document.createElement("a");
    url.href = `mailto:${targetEmail}?subject=${subject.value}&body=${message.value}`;
    url.click()

    // Clear input
    // name.value = "";
    // email.value = "";
    // phoneNumber.value = "";
    // subject.value = "";
    // message.value = "";
}