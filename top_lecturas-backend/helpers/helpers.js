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
    const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return reg.test(email);
}

const helper = {
    shuffle,
    getCorrectAnswer,
    getPreviousYearMonth,
    validateEmail,
};

export default helper;