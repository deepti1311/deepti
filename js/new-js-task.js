// function remove() {
//   // var element = this.id;
//   var row_count = product.rows.length;
//   if (row_count > 2) {
//     var element = document.getElementById("delete");
//     //I have also tried using document.getElementByID(this.id)
//     element.remove();
//   }
//I have also tried using element.parentNode.removeChild(element); to remove the element.
// }
$("#add").on("click", function () {
  // var element = document.getElementById("disTable");
  var row_count = product.rows.length;
  if (row_count < 4) {
    $("#disTable").append(
      `<tr><td><select id="select1"><option value="Item 1">Item 1</option><option value="Item 2">Item 2</option><option value="Item 3">Item 3</option></select></td><td><button type="button" class="rem" id="B1">X</button></td> </tr>`
    );
  }
});

$(document).on("click", ".rem", function () {
  var row_count = product.rows.length;
  if (row_count > 2) {
    $(this).parent().parent().remove();
  }
});

// var prevRows = cloned.siblings();
// cloned.find("select option").each(function (index, option) {
//   prevRows.each(function (i, tr) {
//     option.value !== $("select", tr).val() || $(option).prop("disabled", true);
//   });
// });

$(document).ready(function () {
  var masterList = [];

  var selectedList = [];

  //this function taken from http://stackoverflow.com/questions/7837456/comparing-two-arrays-in-javascript

  function createMasterList() {
    masterList = [];

    $("#select1\\(1\\)")
      .children("option")
      .each(function () {
        masterList.push($(this).val());
      });

    masterList.shift(); //remove blank value
  }

  createMasterList(); //used to check if all dropdown values have been selected

  function updateSelectedList() {
    selectedList = [];

    var selectedValue;

    $(".stockCode").each(function () {
      selectedValue = $(this).find("option:selected").text();

      if (selectedValue != "" && $.inArray(selectedValue, selectedList) == "-1") {
        selectedList.push(selectedValue);
      }
    });
  }

  //disable the dropdown items that have already been selected

  function disableAlreadySelected() {
    $("option").each(function () {
      if ($.inArray(this.value, selectedList) != "-1") {
        $(this).attr("disabled", true);
      } else {
        $(this).attr("disabled", false);
      }
    });
  }

  //If all values have been selected, don't let the user add more rows

  function hideAddButtonIfDone() {
    masterList.sort();

    selectedList.sort();

    if (masterList.equals(selectedList)) {
      console.log("lists equal, hiding add button");

      $("#product #add").hide();
    } else {
      console.log("lists not equal, showing add button");

      $("#product #add").show();
    }
  }

  $("#product").on("change", ".stockCode", function () {
    setTimeout(function () {
      updateSelectedList();

      disableAlreadySelected();

      hideAddButtonIfDone();
    }, 0);
  });

  //when a new table row is added, disable the dropdown options that have already been selected

  $("#product #add").on("click", disableAlreadySelected);

  //when a table row is removed, update all dropdowns (the removed row's dropdown option will be re-enabled

  //in remaining dropdowns

  $("#product").on("DOMNodeRemoved", ".rem > tr", function () {
    updateSelectedList();

    disableAlreadySelected();

    hideAddButtonIfDone();
  });
});
