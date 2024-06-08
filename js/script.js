document.addEventListener('DOMContentLoaded', () => {
    const elements = {
        sourceSelect: document.getElementById('source-select'),
        searchInput: document.getElementById('search-input'),
        prevBtn: document.getElementById('prev-btn'),
        nextBtn: document.getElementById('next-btn'),
        gameListCount: document.getElementById('game-list-count'),
        gameList: document.getElementById('game-list'),
        pageCount: document.getElementById('page-count'),
        letterButtons: document.getElementById('letter-buttons')
    };

    let currentSource = elements.sourceSelect.value;
    let gamesPerPage = 50, gamesData = [], currentPage = 1;
    let currentLetter = 'All';
    const defaultImage = 'snap/default.png';

    const letters = ['All', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('')];

    // Create letter buttons
    letters.forEach(letter => {
        const button = document.createElement('button');
        button.textContent = letter;
        button.addEventListener('click', () => filterByLetter(letter));
        elements.letterButtons.appendChild(button);
    });

    elements.sourceSelect.addEventListener('change', () => loadGameList(elements.sourceSelect.value));
    elements.searchInput.addEventListener('input', () => displayGames(gamesData, 1));
    elements.prevBtn.addEventListener('click', () => { if (currentPage > 1) displayGames(gamesData, --currentPage) });
    elements.nextBtn.addEventListener('click', () => displayGames(gamesData, ++currentPage));

    const loadGameList = source => {
        currentSource = source;
        fetch(getUrlBySource(source))
            .then(response => response.ok ? response.text() : Promise.reject('File not found'))
            .then(data => {
                gamesData = parseGameData(data);
                currentPage = 1;
                currentLetter = 'All';
                displayGames(gamesData, currentPage);
            })
            .catch(error => alert('Error loading game list: ' + error));
    };

    const displayGames = (games, page) => {
        elements.gameList.innerHTML = '';
        const searchTerm = elements.searchInput.value.toLowerCase().trim();
        const filteredGames = games.filter(game => {
            const startsWithLetter = currentLetter === 'All' ? true : (
                currentLetter === '#' ? 
                !/[a-zA-Z]/.test(game.Title[0]) : 
                game.Title.toUpperCase().startsWith(currentLetter)
            );
            return startsWithLetter && (!searchTerm || game.Title.toLowerCase().includes(searchTerm));
        });

        const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
        currentPage = Math.max(1, Math.min(page, totalPages));
        const startIndex = (currentPage - 1) * gamesPerPage;
        const endIndex = Math.min(startIndex + gamesPerPage, filteredGames.length);

        elements.gameListCount.textContent = `(${filteredGames.length} Game${filteredGames.length !== 1 ? 's' : ''})`;
        elements.pageCount.textContent = `${currentPage} of ${totalPages}`;
        filteredGames.slice(startIndex, endIndex).forEach(game => elements.gameList.appendChild(createGameItem(game)));

        elements.prevBtn.disabled = currentPage === 1;
        elements.nextBtn.disabled = currentPage === totalPages;
        window.scrollTo(0, 0);
    };

    const filterByLetter = letter => {
        currentLetter = letter;
        displayGames(gamesData, 1);
    };

    const parseGameData = data => data.split('\n').slice(1).filter(line => line.trim()).map(line => {
        const [Name, Title, Emulator] = line.split(';');
        return { Name, Title, Emulator };
    });

    const getUrlBySource = source => ({
        'mame2003_plus': 'romlists/Arcade.txt',
        'nes': 'romlists/Famicom.txt',
        'snes': 'romlists/Super Famicom.txt',
        'segaMD': 'romlists/SegaMD.txt',
        'gba': 'romlists/GBA.txt',
        'ws': 'romlists/WS.txt',
        'pce': 'romlists/PCE.txt',
        'psx': 'romlists/Sony PlayStation.txt'
    }[source] || '');

    const createGameItem = ({ Emulator, Name, Title }) => {
        const gameItem = document.createElement('div');
        gameItem.className = 'game-item';
        const titleUrl = `snap/title/${Emulator}/${encodeURIComponent(Name)}.png`;
        const previewUrl = `snap/preview/${Emulator}/${encodeURIComponent(Name)}.png`;
        const gameUrl = createGameUrl({ Emulator, Name });

        gameItem.append(
            createImage(titleUrl, previewUrl, gameUrl),
            createTitle(Title),
            createDownloadLink(gameUrl)
        );

        return gameItem;
    };

    const createImage = (titleUrl, previewUrl, gameUrl) => {
        const img = document.createElement('img');
        img.src = titleUrl;
        img.onerror = () => { img.src = defaultImage; };
        img.addEventListener('click', () => {
            const playUrl = createPlayUrl(gameUrl);
            window.open(playUrl, '_blank', 'width=800,height=600,resizable=yes,scrollbars=yes');
        });
        img.addEventListener('mouseover', () => { img.src = previewUrl; });
        img.addEventListener('mouseout', () => { img.src = titleUrl; });
        return img;
    };

    const createTitle = title => {
        const titleEl = document.createElement('p');
        titleEl.textContent = title;
        return titleEl;
    };

    const createDownloadLink = url => {
        const link = document.createElement('a');
        link.href = url;
        link.textContent = 'Download';
        link.target = '_blank';
        return link;
    };

    const createGameUrl = ({ Emulator, Name }) => {
        if (Emulator === 'Sony PlayStation') {
            if (Name.includes('(Japan)')) {
                return `https://ia801905.us.archive.org/cors_get.php?path=/10/items/chd_psx_jap/CHD-PSX-JAP/${encodeURIComponent(Name)}.chd`;
            } else if (Name.includes('(USA)')) {
                return `https://ia801704.us.archive.org/cors_get.php?path=/12/items/chd_psx/CHD-PSX-USA/${encodeURIComponent(Name)}.chd`;
            } else if (Name.includes('(Europe)')) {
                return `https://ia601801.us.archive.org/cors_get.php?path=/21/items/chd_psx_eur/CHD-PSX-EUR/${encodeURIComponent(Name)}.chd`;
            } else {
                return `roms/${Emulator}/${encodeURIComponent(Name)}.zip`;
            }
        } else {
            return `roms/${Emulator}/${encodeURIComponent(Name)}.zip`;
        }
    };

    const createPlayUrl = gameUrl => {
        const core = encodeURIComponent(currentSource);
        const encodedGameUrl = encodeURIComponent(gameUrl);
        return `load.html?core=${core}&url=${encodedGameUrl}`;
    };

    loadGameList(currentSource);
});
