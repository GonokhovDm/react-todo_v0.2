import React, { useEffect, useState } from "react";
import axios from "axios";
import List from "../List";
import Badge from "../Badge";
import closeSvg from "../../assets/img/close.svg";

import './AddList.scss';

const AddList = ({ colors, onAdd }) => {
	const [visiblePopup, setVisiblePopup] = useState(false);
	const [selectedColor, selectColor] = useState(3);
	const [isLoading, setIsLoading] = useState(false);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		if (Array.isArray(colors)) {
			selectColor(colors[0].id);
		}
	}, [colors]);

	const onClose = () => {
		setVisiblePopup(false);
		setInputValue('');
		selectColor(colors[0].id);
	}

	const addList = () => {
		if (!inputValue) {
			alert('Введите название спиcка');
			return;
		}
		setIsLoading(true);
		axios
			.post('https://react-todo-lac-eta.vercel.app/lists', {
				name: inputValue,
				colorId: selectedColor
			})
			.then(({ data }) => {
				const color = colors.filter(c => c.id === selectedColor)[0];
				const listObj = { ...data, color, tasks: [] };
				onAdd(listObj);
				onClose();
			})
			.catch(() => {
        alert('Ошибка при добавлении списка')
      })
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<div className="add-list">
			<List
				onClick={() => setVisiblePopup(!visiblePopup)}
				items={[
					{
						className: "list__add-button",
						icon: (
							<svg
								width="12"
								height="12"
								viewBox="0 0 12 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6 1V11"
									stroke="#000"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
								<path
									d="M1 6H11"
									stroke="#000"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						),
						name: 'Добавить список'
					}
				]}
			/>
			{visiblePopup && (
				<div className="add-list__popup">
					<img
						onClick={onClose}
						src={closeSvg}
						alt="Close"
						className="add-list__popup-close-btn"
					/>
					<input
						onChange={e => setInputValue(e.target.value)}
						value={inputValue}
						className="field"
						type="text"
						placeholder="Название списка"
					/>
					<div className="add-list__popup-colors">
						{colors.map(color => (
							<Badge
								onClick={() => selectColor(color.id)}
								key={color.id}
								color={color.name}
								className={selectedColor === color.id && 'active'}
							/>
						))}
					</div>
					<button onClick={addList} className="button">{isLoading ? 'Добавление...' : 'Добавить'}</button>
				</div>
			)}
		</div>
	);
};

export default AddList;