let getUserInfo = async () => {
        
  let response = await axios.get('http://localhost:1338/api/users/me'
  //http://localhost:1337/users/me
  ,{
      
      headers:{
          Authorization:`Bearer ${sessionStorage.getItem("token")}`
      }
  }
  )
  
console.log(response.data)
console.log(response.data.username)
  
  
      document.querySelector("#profile-content").innerHTML+= `
      <li id="books-li">
     
      <p>användarnamn: ${response.data.username}</p>
      <p>email: ${response.data.email}</p>
      <p>id: ${response.data.id}</p>
      <p>skapad: ${response.data.createdAt}</p>
      
      </li>`
  
}
getUserInfo();