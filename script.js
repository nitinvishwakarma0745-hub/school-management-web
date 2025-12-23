async function login() {

    const username = document.getElementById("username").value.trim();
    const emailField = document.getElementById("email").value.trim();
    const pass = document.getElementById("password").value;
    const msg = document.getElementById("msg");

    const btn = document.getElementById("loginBtn");
    const btnText = document.querySelector(".btn-text");
    const loader = document.querySelector(".loader");

    // START LOADING
    btn.disabled = true;
    btn.style.opacity = "0.7";
    btnText.style.display = "none";
    loader.style.display = "block";

    if ((username === "" && emailField === "") || pass === "") {
        msg.style.display = "block";
        msg.innerText = "Please enter username OR email and password";

        btn.disabled = false;
        btn.style.opacity = "1";
        btnText.style.display = "block";
        loader.style.display = "none";
        return;
    }

    msg.style.display = "none";

    try {

        let loginEmail = emailField;

        // ⭐ Username se login
        if (emailField === "" && username !== "") {
            const q = await db.collection("users")
                .where("username", "==", username)
                .get();

            if (q.empty) {
                msg.style.display = "block";
                msg.innerText = "Invalid username!";
                
                btn.disabled = false;
                btn.style.opacity = "1";
                btnText.style.display = "block";
                loader.style.display = "none";
                return;
            }

            q.forEach(doc => {
                loginEmail = doc.data().email;
            });
        }

        // Firebase Auth
        const userCred = await auth.signInWithEmailAndPassword(loginEmail, pass);
        const uid = userCred.user.uid;

        // Firestore Data
        const docSnap = await db.collection("users").doc(uid).get();

        if (!docSnap.exists) {
            msg.style.display = "block";
            msg.innerText = "User not found in database!";
            
            btn.disabled = false;
            btn.style.opacity = "1";
            btnText.style.display = "block";
            loader.style.display = "none";
            return;
        }

        const data = docSnap.data();
localStorage.setItem("appLoggedIn", "true");
localStorage.setItem("appRole", data.role.toLowerCase());
// 🔥 ANDROID APP KO BATAO: LOGIN HO GAYA
if (window.Android) {
    Android.saveLogin(data.role); // admin / student / teacher
}

        // LocalStorage
        localStorage.setItem("studentLoginData", JSON.stringify(data));

        // REDIRECT BASED ON ROLE
        if (data.role.toLowerCase() === "student") {
            window.location.replace("student/dashboard.html");
        } 
        else if (data.role.toLowerCase() === "teacher") {
            window.location.replace ("teacher/dashboard.html");
        } 
        else if (data.role.toLowerCase() === "admin") {
            window.location.replace("admin/dashboard.html");
        }

    } catch (error) {
        msg.style.display = "block";
        msg.innerText = error.message;

        btn.disabled = false;
        btn.style.opacity = "1";
        btnText.style.display = "block";
        loader.style.display = "none";
    }
}
