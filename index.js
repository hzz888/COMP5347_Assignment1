window.onload = function(){
    let bookList = []; // book list container
    getJsonObject('data.json',
        function(data) {
            bookList = data; // store the book list into bookList
            console.log(bookList); // print it into console (developer tools)
            console.log(bookList[0]); // print the first book object into console
            // here you can call methods to load or refresh the page
            // loadBooks() or refreshPage()
            loadBooks(bookList);
        },
        function(xhr) { console.error(xhr); }
    );
}

function getJsonObject(path, success, error) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
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

function loadBooks(bookList){
    // load books from bookList
    var list = document.getElementById("list_body");
    console.log(list);
    for (var i = 0; i < bookList.length; i++) {
        var book = bookList[i];
        var row = document.createElement("tr");
        var checkbox = document.createElement("td");
        var image = document.createElement("td");
        var title = document.createElement("td");
        var star = document.createElement("td");
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
        
        list.appendChild(row);
    }
}