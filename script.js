 // ===========================
//   NETFLIX CLONE - script.js
//   By Ankit Kumar Sharma
// ===========================

const movies = [
  { id: 1, title: "Stranger Things", desc: "When a young boy vanishes, a small town uncovers a mystery involving secret experiments and terrifying supernatural forces.", img: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?w=400&q=80", match: "98%", year: "2022", rating: "TV-14", genre: "Sci-Fi, Horror, Drama" },
  { id: 2, title: "The Crown", desc: "This drama follows the political rivalries and romance of Queen Elizabeth II's reign.", img: "https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=400&q=80", match: "94%", year: "2020", rating: "TV-MA", genre: "Drama, History" },
  { id: 3, title: "Dark", desc: "A family saga with a supernatural twist set in a German town where four families are connected by a child's disappearance.", img: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&q=80", match: "97%", year: "2019", rating: "TV-MA", genre: "Sci-Fi, Thriller, Mystery" },
  { id: 4, title: "Squid Game", desc: "Hundreds of cash-strapped players accept a strange invitation to compete in children's games with deadly high stakes.", img: "https://images.unsplash.com/photo-1535016120720-40c646be5580?w=400&q=80", match: "96%", year: "2021", rating: "TV-MA", genre: "Thriller, Drama, Action" },
  { id: 5, title: "Money Heist", desc: "An unusual group of robbers attempt to carry out the most perfect robbery in Spanish history.", img: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=400&q=80", match: "95%", year: "2021", rating: "TV-MA", genre: "Crime, Thriller, Drama" },
  { id: 6, title: "Ozark", desc: "A financial advisor drags his family to the Missouri Ozarks, where he must launder money to appease a drug boss.", img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80", match: "93%", year: "2022", rating: "TV-MA", genre: "Crime, Drama, Thriller" },
  { id: 7, title: "Peaky Blinders", desc: "A gangster family epic set in 1900s England, centering on a gang who sew razor blades in the peaks of their caps.", img: "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&q=80", match: "96%", year: "2022", rating: "TV-MA", genre: "Crime, Drama, History" },
  { id: 8, title: "Breaking Bad", desc: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing methamphetamine.", img: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?w=400&q=80", match: "99%", year: "2013", rating: "TV-MA", genre: "Crime, Drama, Thriller" },
  { id: 9, title: "The Witcher", desc: "Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.", img: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&q=80", match: "91%", year: "2021", rating: "TV-MA", genre: "Fantasy, Action, Adventure" },
  { id: 10, title: "Narcos", desc: "A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar.", img: "https://images.unsplash.com/photo-1619472351888-f844a0b33f5b?w=400&q=80", match: "94%", year: "2017", rating: "TV-MA", genre: "Crime, Drama, Biography" },
  { id: 11, title: "Mindhunter", desc: "In the late 1970s two FBI agents expand criminal science by delving into the psychology of murder.", img: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&q=80", match: "97%", year: "2019", rating: "TV-MA", genre: "Crime, Drama, Thriller" },
  { id: 12, title: "Bridgerton", desc: "Wealth, lust, and betrayal set against the backdrop of Regency Era England.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80", match: "89%", year: "2022", rating: "TV-MA", genre: "Romance, Drama, History" }
];

let myList = JSON.parse(localStorage.getItem('netflix-mylist')) || [];

function saveList() {
  localStorage.setItem('netflix-mylist', JSON.stringify(myList));
}

function createCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.setAttribute('data-id', movie.id);
  const isInList = myList.includes(movie.id);

  card.innerHTML = `
    ${isInList ? '<div class="in-list-badge">✓ My List</div>' : ''}
    <img src="${movie.img}" alt="${movie.title}" loading="lazy" />
    <div class="movie-card-overlay">
      <div class="card-title">${movie.title}</div>
      <div class="card-btns">
        <button class="card-btn play-btn" onclick="event.stopPropagation(); showToast('▶ Playing ${movie.title}')">▶</button>
        <button class="card-btn" onclick="event.stopPropagation(); toggleMyList(${movie.id})">${isInList ? '✓' : '+'}</button>
        <button class="card-btn" onclick="event.stopPropagation(); openModal(${movie.id})">ⓘ</button>
      </div>
      <div class="card-match">${movie.match} Match</div>
    </div>
  `;

  card.addEventListener('click', () => openModal(movie.id));
  return card;
}

function renderRow(rowId, movieList) {
  const row = document.getElementById(rowId);
  row.innerHTML = '';
  movieList.forEach(movie => row.appendChild(createCard(movie)));
}

function renderMyList() {
  const row = document.getElementById('myListRow');
  const empty = document.getElementById('emptyList');
  row.innerHTML = '';
  if (myList.length === 0) { empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  movies.filter(m => myList.includes(m.id)).forEach(movie => row.appendChild(createCard(movie)));
}

function toggleMyList(id) {
  if (myList.includes(id)) {
    myList = myList.filter(i => i !== id);
    showToast('Removed from My List');
  } else {
    myList.push(id);
    showToast('Added to My List ✓');
  }
  saveList();
  renderAll();
  const addBtn = document.getElementById('modalAddBtn');
  if (addBtn && addBtn.dataset.id == id) {
    addBtn.textContent = myList.includes(id) ? '✓ In My List' : '+ My List';
    addBtn.className = 'modal-add' + (myList.includes(id) ? ' added' : '');
  }
}

function openModal(id) {
  const movie = movies.find(m => m.id === id);
  if (!movie) return;
  document.getElementById('modalImg').src = movie.img;
  document.getElementById('modalTitle').textContent = movie.title;
  document.getElementById('modalDesc').textContent = movie.desc;
  document.getElementById('modalMatch').textContent = movie.match + ' Match';
  document.getElementById('modalYear').textContent = movie.year;
  document.getElementById('modalRating').textContent = movie.rating;
  document.getElementById('modalGenre').textContent = movie.genre;
  const addBtn = document.getElementById('modalAddBtn');
  addBtn.dataset.id = id;
  addBtn.textContent = myList.includes(id) ? '✓ In My List' : '+ My List';
  addBtn.className = 'modal-add' + (myList.includes(id) ? ' added' : '');
  addBtn.onclick = () => toggleMyList(id);
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2500);
}

window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 80);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

function renderAll() {
  renderRow('trendingRow', movies.slice(0, 6));
  renderRow('continueRow', movies.slice(3, 9));
  renderRow('topPicksRow', movies.slice(6, 12));
  renderMyList();
}

renderAll();