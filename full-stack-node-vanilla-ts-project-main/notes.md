# here is my notes for producing the app

Notes sidebar note element
```html
<div class="note-item active">
    <h6 class="mb-1">New Note</h6>
    <small class="text-muted">3 Mar</small>
</div>
```

AI message elements
```html
<div class="usr-msg msg">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et
    tristique arcu, et ultricies nisi. Duis ac lorem molestie, ultrices
    enim sit amet, congue nibh. Cras porta pulvinar dui nec consequat.
    Vivamus accumsan interdum est, at semper lorem consectetur vel. Proin
    ac quam egestas augue iaculis molestie. Maecenas gravida libero
    commodo magna maximus, sit amet efficitur quam pulvinar. Ut ac
    efficitur purus. Maecenas a diam a est ultricies consectetur et a
    sapien. Quisque sagittis urna justo, et maximus urna hendrerit non.
    Integer eu iaculis sapien. Duis ut pretium elit.
</div>

<div class="assistant-msg msg">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin et
    tristique arcu, et ultricies nisi. Duis ac lorem molestie, ultrices
    enim sit amet, congue nibh. Cras porta pulvinar dui nec consequat.
    Vivamus accumsan interdum est, at semper lorem consectetur vel. Proin
    ac quam egestas augue iaculis molestie. Maecenas gravida libero
    commodo magna maximus, sit amet efficitur quam pulvinar. Ut ac
    efficitur purus. Maecenas a diam a est ultricies consectetur et a
    sapien. Quisque sagittis urna justo, et maximus urna hendrerit non.
    Integer eu iaculis sapien. Duis ut pretium elit. Proin at imperdiet
    sapien, in egestas nunc. Aliquam nec volutpat risus. Nulla aliquet
    pretium quam, ac posuere orci. Duis mattis massa et leo ornare rutrum.
    Nullam id pretium nisl. Vestibulum congue augue at enim vehicula
    lobortis. In tempor libero bibendum eros fermentum tincidunt. Morbi
    risus dui, tempor mollis gravida at, convallis quis erat. Vestibulum
    malesuada feugiat libero hendrerit tristique. Nam eu urna sem.
    Maecenas suscipit nisl dui. Nulla molestie, libero pulvinar ornare
    tristique, sapien enim fermentum quam, sed aliquet quam felis ut
    lacus. Nulla lobortis urna molestie gravida tristique.
</div>
```

Habits elements (Completed and Pending) — moved comments above each card and aligned inner elements
```html
<!-- Completed Habit -->
<div class="col-md-6 col-lg-4">
    <div class="card bg-dark text-light p-3 habit-card habit-completed rounded-4">
        <div class="d-flex justify-content-between align-items-start mb-3">
            <div>
                <div class="habit-title">Read 30 Pages</div>
                <small class="text-muted">
                    <div class="habit-description">
                        Kendini geliştirmek için her gün en az 30 sayfa okumak,
                        not çıkarmak, önemli cümleleri işaretlemek ve öğrendiklerini
                        uygulamaya dökmek.
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
                        not çıkarmak, önemli cümleleri işaretlemek ve öğrendiklerini
                        uygulamaya dökmek.
                    </div>
                </small>
            </div>
            <span class="badge bg-secondary">⏳ Pending</span>
        </div>

        <div class="d-flex gap-2">
            <button class="btn btn-outline-success btn-sm w-100">Mark Done</button>
            <button class="btn btn-outline-danger btn-sm w-100">Delete</button>
        </div>
    </div>
</div>
```
