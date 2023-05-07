import React, { useState } from "react";
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
	title: string | null;
	description: string | null;
	timeLimit: string | null;
};

function App() {
	const [todo, setTodo] = useState<Todo>({
		title: "",
		description: "",
		timeLimit: "",
	});
	const [todos, setTodos] = useState([]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const title = formData.get("title") as string | null;
		const description = formData.get("description") as string | null;
		const timeLimit = formData.get("timeLimit") as string | null;
		console.log(title, description, timeLimit);
		setTodo({
			title: title,
			description: description,
			timeLimit: timeLimit,
		});
		setTodos([...todos]);
		console.log(todo);
	};

	return (
		<div className='w-4/5 ml-auto mr-auto center'>
			<header>
				<h1 className='text-4xl text-gray-700 text-center font-semibold m-4'>
					Todo App
				</h1>
			</header>
			<form onSubmit={handleSubmit} className='input border bg-blue-50'>
				<div className='m-3'>
					<label htmlFor='title'>Title</label>
					<input
						id='title'
						name='title'
						className='p-3 border w-full'
						type='text'
						placeholder='todo'
					/>
				</div>
				<div className='m-3'>
					<label htmlFor='description'>Description</label>
					<textarea
						id='description'
						name='description'
						className='p-3 border w-full'
						placeholder='description'
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
					<li className='border flex justify-between p-3 mb-2'>
						<select name='example' className='w-2/12 mr-5 border'>
							<option>未着手</option>
							<option>進行中</option>
							<option>完了</option>
						</select>
						<p className='w-7/12'>こちらが、Todoテストです。</p>
						<p className='w-2/12'>2023/5/31</p>
						<div className='control-icons w-1/12 mr-1 flex justify-between'>
							<button className=''>
								<FaPen />
							</button>
							<button className=''>
								<FaTrashAlt />
							</button>
						</div>
					</li>
				</ul>
			</section>
		</div>
	);
}

export default App;
