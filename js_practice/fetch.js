
const url = "https://raw.githubusercontent.com/hexschool/2021-ui-frontend-job/master/frontend_data.json"
fetch(url)
.then(res => res.json())
.then(data => console.log(data))
.catch(err => console.log(err,2));

// const xhr = new XMLHttpRequest();
// xhr.open("GET", url);
// xhr.onload = () => console.log(xhr.responseText);
// xhr.onerror = () => console.log(xhr.statusText);
// xhr.send();


// //早期的做法
// function getdata(url){
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", url);
//     xhr.onload = () => resolve(xhr.responseText);
//     xhr.onerror = () => reject(xhr.statusText);
//     xhr.send();
//   });
// } 

// getdata(url)
// .then(data => console.log(data))
// .catch(err => console.log(err,123));

// //早期的做法 end