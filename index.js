var bookList;
var current_list;
var dark;
window.onload = function () {
    bookList = [];
    current_list = [];
    dark = false;
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
        function (xhr) { console.error(xhr); }
    );

    var search = document.getElementById("search_button");
    search.onclick = function () {
        var input = document.getElementById("search").value;
        if (input != "") {
            removeHighlight();
            for (var i = 0; i < current_list.length; i++) {
                var book = current_list[i];
                if (book.title.toLowerCase().includes(input.toLowerCase())) {
                    var element = document.getElementById(book.title);
                    element.style.backgroundColor = "green";
                    console.log(element);
                }
            }
        } else {
            removeHighlight();
        }
    }

    var filter = document.getElementById("filter_button");
    filter.onclick = function () {
        var category_input = document.getElementById("category").value;
        if (category_input != "Category") {
            current_list = [];
            for (var i = 0; i < bookList.length; i++) {
                if (bookList[i].category == category_input) {
                    current_list.push(bookList[i]);
                }
            }
            document.getElementById("list_body").innerHTML = "";
            loadBooks(current_list);
        } else {
            document.getElementById("list_body").innerHTML = "";
            loadBooks(bookList);
            current_list = bookList;
        }

        var input = document.getElementById("search").value;
        if (input != "") {
            removeHighlight();
            for (var i = 0; i < current_list.length; i++) {
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
    console.log(list);
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
}

function removeHighlight() {
    var books = document.getElementById("list_body").getElementsByTagName("tr");
    for (var i = 0; i < books.length; i++) {
        books[i].style.backgroundColor = dark ? "#DEA254" : "#E3E3E3";
    }
}