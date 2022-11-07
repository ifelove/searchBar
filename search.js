const searchWrapper = document.querySelector(".search-input");
const inputBox = document.querySelector("input");
const suggestionBox = document.querySelector(".autocom-box");
//  class of SearchBar
class SearchBar {
  constructor(inputBox, suggestionBox) {
    this.inputBox = inputBox;
    this.suggestionBox = suggestionBox;
    this.search();
  }

  search() {
    inputBox.addEventListener("keyup", function (e) {
      let userData = e.target.value; //getting user input as the ket pressed is up
      console.log(userData);
      let checkedWords = [];
      if (userData) {
        checkedWords = suggestions.filter((data) => {
          return data.toLowerCase().startsWith(userData.toLowerCase()); //return data in the array that start with the user enter data in lowerca
        });

        checkedWords = checkedWords.map((data) => {
          return `<li>${data} </li>`; //modifying the checkwords array
        });
        mySearchBar.suggetionsList(checkedWords); //calling the suggestionlist metthod using checkedword as argument
        searchWrapper.classList.add("active"); //add class of active once the sugestionbox is not empty
        let allList = suggestionBox.querySelectorAll("li");
        allList.forEach((li) => {
          li.setAttribute("onclick", "mySearchBar.select(this)"); //setting attribute dynamically
        });
      } else {
        searchWrapper.classList.remove("active"); //removing the the class of active since there is no user input
      }
    });
  }

  //appending the filter list to sugestion box
  suggetionsList(list) {
    let listData;

    if (!list.length) {
      //if the checkword array is empty
      let userValue = inputBox.value;
      suggestions.push(userValue); //pushing new words to the the suggestions in searchSuggestion.js
      console.log(suggestions);
      listData = `<li>${userValue}</li>`; //if the checkword array is empty the content will be what the user typed
    } else {
      listData = list.join("");
    }
    this.suggestionBox.innerHTML = listData;
  }

  // ascernig the input.value to the selected element on click and removing the class of active
  select(element) {
    let selectUserData = element.textContent;
    inputBox.value = selectUserData;
    searchWrapper.classList.remove("active");
  }
}
const mySearchBar = new SearchBar(inputBox, suggestionBox);
