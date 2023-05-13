import React, { useEffect, useState } from "react";
import "./App.css";
import "./index.css";
import { FaPen, FaTrashAlt } from "react-icons/fa";

type Done = "none" | "doing" | "done";

type Todo = {
	title: string;
	description: string;
	timeLimit: string;
	id: string;
	done: Done;
};

type Edit = {
	status: boolean;
	id: string;
};

const App = () => {
	//フォームの状態管理
	const [formData, setFormData] = useState<Todo>({
		title: "",
		description: "",
		timeLimit: "",
		id: "",
		done: "none",
	});

	//編集中かどうかの状態管理
	const [isEditing, setIsEditing] = useState<Edit>({
		status: false,
		id: "",
	});

	//Todoの配列の状態管理
	const [todos, setTodos] = useState<Todo[]>([]);

	//フォーム内のデータが変更になった場合の状態管理を更新する
	function handleChange(
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	) {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	//登録
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		//formからデータを全て受け取り、IDを付与して、todoに保存する
		const uuid: string = crypto.randomUUID();
		const newFormData = { ...formData, id: uuid };
		if (todos !== undefined) {
			setTodos([...todos, newFormData]);
		}

		//formの初期化
		setFormData({
			title: "",
			description: "",
			timeLimit: "",
			id: "",
			done: "none",
		});
	};

	//削除
	const handleDelete = (id: string) => {
		//idを受け取り、該当するtodoを取り除く
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
	};

	//編集
	const handleUpdate = (todo: Todo) => {
		console.log(todo);
		setFormData({
			title: todo.title,
			description: todo.description,
			timeLimit: todo.timeLimit,
			id: todo.id,
			done: todo.done,
		});

		setIsEditing({ status: true, id: todo.id });
	};

	//編集中のデータを登録
	const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newTodos = todos.map((todo) => {
			console.log("handleUpdateSubmit:", todo);
			if (todo.id === formData.id) {
				return {
					//todosに格納されているtodoのidと、formのidが一致した場合は、置き換える
					title: formData.title,
					description: formData.description,
					timeLimit: formData.timeLimit,
					id: formData.id,
					done: formData.done,
				};
			} else {
				return todo;
			}
		});
		setTodos(newTodos);

		//編集中の状態管理を初期化
		setIsEditing({ status: false, id: "" });

		//formの初期化
		setFormData({
			title: "",
			description: "",
			timeLimit: "",
			id: "",
			done: "none",
		});
	};

	const handleDoneStatusChange = (targetTodo: Todo, e: any) => {
		const newTodos = todos.map((todo) => {
			if (todo.id !== targetTodo.id) {
				return todo;
			} else {
				return { ...todo, done: e.target.value };
			}
		});
		setTodos(newTodos);
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
				onSubmit={!isEditing.status ? handleSubmit : handleUpdateSubmit}
				className=' p-3 input border bg-blue-50 rounded'>
				{isEditing.status && (
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
						value={formData.title}
						onChange={handleChange}
					/>
				</div>
				<div className='mt-3'>
					<label htmlFor='description'>Description</label>
					<textarea
						id='description'
						name='description'
						className='p-3 border w-full'
						placeholder='description'
						value={formData.description}
						onChange={handleChange}
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
							value={formData.timeLimit}
							onChange={handleChange}
						/>
					</div>
					<div className='w-1/3'>
						<button
							className='py-3 px-5 bg-sky-600 rounded absolute right-0 bottom-0 text-white disabled:bg-slate-300'
							disabled={formData.title === "" ? true : false}>
							{!isEditing.status ? "登録する" : "更新する"}
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
						<li
							key={todo.id}
							className={
								isEditing.id === todo.id
									? "border flex justify-between p-3 mb-2 bg-blue-50"
									: "border flex justify-between p-3 mb-2 transition-property: background-color"
							}>
							<select
								name='done'
								className='w-2/12 mr-5 border disabled:text-gray-400'
								onChange={(e) => handleDoneStatusChange(todo, e)}
								value={todo.done}
								disabled={isEditing.status}>
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
								<button
									className='disabled:text-gray-300'
									onClick={() => handleUpdate(todo)}
									disabled={isEditing.status}>
									<FaPen />
								</button>
								<button
									className='disabled:text-gray-300'
									onClick={() => handleDelete(todo.id)}
									disabled={isEditing.status}>
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
