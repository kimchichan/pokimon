function Loguear() {
    let username = document.getElementById('username').value
    let password = document.getElementById('clave').value

    if(username == 'Rodolfo' && password == '123456'){
        alert('Usuario valido')
    }else{
        alert('usuario incorrecto')
    }  

}