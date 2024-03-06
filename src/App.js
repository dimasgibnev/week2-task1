import { useState } from 'react';
import styles from './App.module.css';
import moment from 'moment';

const getDate = () => moment(new Date()).format('DD.MM.YYYY HH:mm:ss');

export const App = () => {
	const [value, setValue] = useState('');
	const [list, setList] = useState([]);
	const [error, setError] = useState('');
	const [isValueValid, setIsValueValid] = useState(false);

	const onInputButtonClick = () => {
		const promptValue = prompt('Введите значение', '');

		if (promptValue.length >= 3) {
			setError('');
			setValue(promptValue);
			setIsValueValid(true);
		} else {
			setError('Введенное значение должно содержать минимум 3 символа');
			if (value.length < 3) {
				setIsValueValid(false);
			}
		}
	};

	const onAddButtonClick = () => {
		if (isValueValid) {
			setList([...list, { id: Date.now(), value: value }]);
			setError('');
			setValue('');
		}
	};

	return (
		<div className={styles.app}>
			<h1 className={styles['page-heading']}>Ввод значения</h1>
			<p className={styles['no-margin-text']}>
				Текущее значение <code>value</code>: "
				<output className={styles['current-value']}>{value}</output>"
			</p>
			{error !== '' && <div className={styles.error}>{error}</div>}
			<div className={styles['buttons-container']}>
				<button className={styles.button} onClick={onInputButtonClick}>
					Ввести новое
				</button>
				<button
					onClick={onAddButtonClick}
					className={styles.button}
					disabled={!isValueValid}
				>
					Добавить в список
				</button>
			</div>
			<div className={styles['list-container']}>
				<h2 className={styles['list-heading']}>Список:</h2>
				{list.length ? (
					<ul className={styles.list}>
						{list.map((elem) => (
							<li className={styles['list-item']} key={elem.id}>
								{elem.value} Создан: {getDate()}
							</li>
						))}
					</ul>
				) : (
					<p className={styles['no-margin-text']}>Нет добавленных элементов</p>
				)}
			</div>
		</div>
	);
};
