function blogApp() {
    return {
        posts: [],
        form: {
            title: '',
            description: '',
            author_name: ''
        },
        errors: {},
        search: '',

        addPost() {
            this.errors = {}
            if (!this.form.title || this.form.title.length < 5)
                this.errors.title = 'Минимум 5 символов'
            if (!this.form.description)
                this.errors.description = 'Описание обязательно'
            if (!this.form.author_name)
                this.errors.author_name = 'Автор обязателен'

            if (Object.keys(this.errors).length > 0) return

            this.posts.unshift({
                id: Date.now(),
                title: this.form.title,
                description: this.form.description,
                author_name: this.form.author_name,
                created_at: new Date().toISOString(),
                likes_count: 0
            })

            this.form = { title: '', description: '', author_name: '' }
        },

        deletePost(id) {
            this.posts = this.posts.filter(p => p.id !== id)
        },

        likePost(id) {
            const post = this.posts.find(p => p.id === id)
            if (post) post.likes_count++
        },

        get filteredPosts() {
            const query = this.search.trim().toLowerCase()
            return this.posts.filter(p => p.title.toLowerCase().includes(query))
        }
    }
}
