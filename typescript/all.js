//定義狀態列舉
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["Todo"] = 0] = "Todo";
    TaskStatus[TaskStatus["InProgress"] = 1] = "InProgress";
    TaskStatus[TaskStatus["Done"] = 2] = "Done";
})(TaskStatus || (TaskStatus = {}));
var tasks = [];
document.querySelector('.addTask').addEventListener('click', function () {
    var taskNameInput = document.querySelector('.taskName');
    var taskName = taskNameInput.value;
    if (taskName) {
        var taskItem = {
            name: taskName,
            status: TaskStatus.Todo
        };
        createTask(taskItem);
    }
});
function createTask(task) {
    tasks.push(task);
    console.log(tasks);
    updateTaskList();
}
function updateTaskList() {
    var taskListHTML = '';
    tasks.forEach(function (task) {
        taskListHTML += "<li>".concat(task.name, " - \u72C0\u614B: ").concat(TaskStatus[task.status], "</li>");
    });
    document.querySelector('.taskList').innerHTML = taskListHTML;
}
