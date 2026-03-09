# here is my notes for producing the app

Notes sidebar note element

```html
<div class="note-item active">
    <h6 class="mb-1">New Note</h6>
    <small class="text-muted">3 Mar</small>
</div>
```

Habits elements (Completed and Pending) — moved comments above each card and aligned inner elements

```html
<!-- Completed Habit -->
<div class="col-md-6 col-lg-4">
    <div
        class="card bg-dark text-light p-3 habit-card habit-completed rounded-4"
    >
        <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
                <div class="habit-title">Read 30 Pages</div>
                <small class="text-muted">
                    <div class="habit-description">
                        Kendini geliştirmek için her gün en az 30 sayfa okumak,
                        not çıkarmak, önemli cümleleri işaretlemek ve
                        öğrendiklerini uygulamaya dökmek.
                    </div>
                </small>
            </div>
            <span class="badge bg-success">✔ Completed Today</span>
        </div>

        <div class="d-flex gap-2">
            <button class="btn btn-success btn-sm w-100" disabled>Done</button>
            <button class="btn btn-outline-danger btn-sm w-100">Delete</button>
        </div>
    </div>
</div>

<!-- Pending Habit -->
<div class="col-md-6 col-lg-4">
    <div class="card bg-dark text-light p-3 habit-card rounded-4">
        <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
                <div class="habit-title">Workout</div>
                <small class="text-muted">
                    <div class="habit-description">
                        Kendini geliştirmek için her gün en az 30 sayfa okumak,
                        not çıkarmak, önemli cümleleri işaretlemek ve
                        öğrendiklerini uygulamaya dökmek.
                    </div>
                </small>
            </div>
            <span class="badge bg-secondary">⏳ Pending</span>
        </div>

        <div class="d-flex gap-2">
            <button class="btn btn-outline-success btn-sm w-100">
                Mark Done
            </button>
            <button class="btn btn-outline-danger btn-sm w-100">Delete</button>
        </div>
    </div>
</div>
```
