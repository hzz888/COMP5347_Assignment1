var bookList;
var current_list;
var dark;
var choosen;
window.onload = function () {
    bookList = [];
    current_list = [];
    dark = false;
    choosen = false;
    getJsonObject('data.json',
        function (data) {
            bookList = data; // store the book list into bookList
            current_list = bookList;
            // console.log(bookList); // print it into console (developer tools)
            // console.log(bookList[0]); // print the first book object into console
            // here you can call methods to load or refresh the page
            // loadBooks() or refreshPage()
            loadBooks(bookList);
        },
        function (xhr) {
            console.error(xhr);
        }
    );

    var search = document.getElementById("search_button");
    search.onclick = function () {
        var input = document.getElementById("search").value;
        var found = false;
        if (input != "") {
            removeHighlight();
            for (let i = 0; i < current_list.length; i++) {
                var book = current_list[i];
                if (book.title.toLowerCase().includes(input.toLowerCase())) {
                    var element = document.getElementById(book.title);
                    element.style.backgroundColor = "green";
                    found = true;
                }
            }
            if (!found) {
                removeHighlight();
                alert("No book found!"); 
            }
        } else {
            removeHighlight();
        }
    }

    var filter = document.getElementById("filter_button");
    filter.onclick = function () {
        var category_input = document.getElementById("category").value;
        var hasBooks = false;
        if (category_input != "Category") {
            current_list = [];
            for (let i = 0; i < bookList.length; i++) {
                if (bookList[i].category == category_input) {
                    current_list.push(bookList[i]);
                    hasBooks = true;
                }
            }
            document.getElementById("list_body").innerHTML = "";
            loadBooks(current_list);
            if (!hasBooks) {
                alert("No book in this category!")
            }
        } else {
            document.getElementById("list_body").innerHTML = "";
            loadBooks(bookList);
            current_list = bookList;
        }

        var input = document.getElementById("search").value;
        if (input != "") {
            removeHighlight();
            for (let i = 0; i < current_list.length; i++) {
                var book = current_list[i];
                if (book.title.toLowerCase().includes(input.toLowerCase())) {
                    var element = document.getElementById(book.title);
                    element.style.backgroundColor = "green";
                    // console.log(element);
                }
            }
        } else {
            removeHighlight();
        }
    }

    document.getElementById("dark_checkbox").onclick = function () {
        var element = document.body;
        element.classList.toggle("dark-mode");
        dark = !dark;
        var li = document.getElementById("list_body").getElementsByTagName("tr");
        for (let index = 0; index < li.length; index++) {
            var element = li[index];
            if (element.style.backgroundColor != "green") {
                element.style.backgroundColor = dark ? "#DEA254" : "#E3E3E3";
            }
        }
    }

    document.getElementById("add_button").onclick = function () {
        var checkboxes = document.getElementsByClassName("book_checkbox");
        choosen = false;
        [...checkboxes].forEach(elem => {
            if (elem.checked) {
                choosen = true;
            }
        })
        if (!choosen) {
            alert("Please choose one book to add!");
        } else {
            var quantity = prompt("Please enter the quantity:", "1");
            if (quantity != null && !isNaN(quantity) && quantity >= 1 && quantity % 1 === 0) {
                var cart_quantity = parseInt(document.getElementById("cart_quantity").innerHTML);
                cart_quantity = parseInt(cart_quantity) + parseInt(quantity);
                document.getElementById("cart_quantity").innerHTML = cart_quantity;

                [...checkboxes].forEach(elem => {
                    elem.checked = false;
                })
                choosen = false;

            } else {
                alert("Please enter a valid number and click confirm!");
            }
        }
    }

    document.getElementById("reset_button").onclick = function () {
        var reset_confirm = confirm("Is it okay to reset the cart?");
        if (reset_confirm) {
            var cart_quantity = parseInt(document.getElementById("cart_quantity").innerHTML);
            cart_quantity = 0;
            document.getElementById("cart_quantity").innerHTML = cart_quantity;
        }
    }
}

function getJsonObject(path, success, error) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                if (success) success(JSON.parse(xhr.responseText));
            } else {
                if (error) error(xhr);
            }
        }
    };
    xhr.open("GET", path, true);
    xhr.send();
}

function loadBooks(list) {
    // load books from bookList
    var list_area = document.getElementById("list_body");
    // console.log(list);
    for (var i = 0; i < list.length; i++) {
        var book = list[i];
        var row = document.createElement("tr");
        var checkbox = document.createElement("td");
        var image = document.createElement("td");
        var title = document.createElement("td");
        var star = document.createElement("td");
        star.setAttribute("class", "rate");
        var author = document.createElement("td");
        var year = document.createElement("td");
        var price = document.createElement("td");
        var year = document.createElement("td");
        var publisher = document.createElement("td");
        var category = document.createElement("td");

        var checkboxInput = document.createElement("input");
        checkboxInput.setAttribute("type", "checkbox");
        checkboxInput.setAttribute("name", "book");
        checkboxInput.setAttribute("value", book.title);
        checkboxInput.setAttribute("class", "book_checkbox");
        checkbox.appendChild(checkboxInput);

        var img = document.createElement("img");
        img.setAttribute("src", book.img);
        img.setAttribute("alt", book.title);
        img.setAttribute("width", "70");
        image.appendChild(img);

        title.innerHTML = book.title;

        var rate = book.rating;
        for (var j = 0; j < rate; j++) {
            var starImg = document.createElement("img");
            starImg.setAttribute("src", "images/star-16.ico");
            star.appendChild(starImg);
        }

        for (var j = 0; j < 5 - rate; j++) {
            var emptyStarImg = document.createElement("img");
            emptyStarImg.setAttribute("src", "images/outline-star-16.ico");
            star.appendChild(emptyStarImg);
        }

        author.innerHTML = book.authors;

        year.innerHTML = book.year;

        price.innerHTML = book.price;

        publisher.innerHTML = book.publisher;

        category.innerHTML = book.category;

        row.appendChild(checkbox);
        row.appendChild(image);
        row.appendChild(title);
        row.appendChild(star);
        row.appendChild(author);
        row.appendChild(year);
        row.appendChild(price);
        row.appendChild(publisher);
        row.appendChild(category);

        row.setAttribute("id", book.title);
        list_area.appendChild(row);
    }

    let checkboxes = document.getElementsByClassName("book_checkbox");
    for (let i = 0; i < checkboxes.length; i++) {
        let book = checkboxes[i];
        book.onclick = function () {
            [...checkboxes].forEach(elem => {
                if (elem != book) {
                    elem.checked = false;
                }
            })
        }
    }
}

function removeHighlight() {
    var books = document.getElementById("list_body").getElementsByTagName("tr");
    for (var i = 0; i < books.length; i++) {
        books[i].style.backgroundColor = dark ? "#DEA254" : "#E3E3E3";
    }
}
