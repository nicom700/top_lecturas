const shuffle = (array) => { // Fisher-Yates
    let currentIndex = array.length;
    let temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temporaryValue = array[randomIndex];
        array[randomIndex] = array[currentIndex];
        array[currentIndex] = temporaryValue;
    }

    return array;
}

const getCorrectAnswer = (currentGamePlaying) => {
    if (currentGamePlaying.views1 > currentGamePlaying.views2) {
        return currentGamePlaying.article1;
    } else if (currentGamePlaying.views1 < currentGamePlaying.views2){
        return currentGamePlaying.article2;
    }
    return false;
}

const getPreviousYearMonth = () => {
    const currentDate = new Date();

    if (currentDate.getMonth() === 0) {
        currentDate.setFullYear(currentDate.getFullYear() - 1);
        currentDate.setMonth(11);
    } else {
        currentDate.setMonth(currentDate.getMonth() - 1);
    }

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    
    return month < 10 ? `${year}/0${month}` : `${year}/${month}`;
}

const validateEmail = (email) => {
    const reg = /^(?:(?:[\w`~!#$%^&*\-=+;:{}'|,?\/]+(?:(?:\.(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)*"|[\w`~!#$%^&*\-=+;:{}'|,?\/]+))*\.[\w`~!#$%^&*\-=+;:{}'|,?\/]+)?)|(?:"(?:\\?[\w`~!#$%^&*\-=+;:{}'|,?\/\.()<>\[\] @]|\\"|\\\\)+"))@(?:[a-zA-Z\d\-]+(?:\.[a-zA-Z\d\-]+)*|\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])$/gm;
    return reg.test(email);
}

const validateUsername = (username) => {
    const reg = /(?!.*[\.\-\_]{2,})^[a-zA-Z0-9\.\-\_]{3,24}$/;
    return reg.test(username);
}

const validatePassword = (password) => {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    return reg.test(password);
}

const helper = {
    shuffle,
    getCorrectAnswer,
    getPreviousYearMonth,
    validateEmail,
    validateUsername,
    validatePassword
};

export default helper;