document.addEventListener('DOMContentLoaded', function() {
    var select = document.getElementById('timezone-select');

    // Populate the select element with timezones
    moment.tz.names().forEach(function(timezone) {
        var option = document.createElement('option');
        option.value = timezone;
        option.text = timezone;
        select.appendChild(option);
    });

    var flipClock = document.querySelector('.flip-clock');
    var timezoneSelect = document.getElementById('timezone-select');

    // Function to convert the date to the selected timezone
    function convertTimezone(date, timezone) {
        return moment.tz(date, timezone).format('YYYY-MM-DD HH:mm:ss');
    }
    
    // Function to update the clock display
    function updateClock(timezone) {
        var currentTime = new Date();
        var timeInSelectedTimezone = convertTimezone(currentTime, timezone);
        var timeComponents = timeInSelectedTimezone.split(' ')[1].split(':');

        var hours = timeComponents[0];
        var minutes = timeComponents[1];
        var seconds = timeComponents[2];

        // Display the hours, minutes, and seconds
        document.getElementById('hours-tens').textContent = Math.floor(hours / 10);
        document.getElementById('hours-ones').textContent = hours % 10;
        document.getElementById('minutes-tens').textContent = Math.floor(minutes / 10);
        document.getElementById('minutes-ones').textContent = minutes % 10;
        document.getElementById('seconds-tens').textContent = Math.floor(seconds / 10);
        document.getElementById('seconds-ones').textContent = seconds % 10;
    }

    // Event listener for timezone select
    timezoneSelect.addEventListener('change', function() {
        var selectedTimezone = timezoneSelect.value;
        localStorage.setItem('selectedTimezone', selectedTimezone);
        updateClock(selectedTimezone);
    });

    // Load the saved timezone from local storage
    window.addEventListener('load', function() {
        var selectedTimezone = localStorage.getItem('selectedTimezone');
        if (selectedTimezone) {
            timezoneSelect.value = selectedTimezone;
        }
        updateClock(selectedTimezone);
    });

    // Update the clock every second
    setInterval(function() {
        var selectedTimezone = timezoneSelect.value;
        updateClock(selectedTimezone);
    }, 1000);
});