function correctTest(name){
    return new Promise((resolve, reject) => {
        console.log('批改作業中...');
        setTimeout(() => {
            const score = Math.round(Math.random() * 100);
            if (score >= 20) {
                resolve({name, score});
            } else if (score < 20){
                console.log(score);
                reject("不及格，退學");
            }
        }, 1000);
    });
}

function checkReward(data){
    return new Promise((resolve, reject) => {
        console.log('檢查獎品中...');
        setTimeout(() => {
            if (data.score >= 90) {
                resolve(`${data.name} ${data.score}獲得電影票一張`);
            } else if (data.score >= 60 && data.score < 90) {
                resolve(`${data.name} ${data.score}獲得橡皮擦一個`);
            }else{
                resolve(`${data.name} ${data.score}罰站5分鐘`);
            }
        }, 1000);
    });
}

// correctTest('John')
// .then(data => checkReward(data))
// .then(reward => console.log(reward))
// .catch(error => console.log(error));

//async , await

const init = async function(){
    try{
        const studentA = await correctTest("Lee");
        // 過一秒後才執行下段語法
        const rewardA = await checkReward(studentA);
        console.log("here", rewardA);
    }catch (error){
        console.log("error:", error);
    }
}

init();