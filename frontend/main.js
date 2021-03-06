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
            <li id="books-li" class="${book.id}">
            <img id="list-image" src="http://localhost:1338${book.attributes.image.data.attributes.url}">
            <p>Titel: ${book.attributes.Title}</p>
            <p>Antal sidor: ${book.attributes.pages}</p>
            <p>Betyg: ${book.attributes.points}</p>
            <p>F??rfattare: ${book.attributes.Author}</p>
            <p>Utl??nas av ${book.attributes.username}.<br> Email: ${book.attributes.email}</p>
            <button id="borrowbook" onclick="borrowdaBook('http://localhost:1338/api/books/${book.id}')">L??na bok</button>
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
            <p>l??ngd: ${audiobook.attributes.length} minuter</p>
            <p>Betyg: ${audiobook.attributes.points}</p>
            <p>F??rfattare: ${audiobook.attributes.Author}</p>
            <button id="borrowbook" onclick="borrowdaBook('http://localhost:1338/api/audiobooks/${audiobook.id}')">L??na ljudbok</button>
            <p>Utl??nas av ${audiobook.attributes.username}.<br> Email: ${audiobook.attributes.email}</p>
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
        let image = document.querySelector("#bookImage").files;
        let imgData = new FormData();
        imgData.append('files', image[0]);
        console.log(image[0])
        
        axios.post("http://localhost:1338/api/upload", imgData, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(res => {
          
            let imageId = res.data[0].id;
            axios.post("http://localhost:1338/api/books", {
               
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
                    
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("token")}`
                    }
                })
            })
        
}

const addNewAudiobook = async () => {
    
    let image = document.querySelector("#audiobookImage").files;
    let imgData = new FormData();
    imgData.append('files', image[0]);
    console.log(image[0])
        axios.post("http://localhost:1338/api/upload", imgData, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`
        }
    }).then(res => {
        let imageId = res.data[0].id;
        axios.post("http://localhost:1338/api/audiobooks", {

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
            
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("token")}`
                }
            })
        })


    
}




    let borrowdaBook = async(url)=>{
        
        await axios.delete(url,
        {
            headers:{
                Authorization:`Bearer ${sessionStorage.getItem("token")}`
                
            }
        })


        alert("refresha sidan f??r att se vilka b??cker som ??r tillg??ngliga nu")
        
            }



            



            






