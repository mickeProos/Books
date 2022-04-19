let getUserInfo = async () => {
        
  let response = await axios.get('http://localhost:1338/api/users/'
  //http://localhost:1338/users/me
 
  )

 
  console.log(response.data)

  
  response.data.forEach(user => {
    
    
      document.querySelector("#profile-content").innerHTML+= `
      <li id="books-li">
     
      <p>användarnamn: ${user.username}</p>
      <p>email: ${user.email}</p>
      <p>id: ${user.id}</p>
      <p>skapad: ${user.createdAt}</p>

      </li>`
  })

  
  
}




getUserInfo();