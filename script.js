$(function() {
  var storedEmployee = JSON.parse(localStorage.getItem("store-employee"));
  var storedCompany = JSON.parse(localStorage.getItem("store-company"));

  var sources = {
    'Company ABC' : [ "Employee 1", "Employee 2", "Employee 3" ],
    'Company CDE' : [ "Employee 4", "Employee 5", "Employee 6" ],
    'Company EFG' : [ "Employee 7", "Employee 8", "Employee 9" ],
    'Company GHI' : [ "Employee 10", "Employee 11", "Employee 12" ]
  }

  $("#company").autocomplete({
    source: Object.keys(sources),
    change: function(event) {
      $("#employee").autocomplete("option", {
        source: sources[event.currentTarget.value]
      });
      localStorage.setItem("store-company", JSON.stringify(event.currentTarget.value));
    },   
  }).val(storedCompany);

  $("#employee").autocomplete({
    source: [],
    change: function() {
      localStorage.setItem("store-employee", JSON.stringify(event.currentTarget.value));
      tableClear();
    }
  }).val(storedEmployee);

  $("#addButton").click(tableUpdate);
}) 

var EXCHANGE = 4.8282;

function addTask() {
  console.log('table');
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
    $("#task").css("border", "1px solid red");
    return false;
  }
  else if ($("#task").val().length < 5) {
    $("#task-error").text("Nazwa zadania musi mieć co najmniej 5 znaków");
    $("#task").css("border", "1px solid red");
    return false;
  }
  else if ($("#amount").val() == "") {
    $("#amount-error").text("Podaj kwotę w PLN (liczba)");
    $("#amount").css("border", "1px solid red");
    return false;
  }
  else {
    removeErrorMessage();
    addTask();
    formClear();
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

function tableClear() {
  $("#taskTable tbody").remove();
  calculateSum();
}

function sortName(order) {
  var asc = order === 'asc';
  var tbody = $("#taskTable").find('tbody');

  tbody.find('tr').sort(function(a, b) {
    if (asc) {
      return $('td:first', a).text().localeCompare($('td:first', b).text());
    } else {
      return $('td:first', b).text().localeCompare($('td:first', a).text());
    }
  }).appendTo(tbody);
}

function sortPLN(order) {
  var asc = order === 'asc';
  var tbody = $("#taskTable").find('tbody');

  tbody.find('tr').sort(function(a, b) {
    if (asc) {
      return $('td:nth-child(2)', a).text() - ($('td:nth-child(2)', b).text());
    } else {
      return $('td:nth-child(2)', b).text() - ($('td:nth-child(2)', a).text());
    }
  }).appendTo(tbody);
}

function sortEUR(order) {
  var asc = order === 'asc';
  var tbody = $("#taskTable").find('tbody');

  tbody.find('tr').sort(function(a, b) {
    if (asc) {
      return $('td:nth-child(3)', a).text() - ($('td:nth-child(3)', b).text());
    } else {
      return $('td:nth-child(3)', b).text() - ($('td:nth-child(3)', a).text());
    }
  }).appendTo(tbody);
}