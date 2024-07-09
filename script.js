let ipt = document.querySelectorAll('section input[type=text]')
let rdio = document.querySelectorAll('section input[type=radio]')
let allgoalsbox = document.querySelector('section')
let guid = document.body.querySelector('.guide')
let progeress_bar = document.querySelector('#progress-bar')
let mainDiv = document.querySelectorAll('section div')
let main = document.querySelector('main p:nth-child(3)')
let label = document.querySelectorAll('section div label')
// console.log(label)

function validator(ele) {
    if (ele.value) {
        if (ele.type == 'text') {
            ele.previousElementSibling.children[0].removeAttribute('disabled')
            ele.style.textDecoration = 'none'
            ele.style.color = 'black'
            ele.previousElementSibling.children[0].checked = false
            progressUpdate()
        }
    }
    if (ele.value == '') {
        ele.previousElementSibling.children[0].setAttribute('disabled', '')
        ele.previousElementSibling.children[0].checked = false
    }
}

allgoalsbox.addEventListener('input', (e) => {
    validator(e.target)
    // console.log(e.target.value)
})


allgoalsbox.addEventListener('click', (e) => {
    // console.dir(e.target)
    if (e.target.localName == 'label') {
        console.log('true');
        if (e.target.nextElementSibling.value == "") {
            e.target.children[0].setAttribute('disabled', '')
            guid.innerHTML = 'Please put Task In It ❌'
            main.style.height = '23px'
        }
    }
})

allgoalsbox.addEventListener('change', (e) => {
    guid.innerHTML = ''
    main.style.height = '0px'
    e.target.style.textDecoration = 'none'
})



//setting underlinethrough using js

function stricker(sel) {
    // radio.nextElementSibling.style.textDecoration = 'line-through'
    // console.log(radio);
    if (sel.type == 'radio' && sel.parentElement.nextElementSibling.value != '') {
        sel.parentElement.nextElementSibling.style.cssText = `
        text-decoration:line-through;  
        color:#48A300;
        `
    }
    if (sel.type == 'text' && sel.value != '') {
        sel.style.cssText = `
        text-decoration:line-through;  
        color:#48A300;
        `
    }

}

allgoalsbox.addEventListener('input', (e) => {
    // console.log(e.target.nextElementSibling)
    if (e.target.type == 'radio') {
        stricker(e.target)
        // console.log(e.target)
        progressUpdate()

    }

})

//progress bar increased........

function totaltask() {
    let total = 0
    rdio.forEach((tsk) => {
        // console.log(tsk);
        total++
    })
    return total
}

function no_of_checked_task() {
    let check = 0
    rdio.forEach((radios) => {
        if (radios.checked) {
            check++
        }
    });
    return check
}

function progressUpdate() {
    // console.log(totaltask())
    // console.log(no_of_checked_task())
    let percent = parseInt((no_of_checked_task() / totaltask()) * 100)
    // console.log(percent);
    progeress_bar.style.width = `${percent}%`
}



// --------------------------local-storage --------------------

// -------------------------------------
// object for Local storage 
// -------------------------------------
let objDate = {

}

allgoalsbox.addEventListener('click', (ele) => {
    // console.log(ele.target.type);
    if (ele.target.type == 'radio') {
        // console.log('this is radio')
        if (ele.target.checked == true) {
            if (objDate[`div${ele.target.parentElement.parentElement.id}`] === undefined) {
                // console.log(objDate[`div${ele.target.parentElement.parentElement.id}`]);
                objDate[`div${ele.target.parentElement.parentElement.id}`] = {}
            }
            objDate[`div${ele.target.parentElement.parentElement.id}`]['completed'] = true

            // console.log(objDate[`div${ele.target.parentElement.parentElement.id}`]);
        }
    }
    // console.log(objDate);
})
// objDate.label1.completed='true'


allgoalsbox.addEventListener('input', (ele) => {
    // console.log(ele.target);
    if (ele.target.type == 'text') {
        if (objDate[`div${ele.target.parentElement.parentElement.id}`] === undefined) {
            objDate[`div${ele.target.parentElement.id}`] = {}
        }
        objDate[`div${ele.target.parentElement.id}`]['task'] = ele.target.value
        objDate[`div${ele.target.parentElement.id}`]['completed'] = false

        // console.log(objDate[`div${ele.target.parentElement.id}`]);
    }
    // console.log(objDate);

    localStorage.setItem('Data', JSON.stringify(objDate))

})
// console.log(objDate);



let getout = JSON.parse(localStorage.getItem('Data'))
objDate = getout || {}

// console.log(getout)

mainDiv.forEach((div) => {

    // console.log(div.children[1]);

    if (objDate[`div${div.id}`]) {
        // console.log(objDate[`div${div.id}`] || 'sapce');
        div.children[0].children[0].checked = objDate[`div${div.id}`]['completed']
        div.children[1].value = (objDate[`div${div.id}`]['task']) || ''

        if (div.children[0].children[0].checked == true) {
            stricker(div.children[1])
        }
    }

})
progressUpdate()













