//login
var provider = new firebase.auth.GoogleAuthProvider();
$('#login').click(function(){
	firebase.auth()
	.signInWithPopup(provider)
	.then(function(result){
		console.log(result.user);
		guardaDatos(result.user);
		$('#login').hide();
		$('#root').append("<img src='"+result.user.photoURL+"'/>");
	});
});
//guardar los datos automaticamente
function guardaDatos(user){
	var usuario = {
		uid:user.uid,
		nombre:user.displayName,
		email:user.email,
		foto:user.photoURL
	}
	firebase.database().ref("telmex/"+ user.uid)
	.set(usuario)
}
//escribir en la bdd
$('#guardar').click(function(){
	firebase.database().ref("telmex")
	.set({
		nombre:"Alan",
		edad:"22",
		sexo:"mucho"
	})
});
//aqui estoy leyendo de la bdd de firebae
firebase.database().ref("telmex")
.on("child_added", function(s){
	var user = s.val();
	$('#root').append("<img width ='100px'src='"+user.foto+"'/>");
})