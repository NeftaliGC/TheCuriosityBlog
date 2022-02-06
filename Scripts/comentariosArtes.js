// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyAUjmUT-_yFqcm9Vh3YjcS2pJHDcS4gLk4",
    authDomain: 'thecuriosity-blog.firebaseapp.com',
    projectId: 'thecuriosity-blog'
});

var db = firebase.firestore();

function comprobarFormulario()
{
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes();

    var nombre = obtenerNombre();
    var comentario = obtenerComentario();
    
    if (nombre.value == "")
    {
        alert("Escribe Tu Nombre para Poder Comentar");
        
    }
    else if (comentario.value == "")
    {
        alert("Primero escribe un comentario.");
        
    }
    else
    {
        db.collection("Comentarios_Artes").add({
              Comentario: comentario.value,
              Nombre: nombre.value,
              Fecha: fecha + ' ' + hora
          })
        
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            alert("Su comentario ha sido enviado, se recargara la pagina y en 'Mostrar Comentarios' podra ver su comentario.");
            location.reload();
            
            })
        .catch((error) => {
            console.error("Error adding document: ", error);
            });
            
        
    }
}

function obtenerNombre()
{
    var nombre = document.getElementById("nombre");
    return nombre;
}

function obtenerComentario()
{
    var comentario = document.getElementById("comentario");
    return comentario;
}

var EspacioCom = document.getElementById("TablonDeComentarios");

function LeerComentarios()
{
    db.collection("Comentarios_Artes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            console.log(doc.data().Nombre);
            
            var newt = document.createElement("div");
            newt.style.cssText='white-space:pre-line; text-align: left; border:8px solid #56aaf3; padding:20px;  margin: 100px; margin-bottom: 15px; margin-top: 15px;';                 
            var t = document.createTextNode("'" + doc.data().Nombre + "'" + " dice: " + doc.data().Comentario + " " + doc.data().Fecha);
            newt.appendChild(t);                                         
            document.getElementById("TablonDeComentarios").appendChild(newt); 

        }); 
    });
}

