const addCityDataToText = function (dataCSV) {

    const cutComments = (arrString) => (arrString[0] || '#') !== '#';
    const getCityObj = (arrString) => arrString.replace('#', '').split(',');
    const sortCity = (a, b) => parseInt(b[3]) - parseInt(a[3]);
    const cityMapped = (arrCity) => ({ x: arrCity[0], y: arrCity[1], name: arrCity[2], population: arrCity[3] });

    const csvToString = function (dataCSV) {
        return dataCSV.split(`\n`)
            .filter(cutComments)
            .map(getCityObj)
            .sort(sortCity)
            .map(cityMapped)
            .slice(0, 10)
            .reduce((acc, item, index) => { acc[item.name] = { population: item.population, rating: (index + 1) }; return acc; }, {})
    }

    return (text) => {
        const cities = csvToString(dataCSV);
        const re = new RegExp(Object.keys(cities).join(`|`), "g");

        return text.replace(re,
            (city) =>
                `${city} (${cities[city].rating} місце у ТОП-10 найбільших міст України, населення ${cities[city].population} чоловік)`);
    }
}
const text = `якийсь текст Джанкой знову якийсь текст
Біла Церква
ще трохи тексту Алушта наступній блок тексту і нарешті Бердянськ`;

const dataCSV = `44.38,34.33,Алушта,31440,
49.46,30.17,Біла Церква,200131,
49.54,28.49,Бердичів,87575,#некоммент

#
46.49,36.58,#Бердянськ,121692,
49.15,28.41,Вінниця,356665,
#45.40,34.29,Джанкой,43343,

# в этом файле три строки-коммента :)`;


let changeTextFunc = addCityDataToText(dataCSV);

console.log(changeTextFunc(text));

