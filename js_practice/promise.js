// 練習 Promise
// const checkScore = new Promise((resolve, reject) => {
//     console.log('開始判斷成績...');
//     setTimeout(() => {
//         const score = Math.round(Math.random() * 100);
//         if (score >= 60) {
//             resolve(score);
//         } else {
//             reject(score);
//         }
//     }, 2000);
// });

// checkScore.then((score) => {
//     console.log(`恭喜你，得分 ${score} 分，及格了！`);
// }).catch((score) => {
//     console.log(`很抱歉，得分 ${score} 分，不及格了！`);
// });
// // 練習 async/await
// async function checkScore() {
//     const score = await checkScore;
//     console.log(`恭喜你，得分 ${score} 分，及格了！`);
// }

// checkScore();

const checkScore2 = score => {
    return new Promise((resolve, reject) => {
        console.log('開始判斷成績是否及格...');
        setTimeout(() => {
        if (score >= 60) {
            resolve(score);
        } else {
            reject(score);
        }
    }, 2000);
    });
}

checkScore2(20).then((score) => {
    console.log(`恭喜你，得分 ${score} 分，及格了！`);
}).catch((score) => {
    console.log(`很抱歉，得分 ${score} 分，不及格了！`);
});