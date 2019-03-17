async function doRegOperation(newUser) {
    // console.log("Response before API in Add Utils ",wholeResponse)
    let addUserResponse = await putDatainDb(newUser);
    console.log(addUserResponse.status);
    return addUserResponse;
}


async function putDatainDb(newUser) {
    return await fetch("  http://localhost:3000/users",
    {
        method:'POST',
        body:JSON.stringify(newUser),
        headers: {
            'Content-Type':'application/json'
        }
    }).then(results => results.json().then(
        data => ({
            status: results.status,
            body:data
        })
    ));
}

export default doRegOperation