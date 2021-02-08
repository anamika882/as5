const searchFood = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata${searchText}`
    // load data
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongs(data.data))
        .catch(error => displayError('Something Went Wrong!! Please try again later!'));
}

const displayFood = food => {
    const foodContainer = document.getElementById('food-container');
    foodContainer.innerHTML = '';
    food.forEach(food => {
        const foodDiv = document.createElement('div');
        foodDiv.className = 'single-result row align-items-center my-3 p-3';
        foodDiv.innerHTML = `
        <div class="col-md-9">
            <h3 class="food-">${food.title}</h3>
            <p class="food">Album by <span>${food.menu.name}</span></p>
            <audio controls>
                <source src="${food.preview}" type="audio/mpeg">
            </audio>
        </div>
        <div class="col-md-3 text-md-right text-center">
            <button onclick="getItem('${food.menu.name}','${food.title}')" class="btn btn-success">Get Item</button>
        </div>
        `;
        foodContainer.appendChild(foodDiv);
    })
}

const getLyric = async (menu, title) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast${menu}/${title}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }
    catch (error) {
        displayError('Sorry! I failed to load lyrics, Please try again later!!!')
    }
}

const displayItem = item => {
    const lyricsDiv = document.getElementById('food-item');
    lyricsDiv.innerText = lyrics;
}

const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}