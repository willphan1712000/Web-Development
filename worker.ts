self.onmessage = async function(e) {
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
}