"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskStatus = void 0;
//定義狀態列舉
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["Todo"] = 0] = "Todo";
    TaskStatus[TaskStatus["InProgress"] = 1] = "InProgress";
    TaskStatus[TaskStatus["Done"] = 2] = "Done";
})(TaskStatus || (exports.TaskStatus = TaskStatus = {}));
