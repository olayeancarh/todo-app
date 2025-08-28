import { Component, OnInit } from '@angular/core';

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
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  ngOnInit(): void {
    this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
  }

  addTodo(task: string) {
    if (task.trim()) {
      const newTodo: Todo = { id: this.todos.length + 1, task, completed: false };
      this.todos = [...this.todos, newTodo];
      this.saveTodos();
    }
  }

  toggleTodo(id: number) {
    this.todos = this.todos.map(todo => todo.id !== id ? todo : { ...todo, completed: !todo.completed });
    this.saveTodos();
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveTodos();
  }

  markAllAsCompleted() {
    this.todos = this.todos.map(todo => ({ ...todo, completed: true }));
    this.saveTodos();
  }

  clearCompleted(): void {
    this.todos = this.todos.filter(todo => !todo.completed);
    this.saveTodos();
  }

  get remainingTasks(): number {
    return this.todos?.filter(todo => !todo.completed).length ?? 0;
  }

  private saveTodos() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
