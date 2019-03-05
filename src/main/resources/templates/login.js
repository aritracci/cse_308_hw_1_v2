function loginUser(){
	//Get values
	var check = 0;
	var buttonText = document.getElementById("main_button").textContent;
	if(buttonText == "Sign up"){
		console.log("sign up");
		
		var uname = document.getElementById("username").value;
		var paswd = document.getElementById("password").value;				
		
		if(check == 0){
			console.log("in register");
			axios.post('https://jottohw.herokuapp.com/addusers',{
				username: uname,
				password: paswd
			})
			.then(function (response) {
				console.log(response.data);
				if(response.data == "Duplicate"){
					check = 1;
					document.getElementById("username").value = '';
					document.getElementById("password").value = '';
					alert("Stick Finger!: Username needs to be UNIQUE");
				}else{
					console.log("registered");
					window.location = "https://jottohw.herokuapp.com/";
				}
			    
			})
			.catch(function (error) {
			   console.log(error);
			});
		}else{
			
		}
						
	}else{													
	
		var uname = document.getElementById("username").value;
		var paswd = document.getElementById("password").value;
		
		console.log("hit login function");
		
		console.log(uname);
		console.log(paswd);
		
		axios.get('https://jottohw.herokuapp.com/getusers')
		.then(function(response){
			console.log("in response");
			var now = new Date();
			var time = now.getTime();
			var expireTime = time + 1000*36000;
		  	now.setTime(expireTime);
			for(var i=0; i<response.data.length; i++){
				if(uname == response.data[i].username && paswd == response.data[i].password){
					window.location = "https://jottohw.herokuapp.com/menu";
					document.cookie = "username="+response.data[i].username
					+"; expires=" + now.toGMTString() + +';path=/';
				}
			}
		})
		.catch(function(error){
			console.log(error);
		});
	}
	
}
console.log("hello");

function delete_cookie(){
	document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}
