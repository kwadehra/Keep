async function verifyLogin(username,password) {
    if(password == "" && username == ""){
        return {username:"", notes:[],name:"",loginCode:5};
    }
    if(username == "") {
        return {username:"",notes:[],name:"",loginCode:3};
    }
    if(password == "") {
        return {username:"",notes:[],name:"",loginCode:4};
    }
    let check = await fetchLoginData(username);
    // console.log(check.status);
    // console.log(typeof(check.status));
    if(check.status!=200) {
        return {username:"",notes:[],name:"",loginCode:1};
    }
    else {
        if(check.body.password != password) {
            return {username:"",notes:[],name:"",loginCode:2};
        }
        else {
            console.log("Response received in LoginUtils",check.body);
            return {username:check.body.id, notes:check.body.notes, name:check.body.name, loginCode:0,
            wholeResponse:check.body};
        }
    }
    //Data Format Received
//     body:
// id: "neelanjan.sen@gmail.com"
// notes: Array(3)
// 0:
// id: 1548669.723835503
// noteDescription: "Yeah, I'm pathetic, i've to remind myself to take bath everyday"
// noteTitle: "take bath"
// __proto__: Object
// 1:
// id: 2065717.6985248907
// noteDescription: "I've finally made this app multi user"
// noteTitle: "YAAAAY!!!"
// __proto__: Object
// 2:
// id: 25717.6985248907
// noteDescription: "I've finally made this app multi user"
// noteTitle: "YAAAAY!!!"
}
async function fetchLoginData(username) {
   return await fetch("http://localhost:3000/users/"+username)
    .then(results => results.json().then(data => ({status:results.status,body:data})))
    .then(obj => {return(obj)})
}
export default verifyLogin