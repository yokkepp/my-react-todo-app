import React, { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import { FaPen, FaTrashAlt } from "react-icons/fa";
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
	const [done, setDone] = useState("none");
	const [isEditing, setIsEditing] = useState(false);
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
	const handleDoneChange = (e: any) => {
		setDone(e.target.value);
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
	};

	const handleDelete = (id: string) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
	};

	const handleUpdate = (todo: Todo) => {
		console.log(todo);
		setTitle(todo.title);
		setDescription(todo.description);
		setTimeLimit(todo.timeLimit);
		setIsEditing(true);
	};

	const handleUpdateSubmit = () => {
		setIsEditing(false);
	};

	useEffect(() => {
		console.log({ todos });
	}, [todos]);

	return (
		<div className='w-4/5 ml-auto mr-auto center'>
			<header>
				<h1 className='text-4xl text-gray-700 text-center font-semibold m-4'>
					Todo App
				</h1>
			</header>
			<form
				onSubmit={!isEditing ? handleSubmit : handleUpdateSubmit}
				className=' p-3 input border bg-blue-50 rounded'>
				{isEditing && (
					<span className='bg-cyan-800 text-white text-sm px-2 py-1 rounded-xl'>
						編集モード
					</span>
				)}
				<div className='mt-3'>
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
				<div className='mt-3'>
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
				<div className='mt-3 flex relative'>
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
						<button
							className='py-3 px-5 bg-sky-600 rounded absolute right-0 bottom-0 text-white disabled:bg-slate-300'
							disabled={title === "" ? true : false}>
							{!isEditing ? "登録する" : "更新する"}
						</button>
					</div>
				</div>
			</form>

			<section className='todo-list mt-10'>
				<h2 className='text-3xl text-gray-700 text-center font-semibold m-4'>
					Todo List
				</h2>

				<ul>
					{todos.map((todo: Todo) => (
						<li key={todo.id} className='border flex justify-between p-3 mb-2'>
							<select
								name='example'
								className='w-2/12 mr-5 border'
								onChange={handleDoneChange}>
								<option value='none'>未着手</option>
								<option value='doing'>進行中</option>
								<option value='done'>完了</option>
							</select>
							<div className='w-7/12 gap-10'>
								<p className='font-bold mb-1'>{todo.title}</p>
								<p className='text-xs'>{todo.description}</p>
							</div>
							<p className='w-2/12'>{todo.timeLimit}</p>
							<div className='control-icons w-1/12 mr-1 flex justify-between'>
								<button className='' onClick={() => handleUpdate(todo)}>
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
