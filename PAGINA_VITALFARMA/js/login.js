const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");
const boost = document.getElementById("boost");

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
    boost.style.visibility="hidden";
});
signInButton.addEventListener('click', () => {
    container.classList.add("left-panel-active");
    boost.style.visibility="visible";
});
document.getElementById("boost").addEventListener("click", function() {
    window.location.href = "index.html";
})
document.getElementById("boost-2").addEventListener("click", function() {
    window.location.href = "index.html";
})


function mostrarSeña(){
    var tipo = document.getElementById("seña");
    if(tipo.type == "password"){
        tipo.type = "text";
    } else {
        tipo.type = "password";
    }
}