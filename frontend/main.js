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
            <p>Lånas av: ${book.attributes.user}</p>
            <button>Låna bok</button>
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



let bookName = document.querySelector("#bookName");
let bookPages = document.querySelector("#bookPages");
let bookImage = document.querySelector("#bookImage");
let bookpoints = document.querySelector("#bookPoints");
let bookAuthor = document.querySelector("#bookAuthor");

 
    const addNewBook = async () => {
        //Hämtar ut filen och placerar den i en FormData
        let image = document.querySelector("#bookImage").files;
        let imgData = new FormData();
        imgData.append('files', image[0]);
        
        // Laddar upp bild till Strapi.
        axios.post("http://localhost:1338/api/upload", imgData, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(res => {
            //Placerar den uppladdade filens id i vår nya produkt vi vill lägga till.
            let imageId = res.data[0].id;
            axios.post("http://localhost:1338/api/books", {
                //request body
                    data: {
                        Title: bookName.value,
                        pages: bookPages.value,
                        points: bookPoints.value,
                        Author: bookAuthor.value,
                        image:imageId
                    }
                },
                {
                    //config
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`
                    }
                })
            })
        
}

