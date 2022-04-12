import './style.css'

const EmptySearch = () => {
  return (
    <div className="empty-wrapper">
      <img
        src="https://raw.githubusercontent.com/Samalve/devChallenges-weather-app/be68df54caaff56e35213142af3ff4fab74dffc9/src/images/no-data.svg"
        alt="No data icon"
        className="empty-image"
      />
      <div className="empty-container">
        <h2 className="empty-title">You do not enter any city</h2>
        <p className="empty-text">
          To show you the weather of your city, please click in the search for
          places button.
        </p>
      </div>
    </div>
  )
}

export default EmptySearch
