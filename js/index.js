document.addEventListener('DOMContentLoaded', function () {
    const githubForm= document.getElementById('github-form');
    const searchInput = document.getElementById('search');
    const githubContainer = document.getElementById('github-container');
    let searchType = 'user';

    githubForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchTerm = searchInput.value;

        if (searchType === 'user') {
            searchUsers(searchTerm);
        } 
    });

    document.getElementById('searchUsers').addEventListener('click', function () {
        searchType = 'user';
        searchInput.placeholder = 'Search Users...';
    });

    function searchUsers(query) {
        
        fetch(`https://api.github.com/search/users?q=${query}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => {
            displayUsers(data.items);
        })
        .catch(error => console.error('Error:', error));
    }

    

    function displayUsers(users) {
       
        githubContainer.innerHTML = '';
        users.forEach(user => {
            githubContainer.innerHTML += `
                <div>
                    <img src="${user.avatar_url}" alt="${user.login}" width="50">
                    <p>${user.login}</p>
                    <a href="${user.html_url}" target="_blank">Profile</a>
                    <button onclick="getUserRepos('${user.login}')">View Repos</button>
                </div>
            `;
        });
    }

    function displayRepos(repos) {
       
        githubContainer.innerHTML = '';
        repos.forEach(repo => {
            githubContainer.innerHTML += `
                <div>
                    <h3>${repo.full_name}</h3>
                    <p>${repo.description}</p>
                    <a href="${repo.html_url}" target="_blank">View on GitHub</a>
                </div>
            `;
        });
    }

    function getUserRepos(username) {
       
        fetch(`https://api.github.com/users/${username}/repos`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => {
            displayRepos(data);
        })
        .catch(error => console.error('Error:', error));
    }
});