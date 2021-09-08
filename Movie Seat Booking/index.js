const container = document.querySelector('.container');

const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let ticketPrice = movieSelect.value;

populateUI();

// save selected movie index and price
function saveMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}
// update the total seats selected and the amount payable
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    //copy selected seats into array
    const seatsIndex = [...selectedSeats].map(function (seat) {
        return [...seats].indexOf(seat);
    }); //using the spread operator

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;

    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

// get data from local storage and populate the UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats != null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');

            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if (selectedMovieIndex != null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// movie select change event 
movieSelect.addEventListener('change', (e) => {
    ticketPrice = e.target.value;

    saveMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
})


// seat click event
container.addEventListener('click', (e) => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

// initial count and total set 
updateSelectedCount();