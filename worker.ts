self.onmessage = function(e) {
    interface Data {
        [key: number]: {
            [key: number]: string
        }
    };

    if(e.data.message === "countryCode") {
        let htmlList = '', value = e.data.value, data = e.data.data, iniHtmlList = e.data.iniHtmlList
        if(value === '') {
            postMessage(iniHtmlList)
        } else {
            for(let j = 0; j < data.length; j++) {
                let text = data[j].name
                if(text.toLowerCase().includes(value.toLowerCase())) {
                    htmlList += `<div class="each" data-index="${j}" data-dial="${data[j].dial_code}" data-code="${data[j].code}"><p>${data[j].name}</p><p>${data[j].dial_code}</p></div>`
                }
            }
            postMessage(htmlList)
        }
    }
    // This is for search work, which is resource intensive
    else if (e.data.message === "search") {
        const data = e.data.data;
        const input = e.data.input;
        const result: Data = {};
        for(const i in data) {
            const index = Number(i);
            if(data[i].username.toLowerCase().includes(input.toLowerCase()) || data[i].email.toLowerCase().includes(input.toLowerCase())) {
                result[index] = data[i];
            }
        }
        postMessage(result);
    }
}