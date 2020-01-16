$(function() {

    var sources = {
        'Company ABC' : [ "Employee 1", "Employee 2", "Employee 3" ],
        'Company CDE' : [ "Employee 4", "Employee 5", "Employee 6" ],
        'Company EFG' : [ "Employee 7", "Employee 8", "Employee 9" ],
        'Company GHI' : [ "Employee 10", "Employee 11", "Employee 12" ]
    }

      $("#company").autocomplete({
        source: Object.keys(sources),
        change: event => {
          $("#employee").autocomplete("option", {
            source: sources[event.currentTarget.value]
          });
        }
      });

      $("#employee").autocomplete({
        source: []
      })
}) 

var EXCHANGE = 4.8282;

function addTask() {
  if ($("#taskTable tbody").length == 0) {
    $("#taskTable").append("<tbody></tbody>");
  }
      
  $("#taskTable tbody").append(
      "<tr>" +
        "<td>" + $("#task").val() + "</td>" +
        "<td class='pln-amount'>" + $("#amount").val() + "</td>" +
        "<td>" + ($("#amount").val()*EXCHANGE).toFixed(2) + "</td>" +
        "<td>" +
        "<button type='button' onclick='taskDelete(this);' class='delete-button'>" + "<i class='fas fa-trash'></i> Usuń" + "</button>" + "</td>" +
      "</tr>"
      );
}

function tableUpdate() {
  if ($("#task").val() == "") {
    $("#task-error").text("Podaj nazwę zadania");
    $("#task").css("border", "1px solid red")
  }
  else if ($("#task").val().length < 5) {
    $("#task-error").text("Nazwa zadania musi mieć co najmniej 5 znaków");
    $("#task").css("border", "1px solid red")
  }
  else if ($("#amount").val() == "") {
    $("#amount-error").text("Podaj kwotę w PLN (liczba)");
    $("#amount").css("border", "1px solid red")
  }
  else {
    removeErrorMessage();
    addTask();
    formClear();
    $("#task").focus();
    calculateSum();
  }
}

function removeErrorMessage() {
  $("#task-error").text("");
  $("#task").css("border", "1px solid #a8a8a8");
  $("#amount-error").text("");
  $("#amount").css("border", "1px solid #a8a8a8");
}

function formClear() {
  $("#task").val("");
  $("#amount").val("");
}

function taskDelete(el) {
  $(el).parents("tr").remove();
  calculateSum();
}

function calculateSum() {
  var plnSum = 0;
  var eurSum = 0;
  $(".pln-amount").each(function() {
    var value = $(this).html();
    var numberValue = new Number(value);
    plnSum += numberValue;
    eurSum = (plnSum*EXCHANGE).toFixed(2);
  })
  $("#pln-sum").html(plnSum + " PLN");
  $("#eur-sum").html("(" + eurSum + " EUR)");
}