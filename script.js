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
