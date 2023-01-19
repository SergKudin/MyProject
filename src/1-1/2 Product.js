
function Product(ID, name, description, price, brand, sizes, activeSize, quantity, date, reviews, images) {

    if (!isExists(ID)) {
        console.log('ID not exists!')
        return;
    }
    // String   // Product key (unique value)
    this.ID = ID;
    // String   // Name
    this.name = name;
    // String  // Short description
    this.description = description;
    // Float  // Price
    if (isExists(price)) {
        this.price = parseFloat(price);
    }
    // String  // Brand
    this.brand = brand;
    // Array of string - ['XS', 'S', 'M', 'L', 'XL', 'XXL']  // Size array

    this.sizes = [];
    if (Array.isArray(sizes)) {
        this.sizes = Array.prototype.slice.call(sizes);
    } else {
        this.sizes.push(sizes);
    }
    // String // Active size
    this.activeSize = activeSize;
    // Integer  // Number of products in stock
    if (isExists(quantity)) {
        this.quantity = parseInt(quantity);
    }
    // Date {date(YYYY-MM-dd hh:mm:ss)}   // date
    if (isExists(date)) {
        try {
            this.date = new Date(Date.parse(date));
        }
        catch {
            console.log('Invalid date format. Please use format YYYY-MM-dd hh:mm:ss')
        }
    }
    // Array of odject  // Reviews
    this.reviews = [];
    this.reviews.push(reviews);
    // Array of Strings   // Images
    this.images = images;

    this.getID = function () {
        return this.ID;
    }

    this.setID = function (ID) {
        if (!isExists(ID)) {
            console.log('ID not exists!')
            return;
        }
        // String   // Product key (unique value)
        this.ID = ID;
    }

    this.getName = function () {
        return this.name;
    }

    this.setName = function (name) {
        this.name = name;
    }

    this.getDescription = function () {
        return this.description;
    }

    this.setDescription = function (description) {
        this.description = description;
    }

    this.getPrice = function () {
        return this.price;
    }

    this.setPrice = function (price) {
        if (isExists(price)) {
            this.price = parseFloat(price);
        }
    }

    this.getBrand = function () {
        return this.brand;
    }

    this.setBrand = function (brand) {
        this.brand = brand;
    }

    this.getSizes = function () {
        return this.sizes;
    }

    this.addSize = function (newSizes) {
        if (this.sizes.reduce((resFind, item) => resFind & (item !== newSizes), true)) {
            this.sizes.push(newSizes);
        }
    }

    this.deleteSize = function (index) {
        this.sizes.splice(index, 1);
    }

    this.getQuantity = function () {
        return this.quantity;
    }

    this.setQuantity = function (quantity) {
        if (isExists(quantity)) {
            this.quantity = parseInt(quantity);
        }
    }

    this.getDate = function () {
        return this.date;
    }

    this.setDate = function (date) {
        if (isExists(date)) {
            try {
                this.date = new Date(Date.parse(date));
            }
            catch {
                console.log('Invalid date format. Please use format YYYY-MM-dd hh:mm:ss')
            }
        }
    }

    this.getReviews = function (n) {
        let index = n ?? 0;
        const out = this.reviews.slice();
        return out[index];
    }

    this.getReviewByID = function (ID) {
        return this.reviews.find(item => item.ID == ID);
    }

    this.addReviews = function (reviews) {
        this.reviews.push(reviews);
    }

    this.deleteReview = function (index) {
        this.reviews.splice(index, 1);
    }

    this.getAverageRating = function () {
        let rating = this.reviews
            .map(item => item.getRating());
        let countRating = new Map();
        let summRating = new Map();
        let averageRating = new Map();
        rating.map(item => {
            let map = new Map(Object.entries(item));
            for (let element of map.keys()) {
                const a = parseInt(summRating.get(element)) || 0;
                const b = parseInt(map.get(element));
                const c = parseInt(countRating.get(element)) || 0;
                summRating.set(element, a + b);
                countRating.set(element, c + 1);
                averageRating.set(element, (a + b) / (c + 1));
            }
        })
        return Object.fromEntries(averageRating);

    }

    this.getImages = function (n) {
        const index = n ?? 0;
        if (n < this.images.length) {
            return this.images[n];
        } else {
            console.log('Array index "images" out of range')
        }
    }

    this.addImages = function (image) {
        this.images.push(image);
    }


}

function Reviews(ID, author, date, comment, rating) {
    if (!isExists(ID)) {
        console.log('ID not exists!')
        return;
    };
    // ID	String
    this.ID = ID;
    // author	String
    this.author = author;
    // date	Date {date(YYYY-MM-dd hh:mm:ss)}
    if (isExists(date)) {
        try {
            this.date = new Date(Date.parse(date));
        }
        catch {
            console.log('Invalid date format. Please use format YYYY-MM-dd hh:mm:ss')
        }
    }
    // comment	String
    this.comment = comment;
    // rating	Associate Array - rating['key']=value; key one of 'service', 'price', 'value', 'quality'
    this.rating = rating;
    // setRating;

    this.getID = function () {
        return this.ID;
    }

    this.setID = function (ID) {
        if (!isExists(ID)) {
            console.log('ID not exists!')
            return;
        }
        this.ID = ID;
    }

    this.getAuthor = function () {
        return this.author;
    }

    this.setAuthor = function (author) {
        this.author = author;
    }

    this.getDate = function () {
        return this.date;
    }

    this.setDate = function (date) {
        if (isExists(date)) {
            try {
                this.date = new Date(Date.parse(date));
            }
            catch {
                console.log('Invalid date format. Please use format YYYY-MM-dd hh:mm:ss')
            }
        }
    }

    this.getComment = function () {
        return this.comment;
    }

    this.setComment = function (comment) {
        this.comment = comment;
    }

    this.getRating = function () {
        return this.rating;
    }

    this.setRating = function (rating) {
        this.rating = rating;
    }

}

function isExists(parametr) {
    return (parametr !== null && parametr !== undefined);
}



let ob = new Product('test', 'product test', 'description test', '13.3', 'adidas', ['XS', 'S', 'M', 'L', 'XL', 'XXL'], 4, 20, '2021-01-01 12:30:30', new Reviews('test1', 'js', '2022-01-01 12:30:00', 'ksjdvnksjd df jksfnv', { 'service': 5, 'price': 4, 'value': 5, 'quality': 3 }), ['new image']);
let ob1 = new Reviews('test1', 'js', '2022-01-01 12:30:00', 'ksjdvnksjd df jksfnv', { 'service': 4, 'price': 2, 'value': 5, 'quality': 3 });
console.log(ob);
console.log(ob.getID());
ob.setID('01');
console.log(ob.getID());
console.log(ob.getName());
ob.setName('01Name');
console.log(ob.getName());
console.log(ob.getDescription());
ob.setDescription('01description');
console.log(ob.getDescription());
console.log(ob.getPrice());
ob.setPrice('1.23');
console.log(ob.getPrice());
console.log(ob.getSizes().toString());
ob.deleteSize(5);
console.log(ob.getSizes().toString());
ob.addSize('XS');
console.log(ob.getSizes().toString());
ob.addSize('XXXL');
console.log(ob.getSizes().toString());
console.log(ob.getDate());
ob.setDate('2000-01-01 12:30:00');
console.log(ob.getDate());

const rev1 = ob.getReviews();
console.log(rev1.getID());
rev1.setID('rev2');
ob.addReviews(rev1);
ob.addReviews(ob1);
console.log(ob.getReviews());
console.log(ob.getReviews(0));
console.log(ob.getReviews(1));
console.log(ob.getAverageRating());

