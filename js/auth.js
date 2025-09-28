class User{
    constructor(username,email,password,id){
        this.username = username;
        this.email = email;
        this.password = password;
        this.id = id;
        this.bookmarks = []
    }
}

const page = window.location.pathname.split("/").pop(); 
let users = JSON.parse(localStorage.getItem("users")) || [];
let curUsername = JSON.parse(localStorage.getItem("userln") || "null");
const bookmarkBtn = document.getElementById('bookmarkBtn');
var params = new URLSearchParams(window.location.search);

if(page === 'detailcerita.html'){
    var itemId = parseInt(params.get('id')); // ID cerita
    var currentItem = ceritaRakyat.find(function(it) {
        return it.id === itemId;
    });

    if(currentItem && bookmarkBtn){
        updateBookmarkIcon(); 
        bookmarkBtn.addEventListener('click', function() {
            if(!curUsername){
                alert("Harus Login!");
                return;
            }
            if (isBookmarked()) {
                removeBookmark(currentItem.id);
            } else {
                addBookmark(currentItem);
            }
            updateBookmarkIcon();
        });
    }
}

function saveUser(){
    localStorage.setItem("users", JSON.stringify(users));
}

function randomId(){
    let id = Math.floor(Math.random() * 1000) + 1000;

    while(users.some(function(u){
        return u.id === id;
    })){
        id = Math.floor(Math.random()*1000)  + 1000; 
    }

    return id;

}

function register(username,email,password, id){
    const cekUser = users.find(function(user) {
        return user.username === username;
    });

    if (cekUser){
        return{
            success: false,
            message:"Username sudah dimiliki!"
        }
    } 

    const userBaru = new User(username, email,password, id);
    users.push(userBaru);
    saveUser();

    return {
        success: true,
        message: "Registrasi berhasil!"
    };    
    
}

function login(email, password){
    const cekUser = users.find(function(user){
        return user.email === email && user.password === password;
    })

    if (cekUser){
        localStorage.setItem('userln', JSON.stringify(cekUser));

        return {
            success: true,
            message: "Login sukses! Selamat datang, " + email
        };
    }

    return {
        success: false,
        message: "Username atau password salah!"
    };
}
function isBookmarked() {
    if (!curUsername || !curUsername.bookmarks) {
        return false;
    }

    for (var i = 0; i < curUsername.bookmarks.length; i++) {
        if (curUsername.bookmarks[i].id === currentItem.id) {
            return true;
        }
    }
    return false;
}

function updateBookmarkIcon() {
    if(isBookmarked()){
        bookmarkBtn.innerHTML = '<ion-icon name="bookmark"></ion-icon>'; // filled
    } else {
        bookmarkBtn.innerHTML = '<ion-icon name="bookmark-outline"></ion-icon>'; // outline
    }
}

function addBookmark(item) {

    if (!curUsername) {
        alert('Login dulu!');
        return;
    }

    if (!curUsername.bookmarks) {
        curUsername.bookmarks = [];
    }

    var exists = false;
    for (var i = 0; i < curUsername.bookmarks.length; i++) {
        if (curUsername.bookmarks[i].id === item.id) {
            exists = true;
            break;
        }
    }

    if (!exists) {
        curUsername.bookmarks.push(item);
        for (var i = 0; i < users.length; i++) {
            if (users[i].username === curUsername.username) {
                users[i].bookmarks = curUsername.bookmarks;
                break;
            }
        }

        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('userln', JSON.stringify(curUsername));
        alert('Cerita berhasil dibookmark!');
        updateBookmarkIcon();
    } else {
        alert('Cerita sudah ada di bookmark.');
    }
}

function removeBookmark(itemId) {
    if (!curUsername || !curUsername.bookmarks) {
        return;
    }

    var newBookmarks = [];
    for (var i = 0; i < curUsername.bookmarks.length; i++) {
        if (curUsername.bookmarks[i].id !== itemId) {
            newBookmarks.push(curUsername.bookmarks[i]);
        }
    }

    curUsername.bookmarks = newBookmarks;

    for (var i = 0; i < users.length; i++) {
        if (users[i].username === curUsername.username) {
            users[i].bookmarks = curUsername.bookmarks;
            break;
        }
    }

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('userln', JSON.stringify(curUsername));

    alert('Bookmark berhasil dihapus!');
}

function showBookmarks() {
    const bookmarkList = document.getElementById('bookmarkList');
    const noBookmarks = document.getElementById('noBookmarks');
    const template = document.getElementById('bookmarkTemplate');

    bookmarkList.innerHTML = '';

    if (!curUsername || !curUsername.bookmarks || curUsername.bookmarks.length === 0) {
        noBookmarks.style.display = 'block';
        return;
    } else {
        noBookmarks.style.display = 'none';
    }

    curUsername.bookmarks.forEach(function(item) {
        const clone = template.content.cloneNode(true);

        clone.querySelector('.bookmark-image').src = item.image || '';
        clone.querySelector('.bookmark-image').alt = item.nama;
        clone.querySelector('.bookmark-title').innerText = item.nama;
        clone.querySelector('.bookmark-province').innerText = item.provinsi || '';
        clone.querySelector('.bookmark-actions a').href = `detailcerita.html?id=${item.id}`;

        clone.querySelector('.btn-remove').addEventListener('click', function() {
            removeBookmark(item.id);
            showBookmarks();
        });

        bookmarkList.appendChild(clone);
    });
}

if (page === 'akun.html') {
    showBookmarks();
}

const registerForm = document.getElementById('registerForm');
const loginForm = document.getElementById('loginForm');

if(registerForm){
    registerForm.addEventListener("submit", function(r){
    r.preventDefault(); 

    const username = document.getElementById("reqUsername").value;
    const email = document.getElementById("reqEmail").value;
    const password = document.getElementById("reqPassword").value;

    if(!username || !email || !password){
        document.getElementById('registerMsg').textContent = "Semua field harus diisi!";
        return; 
    }
    let newId = randomId();
    const hasilRegister = register(username,email, password, newId);

    if(hasilRegister.success){
        document.getElementById('registerMsg').textContent = hasilRegister.message;
        setTimeout(function(){
            window.location.href ="auth.html#login"
        },2000)
        registerForm.reset();
    } else {
        document.getElementById('registerMsg').textContent = hasilRegister.message;;
    }
  });
}

if(loginForm){
    loginForm.addEventListener("submit",function(r){
    r.preventDefault();

    const email = document.getElementById("logEmail").value;
    const password = document.getElementById("logPassword").value;
    const hasilLogin = login (email,password);
    if(!email || !password){
        document.getElementById('loginMsg').textContent = "Semua field harus diisi!";
        return; 
    }
    if(hasilLogin.success){
        window.location.href ="index.html"
    } else {
        document.getElementById('loginMsg').textContent = hasilLogin.message;
    }
    })
}


if (page === "akun.html") {
    if(curUsername){
        document.getElementById('username').innerText = curUsername.username;
        document.getElementById('email').innerText = curUsername.email;
        document.getElementById('userId').innerText = "ID: USER-" + curUsername.id;
    } else {
        document.getElementById('username').innerText = "Guest";
        document.getElementById('email').innerText = "-";
        document.getElementById('userId').innerText = "-";
    }
}

