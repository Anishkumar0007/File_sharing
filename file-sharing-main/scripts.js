// Firebase configuration

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcOXI09kf6FlIQt-pveB-6PCCeKfMe0A4",
  authDomain: "filesharing-574c0.firebaseapp.com",
  projectId: "filesharing-574c0",
  storageBucket: "filesharing-574c0.appspot.com",
  messagingSenderId: "349086054584",
  appId: "1:349086054584:web:5015caf1d259ade2921c4d",
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getStorage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-storage.js";

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

// Function to upload file
const uploadFile = async (file) => {
  const storageRef = ref(storage, `files/${file.name}`);
  try {
    await uploadBytes(storageRef, file);
    console.log("File uploaded successfully!");
    listFiles(); // Refresh the file list after upload
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

// Function to list all uploaded files
const listFiles = async () => {
  const listRef = ref(storage, "files/");
  const fileListDiv = document.getElementById("fileList");
  fileListDiv.innerHTML = ""; // Clear existing list

  try {
    const res = await listAll(listRef);
    res.items.forEach(async (itemRef) => {
      const url = await getDownloadURL(itemRef);
      const fileName = itemRef.name;

      // Create a download link
      const fileLink = document.createElement("a");
      fileLink.href = url;
      fileLink.textContent = fileName;
      fileLink.target = "_blank"; // Open in a new tab
      fileLink.classList.add("file-item");

      fileListDiv.appendChild(fileLink);
    });
  } catch (error) {
    console.error("Error listing files:", error);
  }
};

// Event listener for the upload button
document.getElementById("uploadButton").addEventListener("click", () => {
  const fileInput = document.getElementById("fileInput");
  const file = fileInput.files[0];
  if (file) {
    uploadFile(file);
  } else {
    console.error("No file selected!");
  }
});

// List files on page load
window.onload = listFiles;
