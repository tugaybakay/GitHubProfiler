document
.getElementById('search-button')
.addEventListener('click',(e) => {
  e.preventDefault()
  searchProfile()
});

function searchProfile() {
  const nameInputElement = document.getElementById('profile-name-input');
  const profileName = nameInputElement.value;
  nameInputElement.value = "";
  if(profileName != "") {
    fetchProfileData(profileName)
    .then((data) => {
      if(data) {
        updateProfileUI(data);
      }
    });
    fetchReposData(profileName)
    .then((data) => {
      const repos = [];
      data.forEach((repo) => {
        repos.push({'name':repo.name, 'description': repo.description, 'url': repo.html_url});
      });
      updateReposUI(repos);
    });
  }
}

function fetchProfileData(name) {
  const baseURL = 'https://api.github.com/users/';
  return fetch(baseURL + name)
  .then(response => response.json());
}

function fetchReposData(name) {
  const baseURL = 'https://api.github.com/users/';
  return fetch(baseURL + name + '/repos')
  .then(response => response.json());
}

function updateReposUI(repos) {
  const repoList = document.getElementById('repo-list');
  repoList.innerHTML = '';
  repos.forEach((repo) => {
    const repoItem = document.createElement('li');
    repoItem.innerHTML = `
    <div class="repo-item">
      <div class="repo-headers">
        <h3 class="repo-header">${repo.name}</h3>
        <p class="repo-description">${repo.description}</p>
      </div>
      <img src="./link-icon.svg"/>
    </div>`;
    repoItem.addEventListener('click',() => {
      window.open(repo.url,'_blank');
    });
    repoList.appendChild(repoItem);
  });
}

function updateProfileUI(profile) {
  const location = profile.location;
  const repoCount = profile.public_repos;
  const followers = profile.followers;
  const profileName = profile.login.trim();
  const name = profile.name;
  const createdAt = profile.created_at.substring(0, 7);
  const profileImage = profile.avatar_url;

  document.getElementById('name').innerText = "aka. " + name;
  document.getElementById('location').innerText = "location: " + location;
  document.getElementById('repo-count').innerText = "Repos count: " + repoCount;
  document.getElementById('follower-count').innerText = "followers count: " + followers;
  document.getElementById('profile-name').innerText = profileName;
  document.getElementById('member-since').innerText =   "member since: " + createdAt;
  document.getElementById('profile-image').src = profileImage;
}