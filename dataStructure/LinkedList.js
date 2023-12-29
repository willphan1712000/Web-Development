function circularLinkList() {
    function Node(data) {
        this.data = data
        this.next = null
    }

    let length = 0, head = null // meaning that the list is empty

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
            head = node
        } else {
            current = this.getElementAt(length - 1)
            current.next = node
        }

        node.next = head // This is how a circular linked list is formed because the last node points to the head
        length++
    }

    // Insert new Node to the middle of the list
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

    this.length = function() {
        return length
    }


}

const linkedList = new circularLinkList()
linkedList.add("Will")
linkedList.add("Patrick")
console.log(linkedList.length())
