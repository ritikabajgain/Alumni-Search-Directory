document.addEventListener("DOMContentLoaded", () => {
  const alumniList = document.getElementById('alumni-list');
  const searchButton = document.querySelector('.search-button');
  const searchBar = document.querySelector('.search-bar');

  const displayAlumni = (alumni) => {
    alumniList.innerHTML = '';

    alumni.sort((a, b) => {
      const firstNameA = a.name.split(' ')[0].toLowerCase();
      const firstNameB = b.name.split(' ')[0].toLowerCase();
      return firstNameA.localeCompare(firstNameB);
    });

    alumni.forEach((alumnus, index) => {
      const personDiv = document.createElement('div');
      personDiv.classList.add('person');

      personDiv.innerHTML = `
        <img src="${alumnus.profilePicture}" class="profile-picture">

        <div class="person-info">
          <p class="name">${alumnus.name}</p>
          <div class="line">
            <img src="images/work.png" class="work-icon">
            <p class="work">${alumnus.work}</p>
          </div>
          <div class="line">
            <img src="images/company.webp" class="company-icon">
            <a href="${alumnus.company.link}" target="_blank">
              <p class="company">${alumnus.company.name}</p>
            </a>
          </div>
        </div>

        <div class="other-info">
          <p><b>Email:</b> ${alumnus.email}</p>
          <p><b>Address:</b> ${alumnus.address}</p>
          <p><b>Phone:</b> ${alumnus.phone}</p>
        </div>
      `;

      alumniList.appendChild(personDiv);

      if (index < alumni.length - 1) {
        const hr = document.createElement('hr');
        alumniList.appendChild(hr);
      }
    });
  };

  displayAlumni(alumniData);

  const performSearch = () => {
    const searchTerm = searchBar.value.toLowerCase().trim();

    const filteredAlumni = alumniData.filter(alumnus => 
      alumnus.name.toLowerCase().includes(searchTerm)
    );

    if (filteredAlumni.length > 0) {
      displayAlumni(filteredAlumni);
    } else {
      alumniList.innerHTML = '<p>No alumni found.</p>';
    }
  };

  searchButton.addEventListener('click', performSearch);

  searchBar.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      performSearch();
    }
  });
});