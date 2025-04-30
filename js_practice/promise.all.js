function correctTest(name){
    return new Promise((resolve, reject) => {
        console.log('批改作業中...');
        const time = Math.random() * 10000;
        console.log(time);
        setTimeout(() => {
            const score = Math.round(Math.random() * 100);
            
                resolve({name, score});
            
        }, time);
    });
}

Promise.all([correctTest("小明"), correctTest("小華"), correctTest("小強")])
.then(data => console.log(data));