document.getElementById('start').addEventListener('click', () => {
  alert("Next: We'll add dream journal functionality!");
});
const form = document.getElementById('dreamForm');
const confirmation = document.getElementById('confirmation');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const dream = document.getElementById('dreamText').value;
  const mood = document.getElementById('mood').value;
  const date = new Date().toISOString();

  const dreamData = {
    title,
    dream,
    mood,
    date
  };

  console.log("Dream saved locally:", dreamData);

  confirmation.style.display = 'block';
  form.reset();
});
import { db, collection, addDoc } from './firebase-config.js';

const form = document.getElementById('dreamForm');
const confirmation = document.getElementById('confirmation');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const dream = document.getElementById('dreamText').value;
  const mood = document.getElementById('mood').value;
  const date = new Date().toISOString();

  const dreamData = {
    title,
    dream,
    mood,
    date
  };

  try {
    await addDoc(collection(db, "dreams"), dreamData);
    confirmation.textContent = "✅ Dream saved to the stars!";
    confirmation.style.display = 'block';
    form.reset();
  } catch (err) {
    confirmation.textContent = "❌ Error saving dream!";
    confirmation.style.color = "#ff5a5a";
    confirmation.style.display = 'block';
    console.error("Firebase Error:", err);
  }
});
import { getDocs } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';

async function loadDreams() {
  const dreamList = document.getElementById('dreamList');
  dreamList.innerHTML = 'Loading dreams...';

  try {
    const querySnapshot = await getDocs(collection(db, "dreams"));
    let html = "";

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      html += `
        <div class="dream-entry">
          <h3>${data.title}</h3>
          <p><strong>Mood:</strong> ${data.mood}</p>
          <p>${data.dream}</p>
          <p><em>${new Date(data.date).toLocaleString()}</em></p>
        </div>
      `;
    });

    dreamList.innerHTML = html || "No dreams found.";
  } catch (error) {
    dreamList.innerHTML = "Failed to load dreams.";
    console.error("Error fetching dreams:", error);
  }
}

// Call it once when page loads
loadDreams();

