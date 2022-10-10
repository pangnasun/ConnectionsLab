console.log("hello");
window.addEventListener("load", ()=>{
    fetch("/midterm")
    .then(res =>res.json())
    .then(data =>{
        console.log(data);
    })

    let input = document.getElementById("class-input");
    input.addEventListener("submit",(e)=>{
        e.preventDefault();
        let courseName = document.getElementById("class-input-text").value;
        console.log(courseName);
        let url = "/midterm?course="+ courseName;
        fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
        })
})
})