async function doOperation(username,wholeResponse) {
    // console.log("Response before API in Add Utils ",wholeResponse)
    let addResponse = await putDatainDb(username,wholeResponse);
    // console.log(check);
    return addResponse;
}


async function putDatainDb(username,finalData) {
    return await fetch("  http://localhost:3000/users/"+username,
    {
        method:'PUT',
        body:JSON.stringify(finalData),
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

export default doOperation