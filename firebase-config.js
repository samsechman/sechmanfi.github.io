 // Firebase configuration
// Replace these with your actual Firebase project settings from the Firebase console
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Authentication functions
function loginAdmin(password) {
  // The admin uses a predefined email with the provided password
  return auth.signInWithEmailAndPassword("admin@sechmanfinancial.com", password);
}

function checkAuthStatus() {
  return new Promise((resolve) => {
    auth.onAuthStateChanged((user) => {
      resolve(user);
    });
  });
}

function logoutAdmin() {
  return auth.signOut();
}

// Database functions for news articles
function getArticles() {
  return db.collection("articles")
    .orderBy("createdAt", "desc")
    .get()
    .then((querySnapshot) => {
      const articles = [];
      querySnapshot.forEach((doc) => {
        articles.push({
          id: doc.id,
          ...doc.data()
        });
      });
      return articles;
    });
}

function addArticle(articleData) {
  return db.collection("articles").add({
    ...articleData,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
}

function deleteArticle(articleId) {
  return db.collection("articles").doc(articleId).delete();
}

function updateArticle(articleId, articleData) {
  return db.collection("articles").doc(articleId).update({
    ...articleData,
    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
  });
} 