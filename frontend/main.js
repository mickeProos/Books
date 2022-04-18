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
        document.querySelector(".login-register-container").classList.add("hidden");
       

        document.querySelector("#profile-logo").classList.remove("hidden");
        document.querySelector("#profilsida-text").classList.remove("hidden");

    
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

        let nodebooklist = document.querySelectorAll("#audiobooks-li")
        let booklist = Array.from(nodebooklist)
        for (let book = 0; book < booklist.length; book++ ) {
            
            booklist[book].classList.add("hidden");
        }
    
        console.log(response.data)

        
        
        response.data.data.forEach(book => {
            document.querySelector(".products").innerHTML+= `
            <li id="books-li">
            <img id="list-image" src="http://localhost:1338${book.attributes.image.data.attributes.url}">
            <p>Titel: ${book.attributes.Title}</p>
            <p>Antal sidor: ${book.attributes.pages}</p>
            <p>Betyg: ${book.attributes.points}</p>
            <p>Författare: ${book.attributes.Author}</p>
            <p>Utlånas av ${book.attributes.username}.<br> Email: ${book.attributes.email}</p>
            <button id="borrowbook" onclick="borrowdaBook()">Låna bok</button>
            </li>`
        })

        
        document.querySelector("#booksBtn").classList.add("hidden");
        document.querySelector("#audiobooksBtn").classList.remove("hidden");
    
        document.querySelector("#form-container").classList.remove("hidden");  
        document.querySelector("#form-container-audio").classList.add("hidden");
        
        
     }
     checkLoginStatus()



     let getAudiobooks = async () => {

        let response = await axios.get('http://localhost:1338/api/audiobooks?populate=*'
        ,{
            
            headers:{
                Authorization:`Bearer ${sessionStorage.getItem("token")}`
            }
        }
        );


        let nodebooklist = document.querySelectorAll("#books-li")
        let booklist = Array.from(nodebooklist)
        for (let book = 0; book < booklist.length; book++ ) {
            
            booklist[book].classList.add("hidden");
        }

        document.querySelector("#booksBtn").classList.remove("hidden");
        document.querySelector("#audiobooksBtn").classList.add("hidden");
       

    
        console.log(response.data)
        
        response.data.data.forEach(audiobook => {
            document.querySelector(".products").innerHTML+= `
            <li id="audiobooks-li">
            <img id="list-image" src="http://localhost:1338${audiobook.attributes.image.data.attributes.url}">
            <p>Titel: ${audiobook.attributes.Title}</p>
            <p>längd: ${audiobook.attributes.length} minuter</p>
            <p>Betyg: ${audiobook.attributes.points}</p>
            <p>Författare: ${audiobook.attributes.Author}</p>
            <button id="borrowbook" onclick="borrowdaBook()">Låna bok</button>
            <p>Utlånas av ${audiobook.attributes.username}.<br> Email: ${audiobook.attributes.email}</p>
            </li>`
        })


        
        document.querySelector("#form-container").classList.add("hidden");  
        document.querySelector("#form-container-audio").classList.remove("hidden");

     }
     
    

    const showSignIn = () => {
        document.querySelector("#login-container").classList.remove("hidden");
        document.querySelector("#product-list").classList.remove("hidden");
        document.querySelector(".login-register-container").classList.add("hidden");
        document.querySelector("#login-container").classList.remove("hidden");

       
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
        console.log(image[0])
        
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
                        image:imageId,
                        username: borrowbookName.value,
                        email: borrowbookEmail.value,
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

const addNewAudiobook = async () => {
    //Hämtar ut filen och placerar den i en FormData
    let image = document.querySelector("#audiobookImage").files;
    let imgData = new FormData();
    imgData.append('files', image[0]);
    console.log(image[0])
    
    // Laddar upp bild till Strapi.
        axios.post("http://localhost:1338/api/upload", imgData, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    }).then(res => {
        //Placerar den uppladdade filens id i vår nya produkt vi vill lägga till.
        let imageId = res.data[0].id;
        axios.post("http://localhost:1338/api/audiobooks", {
            //request body
                data: {
                    Title: audiobookName.value,
                    length: audiobookPages.value,
                    points: audiobookPoints.value,
                    Author: audiobookAuthor.value,
                    image:imageId,
                    username: borrowaudiobookName.value,
                    email: borrowaudiobookEmail.value,
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



let borrowbookBtn = document.querySelector("#borrowbook");



let borrowdaBook = (el) => {

 console.log("hej")


}