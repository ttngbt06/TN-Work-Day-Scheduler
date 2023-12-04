//Display the current date
$(function () {
  dayjs.extend(window.dayjs_plugin_advancedFormat);
  $("#currentDay").text(dayjs().format("dddd, MMMM Do"));

// Add event-listeners to time blocks
$(".saveBtn").each(function () {
  $(this).on("click", function () {
    saveNotes(this);
  });
});

 // Apply past, present, future classes to time blocks
 timeblocks.each(function () {
  var hour = this.id.split("-")[1];
  var currentHour = dayjs().hour();
  if (hour < currentHour) $(this).addClass("past");
  if (hour == currentHour) $(this).addClass("present");
  if (hour > currentHour) $(this).addClass("future");
});
});

  // Add items to local storage
  function addToLocalStorage({ id, task }) {
    window.localStorage.setItem(id, task);
  }

  function getFromLocalStorage(id) {
    return window.localStorage.getItem(id);
  }

  // Save notes in local storage
  function saveNotes(btn) {
    var parentElement = $(btn).parent();
    var id = parentElement.attr("id");
    var task = parentElement.find("textarea").val();
    console.log({ task });
    addToLocalStorage({ id, task });
    $("#notification").css("display", "block");
    setTimeout(() => {
      $("#notification").css("display", "none");
    }, 3000);
  }

  // Get the tasks back from localstorage then add it to the blocks
  var timeblocks = $(".time-block");
  timeblocks.each(function () {
    var tasks = getFromLocalStorage(this.id);
    $(this)
      .find("textarea")
      .text(tasks || "");
  });
