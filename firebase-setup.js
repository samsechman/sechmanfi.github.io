// Firebase Setup Script
// This script helps you set up Firebase for your Sechman Financial website
// Run this script once in your browser console after updating the Firebase config

// Step 1: Replace the Firebase config below with your own from the Firebase Console
const setupFirebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Step 2: Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(setupFirebaseConfig);
}

// Step 3: Create the admin user account
async function createAdminAccount() {
  try {
    // Replace 'ADMIN_EMAIL' and 'ADMIN_PASSWORD' with your desired email and password
    // Recommended: Use samsechman@gmail.com as the email since that's what's configured in the login
    const email = 'samsechman@gmail.com'; // This should match what's in firebase-config.js
    const password = 'ADMIN_PASSWORD'; // Choose a secure password
    
    console.log("Creating admin account...");
    
    // Create user with email and password
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    console.log("Admin account created successfully:", userCredential.user.email);
    
    // Store some admin metadata in Firestore
    const db = firebase.firestore();
    await db.collection("users").doc(userCredential.user.uid).set({
      email: email,
      role: "admin",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    console.log("Admin metadata stored in Firestore");
    
    // Update the firebase-config.js file with the correct configuration
    console.log("IMPORTANT: Make sure to update firebase-config.js with your Firebase configuration:");
    console.log(`
// Firebase configuration
const firebaseConfig = {
  apiKey: "${setupFirebaseConfig.apiKey}",
  authDomain: "${setupFirebaseConfig.authDomain}",
  projectId: "${setupFirebaseConfig.projectId}",
  storageBucket: "${setupFirebaseConfig.storageBucket}",
  messagingSenderId: "${setupFirebaseConfig.messagingSenderId}",
  appId: "${setupFirebaseConfig.appId}"
};
    `);
    
    return true;
  } catch (error) {
    console.error("Error creating admin account:", error);
    
    if (error.code === 'auth/email-already-in-use') {
      console.log("The admin email is already in use. If you need to reset the password, use the Firebase Console or the password reset feature.");
    }
    
    return false;
  }
}

// Step 4: Add sample articles to Firestore
async function addSampleArticles() {
  try {
    const db = firebase.firestore();
    const articlesCollection = db.collection("articles");
    
    console.log("Adding sample articles...");
    
    // Sample article 1
    await articlesCollection.add({
      title: "How Inflation Impacts Your Investment Strategy",
      date: "July 12, 2023",
      rawDate: "2023-07-12",
      summary: "Learn about the effects of inflation on various asset classes and how to position your portfolio for long-term success.",
      url: "https://www.investopedia.com/articles/investing/090215/how-inflation-affects-your-investments.asp",
      imageUrl: "https://www.investopedia.com/thmb/j1OY-YZ-3fDiRGkCZwFsUOT1q3g=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/primary-image-1-8d1faec2a3744ea1b16f042ec1f3b0ee.png",
      source: "Investopedia",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    // Sample article 2
    await articlesCollection.add({
      title: "Retirement Planning in Your 50s: Critical Steps to Take Now",
      date: "June 28, 2023",
      rawDate: "2023-06-28",
      summary: "If you're in your 50s, it's time to get serious about retirement planning. Here are key strategies to consider.",
      url: "https://www.fool.com/retirement/how-to-plan-for-retirement/",
      imageUrl: "https://g.foolcdn.com/editorial/images/719385/gettyimages-1452318516.jpg",
      source: "The Motley Fool",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    // Sample article 3
    await articlesCollection.add({
      title: "5 Tax Planning Strategies to Maximize Your Wealth",
      date: "June 15, 2023",
      rawDate: "2023-06-15",
      summary: "Effective tax planning can significantly impact your long-term financial goals. Explore these expert-recommended strategies.",
      url: "https://www.forbes.com/advisor/taxes/tax-planning-guide/",
      imageUrl: "https://www.forbes.com/advisor/wp-content/uploads/2022/09/tax_planning.jpeg.jpg",
      source: "Forbes Advisor",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
    
    console.log("Sample articles added successfully!");
    return true;
  } catch (error) {
    console.error("Error adding sample articles:", error);
    return false;
  }
}

// Step 5: Run the setup
async function runSetup() {
  console.log("Starting Firebase setup for Sechman Financial...");
  
  // Create admin account
  const adminCreated = await createAdminAccount();
  
  // Add sample articles
  if (adminCreated) {
    const articlesAdded = await addSampleArticles();
    
    if (articlesAdded) {
      console.log("Setup completed successfully!");
      console.log("You can now use the news-management-dashboard-sxf73.html page to manage your articles.");
      console.log("Login with email: samsechman@gmail.com and the password you set.");
    }
  }
}

// Execute the setup function when the script is loaded
console.log("Firebase setup script loaded. Run 'runSetup()' to begin the setup process.");
// runSetup(); // Uncomment this line to run setup automatically 