import React, { useState } from "react";
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

	/**
	 * 現在のフォームの値をformDataに格納します。
	 * @param e 対象のイベントです。
	 */
	function handleChange(
		e:
			| React.ChangeEvent<HTMLInputElement>
			| React.ChangeEvent<HTMLTextAreaElement>
	): void {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}

	/**
	 * formから複数の値を受け取り、ランダムなIDを付与してtodosに保存します。
	 * その後、formを初期化します。
	 * @function
	 * @param e 対象のイベントです。
	 */
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

	/**
	 * 削除対象のidを渡すことで、todoを削除できる関数です。
	 * @function
	 * @param id 削除対象のTodoリストのidです。
	 */
	const handleDelete = (id: string) => {
		const newTodos = todos.filter((todo) => todo.id !== id);
		setTodos(newTodos);
	};

	/**
	 * 対象のtodoを渡すことで、編集モードに変更し、formに値を表示する関数です。
	 * @function
	 * @param todo 対象のtodoです。
	 */
	const handleUpdate = (todo: Todo) => {
		setFormData({
			title: todo.title,
			description: todo.description,
			timeLimit: todo.timeLimit,
			id: todo.id,
			done: todo.done,
		});

		//編集中の状態に更新する
		setIsEditing({ status: true, id: todo.id });
	};

	/**
	 * 編集中のformの値を受け取り、編集対象の値を更新し、編集状態とformの値を初期化をします。
	 * @function
	 * @param e formのイベントです。
	 */
	const handleUpdateSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newTodos = todos.map((todo) => {
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

	/**
	 * 対象となるtodoのDoneの値を更新する関数です。
	 * @param targetTodo 編集すべきtodoです。
	 * @param e 		 編集されたinputです。
	 */
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

	return (
		<div className='center ml-auto mr-auto w-4/5'>
			<header>
				<h1 className='m-4 text-center text-4xl font-semibold text-gray-700 '>
					Todo App for React
				</h1>
			</header>
			<form
				onSubmit={!isEditing.status ? handleSubmit : handleUpdateSubmit}
				className=' input rounded border bg-blue-50 p-3'>
				{isEditing.status && (
					<span className='rounded-xl bg-cyan-800 px-2 py-1 text-sm text-white'>
						編集モード
					</span>
				)}
				<div className='mt-3'>
					<label htmlFor='title'>件名</label>
					<input
						name='title'
						className='w-full border p-3'
						type='text'
						placeholder='件名を入力してください'
						value={formData.title}
						onChange={handleChange}
					/>
				</div>
				<div className='mt-3'>
					<label htmlFor='description'>詳細</label>
					<textarea
						name='description'
						className='w-full border p-3'
						placeholder='詳細を入力してください'
						value={formData.description}
						onChange={handleChange}
					/>
				</div>
				<div className='relative mt-3 flex'>
					<div className='w-1/3'>
						<label htmlFor='timeLimit'>期限</label>
						<input
							type='date'
							name='timeLimit'
							className='w-full border p-3'
							placeholder='description'
							value={formData.timeLimit}
							onChange={handleChange}
						/>
					</div>
					<div className='w-1/3'>
						<button
							className='absolute bottom-0 right-0 rounded bg-sky-600 px-5 py-3 text-white disabled:bg-slate-300'
							disabled={formData.title.trim() === "" ? true : false}>
							{!isEditing.status ? "登録する" : "更新する"}
						</button>
					</div>
				</div>
			</form>

			<section className='todo-list mt-10'>
				<h2 className='m-4 text-center text-3xl font-semibold text-gray-700'>
					Todoリスト
				</h2>

				<ul>
					{todos.map((todo: Todo) => (
						<li
							key={todo.id}
							className={
								isEditing.id === todo.id
									? "mb-2 flex justify-between border bg-blue-50 p-3"
									: "transition-property: background-color mb-2 flex justify-between border p-3"
							}>
							<select
								name='done'
								className='mr-5 w-2/12 border disabled:text-gray-400'
								onChange={(e) => handleDoneStatusChange(todo, e)}
								value={todo.done}
								disabled={isEditing.status}>
								<option value='none'>未着手</option>
								<option value='doing'>進行中</option>
								<option value='done'>完了</option>
							</select>
							<div className='w-7/12 gap-10'>
								<p className='mb-1 font-bold'>{todo.title}</p>
								<p className='text-xs'>{todo.description}</p>
							</div>
							<p className='w-2/12'>{todo.timeLimit}</p>
							<div className='control-icons mr-1 flex w-1/12 justify-between'>
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
