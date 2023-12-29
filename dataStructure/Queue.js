function Queue() {
    this.storage = {}
    this.front = 0
    this.rear = 0

    this.enqueue = function(data) {
        this.storage[this.rear] = data
        this.rear++
    }

    this.dequeue = function() {
        if(this.front !== this.rear) {
            let current = this.storage[this.front]
            delete this.storage[this.front]
            this.front++
            return current
        } else {
            console.log("Can't dequeue when the queue is empty")
        }
    }

    this.size = function() {
        return this.rear - this.front
    }

    this.isEmpty = function() {
        return this.front === this.rear
    }
}
