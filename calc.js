function calculateAge() {
    var birthDayInput = document.getElementById("birth-day");
    var birthMonthInput = document.getElementById("birth-month");
    var birthYearInput = document.getElementById("birth-year");
    var resultElement = document.getElementById("result");
    var errorElement = document.getElementById("error");

    var birthDay = parseInt(birthDayInput.value);
    var birthMonth = parseInt(birthMonthInput.value);
    var birthYear = parseInt(birthYearInput.value);

    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1;
    var currentDay = currentDate.getDate();

    var currentDate = new Date();
    var currentYear = currentDate.getFullYear();
    var currentMonth = currentDate.getMonth() + 1; // January is 0
    var currentDay = currentDate.getDate();

    if (isNaN(birthDay) || isNaN(birthMonth) || isNaN(birthYear)) {
        errorElement.innerText = "Error: Field cannot be left blank.";
        resultElement.innerText = "";
        return;
    }

    if (
        birthYear > currentYear ||
        (birthYear === currentYear && birthMonth > currentMonth) ||
        (birthYear === currentYear && birthMonth === currentMonth && birthDay > currentDay)
    ) {
        errorElement.innerText = "Birth date cannot be in the future.";
        resultElement.innerText = "";
        return;
    }

    if (
        birthYear < 0
    ) {
        errorElement.innerText = "Invalid year.";
        resultElement.innerText = "";
        return;
    }

    if (
        birthYear < 1900
    ) {
        errorElement.innerText = "Your existance is questionable!";
        resultElement.innerText = "";
        return;
    }

    if (birthMonth < 1 || birthMonth > 12) {
        errorElement.innerText = "Invalid month.";
        resultElement.innerText = "";
        return;
    }

    var maxDay = getMaxDayForMonth(birthMonth, birthYear);
    if (birthDay < 1 || birthDay > maxDay) {
        errorElement.innerText = "Invalid day for the selected month.";
        resultElement.innerText = "";
        return;
    }

    var age = calculateAgeFromBirthDate(birthDay, birthMonth, birthYear, currentDay, currentMonth, currentYear);

    var nextBirthdayYear = currentYear;
    if (birthMonth < currentMonth || (birthMonth === currentMonth && birthDay < currentDay)) {
        nextBirthdayYear++;
    }

    var nextBirthdayDate = new Date(nextBirthdayYear, birthMonth - 1, birthDay);
    var timeUntilNextBirthday = nextBirthdayDate.getTime() - currentDate.getTime();
    var daysUntilNextBirthday = Math.ceil(timeUntilNextBirthday / (1000 * 60 * 60 * 24));

    var birthdayCountdown = daysUntilNextBirthday === 1 ? "1 day" : daysUntilNextBirthday + " days";

    errorElement.innerText = "";
    resultElement.innerText = + age.years + " years - " + age.months + " months - " + age.days + " days";
    resultElement.innerText += "\n& Next birthday in " + birthdayCountdown;
}

function getMaxDayForMonth(month, year) {
    if (month === 2) {
        return isLeapYear(year) ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(month)) {
        return 30;
    } else {
        return 31;
    }
}

function calculateAgeFromBirthDate(birthDay, birthMonth, birthYear, currentDay, currentMonth, currentYear) {
    var years = currentYear - birthYear;
    var months, days;

    if (currentMonth < birthMonth || (currentMonth === birthMonth && currentDay < birthDay)) {
        years--;
        if (currentMonth === birthMonth) {
            months = 11;
        } else {
            months = (12 + currentMonth - birthMonth - 1) % 12;
        }

        var daysInBirthMonth = getDaysInMonth(birthMonth, birthYear);
        var remainingDays = daysInBirthMonth - birthDay + currentDay;

        if (remainingDays >= daysInBirthMonth) {
            months++;
            remainingDays -= daysInBirthMonth;
        }

        days = remainingDays;
    } else {
        months = (currentMonth - birthMonth) % 12;

        if (currentDay < birthDay) {
            months--;
            var previousMonth = (currentMonth === 1) ? 12 : currentMonth - 1;
            var daysInPreviousMonth = getDaysInMonth(previousMonth, currentYear);

            days = daysInPreviousMonth - birthDay + currentDay;
        } else {
            days = currentDay - birthDay;
        }
    }

    return {
        years: years,
        months: months,
        days: days
    };
}

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getDaysInMonth(month, year) {
    if (month === 2) {
        return isLeapYear(year) ? 29 : 28;
    } else if ([4, 6, 9, 11].includes(month)) {
        return 30;
    } else {
        return 31;
    }
}

function refreshPage() {
    location.reload();
}