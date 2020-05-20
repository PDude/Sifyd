let menuCollapse = document.getElementById('menu_collapse')
let navUl = document.getElementById('nav_ul')

function menuOpened() {
    navUl.classList.add('menu_opened')
}

function menuClosed() {
    navUl.classList.remove('menu_opened')
}

window.onresize = function() {
    if (window.innerWidth > 768) {
        menuCollapse.classList.remove('menu_collapse_opened');
        menuClosed()
    }
    if (window.innerWidth < 768) {
        menuClosed()
    }
}

menuCollapse.onmouseover = () => {
    if (window.innerWidth > 768) menuOpened()
}

navUl.onmouseover = () => {
    if (window.innerWidth > 768) menuOpened()
}

menuCollapse.onmouseout = () => {
    if (window.innerWidth > 768) menuClosed()
}

navUl.onmouseout = () => {
    if (window.innerWidth > 768) menuClosed()
}

menuCollapse.onclick = () => {
    if (window.innerWidth <= 768) {
        navUl.classList.toggle('menu_opened')
        menuCollapse.classList.toggle('menu_collapse_opened');
    }
}

// window.addEventListener("resize", displayWindowSize) {
//     alert('test')
// }

(function () {
    scrollTo()
})()

function scrollTo() {
    const links = document.querySelectorAll('.scroll')
    links.forEach(each => (each.onclick = scrollAnchors))
}

function scrollAnchors(e, respond = null) {
    const distanceToTop = el => Math.floor(el.getBoundingClientRect().top)
    e.preventDefault()
    var targetID = (respond) ? respond.getAttribute('href') : this.getAttribute('href')
    const targetAnchor = document.querySelector(targetID)
    if (!targetAnchor) return
    const originalTop = distanceToTop(targetAnchor)
    window.scrollBy({ top: originalTop, left: 0, behavior: 'smooth' })
    const checkIfDone = setInterval(function () {
        const atBottom = window.innerHeight + window.pageYOffset >= document.body.offsetHeight - 2
        if (distanceToTop(targetAnchor) === 0 || atBottom) {
            targetAnchor.tabIndex = '-1'
            targetAnchor.focus()
            window.history.pushState('', '', targetID)
            clearInterval(checkIfDone)
        }
    }, 100)
}

let getFreeBtn = document.getElementById('get_free_btn')
let purchaseBtn = document.getElementById('purchase_btn')

let getFreeModal = document.getElementById('get_free_modal')
let purchaseModal = document.getElementById('purchase_modal')

let modalCloseFree = document.getElementById('modal_close_free')
let modalClosePurchase = document.getElementById('modal_close_purchase')

let modalWrapFree = document.getElementById('modal_wrap_free')
let modalWrapPurchase = document.getElementById('modal_wrap_purchase')

let body = document.getElementById('body')

function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth
}

getFreeBtn.onclick = (e) => {
    e.preventDefault()
    getFreeModal.classList.add('modal_visible')
    body.style.marginRight = getScrollbarWidth() + 'px'
    body.classList.add('body_overflow_hidden')
}

purchaseBtn.onclick = (e) => {
    e.preventDefault()
    purchaseModal.classList.add('modal_visible')
    body.style.marginRight = getScrollbarWidth() + 'px'
    body.classList.add('body_overflow_hidden')
    purchaseFormWrap.style.display = 'none'
    purchaseForm.style.display = 'flex'
}

modalCloseFree.onclick = () => {
    getFreeModal.classList.remove('modal_visible')
    body.classList.remove('body_overflow_hidden')
    body.style.marginRight = 0
}

modalClosePurchase.onclick = () => {
    purchaseModal.classList.remove('modal_visible')
    body.classList.remove('body_overflow_hidden')
    body.style.marginRight = 0
}

getFreeModal.addEventListener('click', function () {
    getFreeModal.classList.remove('modal_visible')
    body.classList.remove('body_overflow_hidden')
    body.style.marginRight = 0
}, false)
modalWrapFree.addEventListener('click', function (ev) {
    ev.stopPropagation()
}, false)

purchaseModal.addEventListener('click', function () {
    purchaseModal.classList.remove('modal_visible')
    body.classList.remove('body_overflow_hidden')
    body.style.marginRight = 0
}, false)
modalWrapPurchase.addEventListener('click', function (ev) {
    ev.stopPropagation()
}, false)

document.onkeydown = (e) => {
    e = e || window.event
    if (getFreeModal.classList.contains('modal_visible')) {
        if (e.keyCode == 27) {
            body.classList.remove('body_overflow_hidden')
            body.style.marginRight = 0
            getFreeModal.classList.remove('modal_visible')
        }
    }
    if (purchaseModal.classList.contains('modal_visible')) {
        if (e.keyCode == 27) {
            body.classList.remove('body_overflow_hidden')
            body.style.marginRight = 0
            purchaseModal.classList.remove('modal_visible')
        }
    }
}

let downloadsRef = firebase.database().ref('downloads')

function getInputVal(id) {
    return document.getElementById(id).value
}

document.getElementById('get_free_form').addEventListener('submit', submitFreeForm)

function submitFreeForm(e) {
    e.preventDefault()

    let nameDownload = getInputVal('name_free')
    let emailDownload = getInputVal('email_free')

    saveDownloads(nameDownload, emailDownload)

    document.getElementById('get_free_form').reset()
    getFreeModal.classList.remove('modal_visible')
    body.classList.remove('body_overflow_hidden')

    window.location = 'https://firebasestorage.googleapis.com/v0/b/universityproject-6f9ae.appspot.com/o/Info.zip?alt=media&token=bc2dac6b-47b3-47b7-870b-c5ddf82035cf'
}

function saveDownloads(name, email) {
    let newDownloadsRef = downloadsRef.push()
    newDownloadsRef.set({
        nameDownload: name,
        emailDownload: email
    })
}

let contactsRef = firebase.database().ref('contacts')
let submitAlert = document.getElementById('submit_alert')

document.getElementById('form_contact').addEventListener('submit', submitContactForm)

function submitContactForm(e) {
    e.preventDefault()

    let nameContact = getInputVal('name_contact')
    let emailContact = getInputVal('email_contact')
    let textareaContact = getInputVal('textarea_contact')

    saveContacts(nameContact, emailContact, textareaContact)

    document.getElementById('form_contact').reset()
    submitAlert.classList.add('submit_alert_visible')

    setTimeout(function () {
        submitAlert.classList.remove('submit_alert_visible')
    }, 3000)
}

function saveContacts(name, email, textarea) {
    let newContactsRef = contactsRef.push()
    newContactsRef.set({
        nameContact: name,
        emailContact: email,
        textareaContact: textarea
    })
}

let newslettersRef = firebase.database().ref('newsletters')

document.getElementById('newsletter_form').addEventListener('submit', submitNewsletterForm)

function submitNewsletterForm(e) {
    e.preventDefault()

    let emailNewsletter = getInputVal('email_newsletter')

    saveNewsletters(emailNewsletter)

    document.getElementById('newsletter_form').reset()
    document.getElementById('newsletter_desc_text').classList.add('newsletter_desc_text_submited')
    document.getElementById('alert_newsletter').classList.add('alert_newsletter_submited')

    setTimeout(function () {
        document.getElementById('newsletter_desc_text').classList.remove('newsletter_desc_text_submited')
        document.getElementById('alert_newsletter').classList.remove('alert_newsletter_submited')
    }, 3000)
}

function saveNewsletters(email) {
    let newNewslettersRef = newslettersRef.push()
    newNewslettersRef.set({
        emailNewsletter: email
    })
}

let purchaseForm = document.getElementById('purchase_form')

purchaseForm.addEventListener('submit', submitPurchaseForm)

function submitPurchaseForm(e) {
    e.preventDefault()

    let namePurchase = getInputVal('name_purchase')
    let emailPurchase = getInputVal('email_purchase')

    document.getElementById('purchase_form').reset()

    purchaseForm.style.display = 'none'
    document.getElementById('purchase_form_wrap').innerHTML = 'loading ...'
    getButton(emailPurchase, namePurchase, printHTMLButton)
}

let purchaseFormWrap = document.getElementById('purchase_form_wrap')

function getButton(email, name, callback) {
    const xhr = new XMLHttpRequest()
    let environment = 'https://sifyd.herokuapp.com'
    let url = environment + '/button/'
    let params = `email=${email}&name=${encodeURIComponent(name)}`

    xhr.open('POST', url)
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')

    xhr.send(params)

    xhr.onreadystatechange = (e) => {
        if (xhr.readyState == 4) {
            callback(xhr.responseText)
        }
    }
}

function run(event) {
    songtitle.innerHTML = event.target.innerHTML;
}

function printHTMLButton(data) {
    purchaseFormWrap.style.display = 'flex'
    purchaseFormWrap.innerHTML = data
    document.getElementById('button_pay').onclick = function (e) {
        purchaseModal.classList.remove('modal_visible')
        body.classList.remove('body_overflow_hidden')
    }
}