window.onload = function() {
    var searchBtn = document.querySelector(".search__btn");
    var landing = document.querySelector(".landing");
    var footer = document.querySelector(".footer");
    var search_form = document.getElementById("search_form");
  
    searchBtn.addEventListener("click", function() {
      if (landing.style.display === "none") {
        landing.style.display = "flex";
        footer.style.display = "flex";
        search_form.style.display = "none";
      } else {
        landing.style.display = "none";
        footer.style.display = "none";
        search_form.style.display = "flex";
      }
    });
};


