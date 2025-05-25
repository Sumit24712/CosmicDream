import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyA8XmdLwGRxPGctJz20V1tPUBngV45ljhs",
  authDomain: "cosmicdream-web.firebaseapp.com",
  projectId: "cosmicdream-web",
  storageBucket: "cosmicdream-web.firebasestorage.app",
  messagingSenderId: "1034874028656",
  appId: "1:1034874028656:web:5dea95a5e24d3ebb0c2ab5",
  measurementId: "G-H574YRJ5DX"
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Elements
const dreamList = document.getElementById('dreamList');
const form = document.getElementById('dreamForm');
const confirmation = document.getElementById('confirmation');

// Load dreams from Firestore and render
async function loadDreams() {
  dreamList.innerHTML = 'Loading dreams...';

  try {
    const querySnapshot = await getDocs(collection(db, "dreams"));
    if (querySnapshot.empty) {
      dreamList.innerHTML = 'No dreams found.';
      return;
    }

    let html = "";
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      html += `
        <div class="dream-entry" data-id="${doc.id}">
          <h3>${data.title}</h3>
          <p><strong>Mood:</strong> ${data.mood || "N/A"}</p>
          <p>${data.dream}</p>
          <p><em>${new Date(data.date).toLocaleString()}</em></p>
          <button class="interpret-btn" data-id="${doc.id}">🔍 Interpret Dream</button>
          <div class="interpretation" id="interpret-${doc.id}"></div>
        </div>
      `;
    });
    dreamList.innerHTML = html;

  } catch (error) {
    dreamList.innerHTML = 'Failed to load dreams.';
    console.error("Error loading dreams:", error);
  }
}

// Handle form submission to save a new dream
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const dream = document.getElementById('dreamText').value.trim();
  const mood = document.getElementById('mood').value;
  const date = new Date().toISOString();

  if (!title || !dream) {
    alert("Please enter both title and dream description.");
    return;
  }

  const dreamData = { title, dream, mood, date };

  try {
    await addDoc(collection(db, "dreams"), dreamData);
    confirmation.textContent = "✅ Dream saved!";
    confirmation.style.display = "block";
    confirmation.style.color = "green";
    form.reset();
    await loadDreams();  // Refresh the list to show new dream
  } catch (error) {
    confirmation.textContent = "❌ Error saving dream!";
    confirmation.style.display = "block";
    confirmation.style.color = "red";
    console.error("Error saving dream:", error);
  }
});

// Event delegation for Interpret Dream buttons
dreamList.addEventListener('click', async (e) => {
  if (e.target.classList.contains('interpret-btn')) {
    const dreamId = e.target.getAttribute('data-id');
    const interpretationDiv = document.getElementById(`interpret-${dreamId}`);

    // Find the dream text from the corresponding entry
    const dreamEntry = e.target.closest('.dream-entry');
    const dreamText = dreamEntry.querySelector('p:nth-of-type(2)').textContent;

    interpretationDiv.textContent = "🔮 Decoding your dream...";

    try {
      // Replace this URL with your deployed Vercel API endpoint if testing live
      const apiUrl = "/api/interpret";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dream: dreamText })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      interpretationDiv.textContent = data.interpretation || "No interpretation available.";
    } catch (error) {
      interpretationDiv.textContent = "❌ Failed to interpret the dream.";
      console.error("Interpretation error:", error);
    }
  }
});

// Initial load of dreams
loadDreams();
