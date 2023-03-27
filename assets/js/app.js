let yearCurrent = document.getElementById('year');
let date = new Date;
year = date.getUTCFullYear()
yearCurrent.textContent = year;

// friend game

function playWithFriend() {
    fetch('./assets/public/friend.html')
    .then(function(response){
        return response.text();
    })
    .then(function(html){
        document.getElementById('game').innerHTML = html;

    

    let jsFriend = document.createElement('script');
    jsFriend.src = './assets/js/friend.js';
    document.head.appendChild(jsFriend);
})
    .catch(function(err) {
        console.error(err);
    })
}

function playVsCpu() {
    fetch('./assets/public/cpu.html')
    .then(function(response){
        return response.text();
    })
    .then(function(html){
        document.getElementById('game').innerHTML = html;


        let jsCpu = document.createElement('script');
        jsCpu.src = './assets/js/cpu.js';
        document.head.appendChild(jsCpu);
    })
    .catch(function(err) {
        console.error(err);
    })
}

function goHome() {
    location.reload();
}





