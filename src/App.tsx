import React, { useState, useEffect } from "react";
import "./App.css";
import "./index.css";
import {
	FaRegCheckCircle,
	FaRegCircle,
	FaPen,
	FaPlusCircle,
	FaTrashAlt,
} from "react-icons/fa";
type Todo = {
	title: string;
	description: string;
	timeLimit: string;
	done: string;
	id: string;
};

const App = () => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [timeLimit, setTimeLimit] = useState("");
	const [done, setDone] = useState("");
	const [isValid, setIsValid] = useState(false);
	const [todos, setTodos] = useState<Todo[]>([]);

	const handleTitleChange = (e: any) => {
		setTitle(e.target.value);
	};
	const handleDescriptionChange = (e: any) => {
		setDescription(e.target.value);
	};
	const handleTimeLimitChange = (e: any) => {
		setTimeLimit(e.target.value);
	};

	const handleSubmit = (e: any) => {
		e.preventDefault();
		const uuid: string = crypto.randomUUID();
		setTodos([
			...todos,
			{
				title,
				description,
				timeLimit,
				done,
				id: uuid,
			},
		]);
		setTitle("");
		setDescription("");
		setTimeLimit("");
		setDone("");
		console.log(todos);
	};

	const handleDelete = (id: string) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
	};

	useEffect(() => {
		if (title !== "" && description !== "" && timeLimit !== "") {
			setIsValid(true);
		}
	}, []);
	return (
		<div className='w-4/5 ml-auto mr-auto center'>
			<header>
				<h1 className='text-4xl text-gray-700 text-center font-semibold m-4'>
					Todo App
				</h1>
			</header>
			<form onSubmit={handleSubmit} className='input border bg-blue-50 rounded'>
				<div className='m-3'>
					<label htmlFor='title'>Title</label>
					<input
						id='title'
						name='title'
						className='p-3 border w-full'
						type='text'
						placeholder='todo'
						value={title}
						onChange={handleTitleChange}
					/>
				</div>
				<div className='m-3'>
					<label htmlFor='description'>Description</label>
					<textarea
						id='description'
						name='description'
						className='p-3 border w-full'
						placeholder='description'
						value={description}
						onChange={handleDescriptionChange}
					/>
				</div>
				<div className='m-3 flex relative'>
					<div className='w-1/3'>
						<label htmlFor='timeLimit'>Time limit</label>
						<input
							type='date'
							id='timeLimit'
							name='timeLimit'
							className='p-3 border w-full'
							placeholder='description'
							value={timeLimit}
							onChange={handleTimeLimitChange}
						/>
					</div>
					<div className='w-1/3'>
						<button className='py-3 px-5 bg-sky-600 rounded absolute right-0 bottom-0 text-white'>
							登録する
						</button>
					</div>
				</div>
			</form>
			<section className='search mt-10 border flex justify-between p-4'>
				<div className='pl-5'>
					<label htmlFor='doing-status'>ステータス:</label>
					<select name='doing-status' className='border'>
						<option>未着手</option>
						<option>進行中</option>
						<option>完了</option>
					</select>
				</div>
				<div className='pl-6'>
					<label htmlFor='search-id'>ID:</label>
					<input className='border' type='text' />
				</div>
			</section>
			<section className='todo-list mt-10'>
				<h2 className='text-3xl text-gray-700 text-center font-semibold m-4'>
					Todo List
				</h2>
				<ul>
					{todos.map((todo: Todo) => (
						<li key={todo.id} className='border flex justify-between p-3 mb-2'>
							<select name='example' className='w-2/12 mr-5 border'>
								<option>未着手</option>
								<option>進行中</option>
								<option>完了</option>
							</select>
							<p className='w-7/12'>{todo.title}</p>
							<p className='w-2/12'>{todo.timeLimit}</p>
							<div className='control-icons w-1/12 mr-1 flex justify-between'>
								<button className=''>
									<FaPen />
								</button>
								<button className='' onClick={() => handleDelete(todo.id)}>
									<FaTrashAlt />
								</button>
							</div>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
};

export default App;
