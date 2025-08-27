import { Component } from '@angular/core';

interface Todo {
  id: number;
  task: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  imports: [],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent {
  todos: Todo[] = [
    { id: 1, task: 'Learn Angular', completed: false },
    { id: 2, task: 'Build To-Do App', completed: false }
  ];

  addTodo(task: string) {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      task,
      completed: false
    };

    this.todos =  [...this.todos, newTodo];
  }

  toggleTodo(id: number) {
    this.todos = this.todos.map(todo => todo.id !== id ? todo : { ...todo, completed: !todo.completed });
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  markAllCompleted() {
    this.todos = this.todos.map(todo => ({ ...todo, completed: true }));
  }
}
