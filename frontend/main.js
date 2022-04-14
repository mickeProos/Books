let loginName = document.querySelector('#loginName')
let loginPassword = document.querySelector('#loginPassword')

const login = async () => {

    let response = await axios.post("http://localhost:1338/api/auth/local", {
        identifier: loginName.value,
        password: loginPassword.value
    });
    sessionStorage.setItem("token", response.data.jwt);
    checkLoginStatus();
    console.log(response);

}

const checkLoginStatus = () => {
    if (sessionStorage.getItem("token")){
        document.querySelector("#login-container").classList.add("hidden");
        document.querySelector("#form-container").classList.remove("hidden");
        document.querySelector("#product-list").classList.remove("hidden");
        document.querySelector("#register-form").classList.add("hidden");
        document.querySelector("#homepagepicture-container").classList.add("hidden");
        document.querySelector(".login-register-container").classList.add("hidden");
        document.querySelector("#profile-logo-container").classList.remove("hidden");
        

        getbooks()
        
    }
}


let registerName = document.querySelector("#registerName");
let registerPassword = document.querySelector("#registerPassword");
let registerEmail = document.querySelector("#registerEmail");

const register = async () => {
    
    let response = await axios.post(
        "http://localhost:1338/api/auth/local/register",
        {
            username:registerName.value,
            password:registerPassword.value,
            email:registerEmail.value
        });
        console.log(response);
        sessionStorage.setItem("token", response.data.jwt);
        
        checkLoginStatus();
    }
    
    
    
    
    let getbooks = async () => {
        
        let response = await axios.get('http://localhost:1338/api/books?populate=*'
        ,{
            
            headers:{
                Authorization:`Bearer ${sessionStorage.getItem("token")}`
            }
        }
        );
    
        console.log(response.data)
        
        response.data.data.forEach(book => {
            document.querySelector(".products").innerHTML+= `
            <li>
            <img src="http://localhost:1338${book.attributes.image.data.attributes.url}" height="150px" width="100%">
            <p>Titel: ${book.attributes.Title}</p>
            <p>Antal sidor: ${book.attributes.pages}</p>
            <p>Betyg: ${book.attributes.points}</p>
            <p>Författare: ${book.attributes.Author}</p>
            </li>`
        })
        
     }
     
    checkLoginStatus()

    const showSignIn = () => {
        document.querySelector("#login-container").classList.remove("hidden");
        document.querySelector("#product-list").classList.remove("hidden");
        document.querySelector(".login-register-container").classList.add("hidden");
        document.querySelector("#homepagepicture-container").classList.add("hidden");
        document.querySelector("#loginpicture-container").classList.remove("hidden");

       
    }

    const showRegister = () => {
        document.querySelector("#register-form").classList.remove("hidden");
        document.querySelector("#login-container").classList.add("hidden");
       
    }


    document.querySelector("#login-container").classList.add("hidden");

 
    