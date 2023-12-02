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
  const hour = this.id.split("-")[1];
  const currentHour = dayjs().hour();
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
    const parentElement = $(btn).parent();
    const id = parentElement.attr("id");
    const task = parentElement.find("textarea").val();
    console.log({ task });
    addToLocalStorage({ id, task });
  }

  // Get the tasks back from localstorage then add it to the blocks
  const timeblocks = $(".time-block");
  timeblocks.each(function () {
    const tasks = getFromLocalStorage(this.id);
    $(this)
      .find("textarea")
      .text(tasks || "");
  });
