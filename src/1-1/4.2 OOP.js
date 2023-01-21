
class Reviews {

    constructor({ ID, author, date, comment, rating }) {
        // ID	String
        this.setID(ID);
        // author	String
        this.setAuthor(author);
        // date	Date {date(YYYY-MM-dd hh:mm:ss)}
        this.setDate(date);
        // comment	String
        this.setComment(comment);
        // rating	Associate Array - rating['key']=value; key one of 'service', 'price', 'value', 'quality'
        this.setRating(rating);
    }

    getID() {
        return this.ID;
    }

    setID(ID) {
        if (!isExists(ID)) {
            throw new Error('ID not exists!')
            return;
        }
        let cacheID = new Set();
        if (cacheID.has(ID)) {
            throw new Error(`${this.constructor.name}: can't create an instance. Such an object already exists.`);
        }
        // String   // Product key (unique value)
        cacheID.add(ID);
        this.ID = ID;
    }

    getAuthor() {
        return this.author;
    }

    setAuthor(author) {
        this.author = author;
    }

    getDate() {
        return this.date;
    }

    setDate(date) {
        if (isExists(date)) {
            try {
                this.date = new Date(Date.parse(date));
            }
            catch {
                throw new Error('Invalid date format. Please use format YYYY-MM-dd hh:mm:ss')
            }
        } else {
            throw new Error("No data")
        }
    }

    getComment() {
        return this.comment;
    }

    setComment(comment) {
        this.comment = comment;
    }

    getRating() {
        return this.rating;
    }

    setRating(rating) {
        this.rating = rating;
    }
}


class AbstractProduct {

    constructor({ ID, name, description, price, brand, sizes, activeSize, quantity, date, reviews, images }) {
        if (this.constructor.name === 'AbstractProduct') {
            throw new Error(`${this.constructor.name}: can not create instance of abstract class`);
        }
        // String   // Product key (unique value)
        this.setID(ID);
        // String   // Name
        this.setName(name);
        // String  // Short description
        this.setDescription(description);
        // Float  // Price
        this.setPrice(price);
        // String  // Brand
        this.setBrand(brand);
        // Array of string - ['XS', 'S', 'M', 'L', 'XL', 'XXL']  // Size array
        this.sizes = [];
        this.addSizes(sizes);
        // String // Active size
        this.setActiveSize(activeSize);
        // Integer  // Number of products in stock
        this.setQuantity(quantity);
        // Date {date(YYYY-MM-dd hh:mm:ss)}   // date
        this.setDate(date);
        // Array of odject  // Reviews
        this.reviews = [];
        this.addReviews(reviews);
        // Array of Strings   // Images
        this.images = [];
        this.addImages(images);
    }

    getID() {
        return this.ID;
    }

    setID(ID) {
        if (!isExists(ID)) {
            throw new Error('ID not exists!');
            return;
        }
        let cacheID = new Set();
        if (cacheID.has(ID)) {
            throw new Error(`${this.constructor.name}: can't create an instance. Such an object already exists.`);
        }
        // String   // Product key (unique value)
        cacheID.add(ID);
        this.ID = ID;
    }

    getName() {
        return this.name;
    }

    setName(name) {
        this.name = name;
    }

    getDescription() {
        return this.description;
    }

    setDescription(description) {
        this.description = description;
    }

    getPrice() {
        return this.price;
    }

    setPrice(price) {
        this.price = parseFloat(price);
    }

    getQuantity() {
        return this.quantity;
    }

    setQuantity(quantity) {
        this.quantity = parseInt(quantity);
    }

    getReviews(n) {
        let index = n ?? 0;
        const out = this.reviews.slice();
        return out[index];
    }

    getReviewByID(ID) {
        return this.reviews.find(item => item.ID == ID);
    }

    addReviews(reviews) {
        this.reviews.push(reviews);
    }

    deleteReview(index) {
        this.reviews.splice(index, 1);
    }

    getAverageRating() {
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

    getImages(n) {
        const index = n ?? 0;
        if (n < this.images.length) {
            return this.images[n];
        } else {
            throw new Error('Array index "images" out of range');
        }
    }

    addImages(image) {
        this.images.push(image);
    }

    getDate() {
        return this.date;
    }

    setDate(date) {
        if (isExists(date)) {
            try {
                this.date = new Date(Date.parse(date));
            }
            catch {
                console.log('Invalid date format. Please use format YYYY-MM-dd hh:mm:ss')
            }
        } else {
            throw new Error("No data")
        }
    }

    getBrand() {
        return this.brand;
    }

    setBrand(brand) {
        this.brand = brand;
    }

    getSizes() {
        return this.sizes;
    }

    addSizes(newSizes) {
        if (this.sizes.reduce((resFind, item) => resFind & (item !== newSizes), true)) {
            this.sizes.push(newSizes);
        }
    }

    deleteSize(index) {
        this.sizes.splice(index, 1);
    }

    getActiveSize() {
        return this.activeSize;
    }

    setActiveSize(activeSize) {
        this.activeSize = activeSize;
    }

    getFullInformation() {
        return Object.keys(this).map(key => `${key}: ${this[key]}`).join("\n");
    }

    getPriceForQuantity(n) {
        return `$${this.price * n}`
    }

    getOrSetProp(key, value = null) {
        if (value !== null) {
            this[key] = value;
        } else {
            return this[key];
        }
    }

}

function isExists(parametr) {
    return (parametr !== null && parametr !== undefined);
}

class Clothes extends AbstractProduct {

    constructor({ ID, name, description, price, brand, sizes, activeSize, quantity, date, reviews, images, material, color }) {
        super({ ID, name, description, price, brand, sizes, activeSize, quantity, date, reviews, images });
        this.setMaterial(material);
        this.setColor(color);
    }

    setMaterial(material) {
        this.material = material;
    }
    setColor(color) {
        this.color = color;
    }
    getMaterial() {
        return this.material;
    }
    getColor() {
        return this.color;
    }

}

class Electronics extends AbstractProduct {

    constructor({ ID, name, description, price, brand, sizes, activeSize, quantity, date, reviews, images, warranty, power }) {
        super({ ID, name, description, price, brand, sizes, activeSize, quantity, date, reviews, images });
        this.setWarranty(warranty);
        this.setPower(power);
    }

    setWarranty(warranty) {
        this.warranty = parseFloat(warranty);
    }
    setPower(power) {
        this.power = parseFloat(power);
    }
    getWarranty() {
        return this.warranty;
    }
    getPower() {
        return this.power;
    }

}


//---------Tests------------------------------------
console.log('Start tests\n');
try {
    const a = new AbstractProduct({
        ID: 'test',
        name: 'product test',
        description: 'description test',
        price: '13.3',
        brand: 'adidas',
        sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
        activeSize: 4,
        quantity: 20,
        date: '2021-01-01 12:30:30',
        reviews: new Reviews({
            ID: 'test1',
            author: 'js',
            date: '2022-01-01 12:30:00',
            comment: 'ksjdvnksjd df jksfnv',
            rating: { 'service': 4, 'price': 2, 'value': 5, 'quality': 3 }
        }),
        images: 'image.jpg',
    });
}
catch {
    console.log('Err AbstractProduct')
}

const clothe = new Clothes({
    ID: 'test',
    name: 'product test',
    description: 'description test',
    price: '13.3',
    brand: 'adidas',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    activeSize: 4,
    quantity: 20,
    date: '2021-01-01 12:30:30',
    reviews: new Reviews({
        ID: 'test1',
        author: 'js',
        date: '2022-01-01 12:30:00',
        comment: 'ksjdvnksjd df jksfnv',
        rating: { 'service': 4, 'price': 2, 'value': 5, 'quality': 3 },
    }),
    images: 'image.jpg',
    material: 'coton',
    color: 'red',
});

clothe.addReviews(new Reviews({
    ID: 'test1',
    author: 'js',
    date: '2022-01-01 12:30:00',
    comment: 'ksjdvnksjd df jksfnv',
    rating: { 'service': 5, 'price': 5, 'value': 5, 'quality': 5 }
}));

const washer = new Electronics({
    ID: 'washer',
    name: 'product test',
    description: 'description test',
    price: '250.3',
    brand: 'siemens',
    sizes: ['XS', 'S', 'M'],
    activeSize: 14,
    quantity: 10,
    date: '2021-02-04 10:00:00',
    reviews: new Reviews({
        ID: 'test2',
        author: 'js',
        date: '2021-03-04 10:00:00',
        comment: 'ksjdvnksjd df jksfnv',
        rating: { 'service': 4, 'price': 4, 'value': 4, 'quality': 4 },
    }),
    images: 'image1.jpg',
    warranty: '12',
    power: '2000',
});

washer.addReviews(new Reviews({
    ID: 'test3',
    author: 'js3',
    date: '2022-01-03 12:30:00',
    comment: 'ksjdvnksjd df jksfnv3',
    rating: { 'service': 5, 'price': 5, 'value': 5, 'quality': 5 }
}));


console.log('clothe.getFullInformation:\n' + clothe.getFullInformation());
console.log('clothe.getPriceForQuantity:' + clothe.getPriceForQuantity(10));

console.log('clothe.getAverageRating:');
let averageRating = clothe.getAverageRating();
for (const [key, value] of Object.entries(averageRating)) {
    console.log(`${key}: ${value}`);
}

console.log('washer.getFullInformation:\n' + washer.getFullInformation());
console.log('washer.getPriceForQuantity:' + washer.getPriceForQuantity(10));

console.log('washer.getAverageRating:');
averageRating = washer.getAverageRating();
for (const [key, value] of Object.entries(averageRating)) {
    console.log(`${key}: ${value}`);
}

console.log(clothe.getOrSetProp('name'));
clothe.getOrSetProp('name', "new name");
console.log(clothe.getOrSetProp('name'));


