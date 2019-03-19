let qwe = "";

for(let i = 1; i <= 10; i++){
    for(let j = 1; j <= 10; j++){
        qwe += i * j + " ";
    }
    console.log(qwe);
    qwe = "";
}