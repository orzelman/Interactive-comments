fetch('data.json', { method: "POST" })
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })