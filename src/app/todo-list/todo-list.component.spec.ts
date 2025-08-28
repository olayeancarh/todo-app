import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TodoListComponent } from './todo-list.component';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a todo', () => {
    component.addTodo('Test Task');
    expect(component.todos.length).toBe(1);
    expect(component.todos[0].task).toBe('Test Task');
    expect(component.todos[0].completed).toBeFalse();
  });

  it('should not add an empty todo', () => {
    component.addTodo('');
    expect(component.todos.length).toBe(0);
    component.addTodo('   ');
    expect(component.todos.length).toBe(0);
  });

  it('should toggle a todo', () => {
    component.addTodo('Toggle Task');
    const id = component.todos[0].id;
    component.toggleTodo(id);
    expect(component.todos[0].completed).toBeTrue();
    component.toggleTodo(id);
    expect(component.todos[0].completed).toBeFalse();
  });

  it('should delete a todo', () => {
    component.addTodo('Delete Task');
    const id = component.todos[0].id;
    component.deleteTodo(id);
    expect(component.todos.length).toBe(0);
  });

  it('should mark all as completed', () => {
    component.addTodo('Task 1');
    component.addTodo('Task 2');
    component.markAllAsCompleted();
    expect(component.todos.every(todo => todo.completed)).toBeTrue();
  });

  it('should persist todos to localStorage', () => {
    component.addTodo('Persist Task');
    const stored = JSON.parse(localStorage.getItem('todos') || '[]');
    expect(stored.length).toBe(1);
    expect(stored[0].task).toBe('Persist Task');
  });

  it('should load todos from localStorage on init', () => {
    localStorage.setItem('todos', JSON.stringify([{ id: 1, task: 'Loaded Task', completed: false }]));
    component.ngOnInit();
    expect(component.todos.length).toBe(1);
    expect(component.todos[0].task).toBe('Loaded Task');
  });
});
