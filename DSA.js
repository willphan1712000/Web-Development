function LinkList() {
    function Node(data) {
        this.data = data
        this.next = null
    }

    let length = 0, head = null, tail = null // list is empty

    //Get element at specific index
    this.getElementAt = function(index) {
        if(index >= 0 && index <= length) {
            let node = head
            for(let i = 0; i < index && node != null; i++) {
                node = node.next
            }
            return node
        }
        return undefined
    }

    // Add new Node to the end of the list
    this.add = function(data) {
        const node = new Node(data)
        let current

        if(head === null) {
            head = tail = node
        } else {
            current = this.getElementAt(length - 1)
            current.next = node
            tail = node
        }

        // node.next = head // This is how a circular linked list is formed because the last node points to the head
        length++
    }

    // Insert new Node to the middle of the list O(n)
    this.insert = function(data, index) {
        if(index >= 0 && index <= length) {
            if(index === 0) {
                if(head === null) {
                    head = node
                    node.next = head
                } else {
                    node.next = head
                    head = node
                    let currentHead = head

                }
            }

            const node = new Node(data)
            if(head === null) {
                head = node
            } else {
                if(index === 0) { // Insert element to the head
                    let current = head
                    node.next = current
                    head = node
                } else if (index === length) { // Insert element to the end
                    let last = this.getElementAt(length - 1)
                    last.next = node
                } else {
                    const previous = this.getElementAt(index - 1)
                    node.next = previous.next
                    previous.next = node
                }
            }
            length++
            return true
        }
        return false
    }

    // get length of the list O(1)
    this.length = function() {
        return length
    }

    // Add node before the first node data is greater than the inserted node data O(1)
    this.incrementAdd = function(n) {
        const newNode = new Node(n)
        if(head === null) {
            head = tail = newNode
        } else {
            let prev
            let current = head
            if(n < current.data) {
                head = newNode
                head.next = current
            } else {
                while(n > current.data) {
                    prev = current
                    current = current.next
                    tail = current
                    if(current === null) break
                }
                prev.next = newNode
                newNode.next = current
            }
        }
        length++
    }

    // Binary search for linked list
    this.binarySearch = function(n) {
        // function to get middle node
        function getMiddleNode(start, end) {
            if(start === null) return
            let slow = start
            let fast = start.next
            while(fast !== end) {
                fast = fast.next
                if(fast !== end) {
                    slow = slow.next
                    fast = fast.next
                }
            }
            return slow
        }

        // Binary search starts here
        let left = head
        let right = null
        let middle
        do {
            middle = getMiddleNode(left, right)
            if(n < middle.data) {
                right = middle
            } else if(n > middle.data) {
                left = middle.next
            } else {
                return true
            }
        } while(left !== right)
        return false
    }

    // Print list in forward O(n)
    this.printList = function() {
        let current = head
        let result = ''
        while(current !== null) {
            result += current.data + ", "
            current = current.next
        }
        return result
    }
}

function linkedList() {
    return new LinkList()
}

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

function queue() {
    return new Queue()
}

function automaticTesing(data, functionTest) {
    let count = 0
    for(const key in data) {
        count++
        if(functionTest(key) === data[key]) {
            console.log(`Test with ${key}: Passed`)
        } else {
            console.log(`Test with ${key}: Failed`)
        }
    }
}

export {linkedList, queue, automaticTesing}