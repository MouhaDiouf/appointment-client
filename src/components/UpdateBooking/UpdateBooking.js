import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { patchBookFromUpdateComponent } from '../../actions/actions';
import Loading from '../../Images/loading_white.gif';
function UpdateBooking({ userStatus, patchBook, history }) {
  console.log(userStatus);
  const { bookToUpdate, carToUpdate } = userStatus;
  function handleDatePicking() {
    const datePicker = document.querySelector('#date');
    datePicker.min = new Date().toISOString().split('T')[0];
  }

  function redirectToDashboardAfterPatching() {
    setTimeout(() => {
      history.push('/user');
    }, 2000);
  }
  function handleUpdateBook(bookId) {
    const book = {
      id: bookId,
      date: document.querySelector('#date').value,
      city: document.querySelector('#city').value,
    };
    patchBook(book);
  }

  if (userStatus.redirect_after_patching) {
    history.push('/');
  }

  return (
    <div className="carBooking">
      <div className={`car-img ${carToUpdate.alt}`}></div>
      <div className="car-content">
        <h2>{carToUpdate.model}</h2>
        <div className="details">
          <ul class="car-details">
            <li>Speed: {carToUpdate.speed}</li>
            <li>Acceleration: {carToUpdate.acceleration}</li>
            <li>Height: {carToUpdate.height}</li>
            <li>Width: {carToUpdate.width}</li>
            <li>Length: {carToUpdate.length}</li>
          </ul>
          <label htmlFor="date">Pick a date</label>
          <div className="pick-date">
            <input
              type="date"
              name="date"
              id="date"
              onClick={handleDatePicking}
            />
          </div>
          <div className="pick-city">
            <label htmlFor="city"> Choose a city </label>
            <select name="city" id="city">
              <option value="Dakar" selected>
                Dakar
              </option>
              <option value="Paris">Paris</option>
              <option value="New York">New York</option>
              <option value="Beijing">Beijing</option>
              <option value="Berlin">Berlin</option>
              <option value="London">London</option>
            </select>
          </div>
          <button
            className="book-drive-button"
            onClick={() => {
              handleUpdateBook(bookToUpdate.id);
            }}
          >
            Update Booking
          </button>
        </div>
      </div>
      {userStatus.is_patching_book ? (
        <div className="creating-booking">
          <h2>Updating Your Booking...</h2>
          <div className="animation-picture">
            <img src={Loading} alt="Creating your booking" />
          </div>
        </div>
      ) : null}
      {userStatus.patching_book_success ? (
        <div className="booking-fail-message">
          Your booking has been successfully updated
        </div>
      ) : null}
      <div className="back-to-cars-link-div">
        <Link to="/" className="back-to-cars-link">
          Back to cars
        </Link>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  userStatus: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  patchBook: (book) => {
    dispatch(patchBookFromUpdateComponent(book));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(UpdateBooking));