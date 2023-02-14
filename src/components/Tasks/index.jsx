import React from "react";
import axios from "axios";

import editSvg from "../../assets/img/edit.svg";

import './Tasks.scss';
import AddTaskForm from './AddTaskForm';
import Task from "./Task";

const Tasks = ({ list, onEditTitle, onAddTask, onEditTask, onCompleteTask, onRemoveTask, withoutEmpty }) => {
	
	const editTitle = () => {
		const newTitle = window.prompt("Название списка", list.name);
		if (newTitle) {
			onEditTitle(list.id, newTitle);
			axios
			.patch('https://react-todo-lac-eta.vercel.app/lists/' + list.id, {
				name: newTitle
			})
			.catch(() => {
				alert('Не удалось обновить название списка');
			});
		}
	};
	
	return (
		<div className="tasks">
			<h2 style={{color: list.color.hex}} className="tasks__title">
				{list.name}
				<img src={editSvg} alt="Edit title" onClick={editTitle}/>
			</h2>

			<div className="tasks__items">
				{!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
				{list.tasks && list.tasks.map(task => (
					<Task key={task.id} list={list} onEdit={onEditTask} onComplete={onCompleteTask} onRemove={onRemoveTask} {...task}/>
				))}
				<AddTaskForm key={list.id} list={list} onAddTask={onAddTask}/>
			</div>
		</div>
	);
}

export default Tasks;